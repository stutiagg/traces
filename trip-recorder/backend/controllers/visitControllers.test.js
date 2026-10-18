import assert from "node:assert/strict";
import { test } from "node:test";

process.env.SUPABASE_URL ||= "https://example.supabase.co";
process.env.SUPABASE_KEY ||= "test-anon-key";

const { default: supabase } = await import("../config/supabase.js");
const { deleteVisits, updateVisits } = await import("./visitControllers.js");

function createSupabaseMock(t, visits) {
    t.mock.method(supabase, "from", (table) => {
        assert.equal(table, "visits");

        const filters = [];
        let operation;
        let updateFields;

        const query = {
            delete() {
                operation = "delete";
                return this;
            },
            update(fields) {
                operation = "update";
                updateFields = fields;
                return this;
            },
            eq(field, value) {
                filters.push([field, value]);
                return this;
            },
            select() {
                return this;
            },
            then(resolve, reject) {
                const matchingVisits = visits.filter((visit) =>
                    filters.every(([field, value]) => visit[field] === value)
                );

                if (operation === "update") {
                    matchingVisits.forEach((visit) =>
                        Object.assign(visit, updateFields)
                    );
                } else if (operation === "delete") {
                    matchingVisits.forEach((visit) => {
                        visits.splice(visits.indexOf(visit), 1);
                    });
                }

                return Promise.resolve({
                    data: matchingVisits,
                    error: null
                }).then(resolve, reject);
            }
        };

        return query;
    });
}

function createResponse() {
    return {
        statusCode: null,
        body: null,
        status(code) {
            this.statusCode = code;
            return this;
        },
        json(body) {
            this.body = body;
            return this;
        }
    };
}

test("updates a visit belonging to the trip", async (t) => {
    const visits = [{
        id: "visit-1",
        trip_id: "trip-1",
        name: "Old name",
        date: "2026-01-01"
    }];
    createSupabaseMock(t, visits);
    const res = createResponse();

    await updateVisits({
        params: { id: "visit-1", tripId: "trip-1" },
        body: { name: "Updated name", date: "2026-02-01" }
    }, res);

    assert.equal(res.statusCode, 201);
    assert.equal(res.body[0].name, "Updated name");
    assert.equal(res.body[0].date, "2026-02-01");
    assert.equal(visits[0].trip_id, "trip-1");
});

test("deletes a visit belonging to the trip", async (t) => {
    const visits = [{ id: "visit-1", trip_id: "trip-1" }];
    createSupabaseMock(t, visits);
    const res = createResponse();

    await deleteVisits({
        params: { id: "visit-1", tripId: "trip-1" }
    }, res);

    assert.equal(res.statusCode, 200);
    assert.equal(visits.length, 0);
});

test("does not update or delete a visit from another trip", async (t) => {
    const visits = [{
        id: "visit-2",
        trip_id: "trip-2",
        name: "Private visit"
    }];
    createSupabaseMock(t, visits);
    const updateRes = createResponse();

    await updateVisits({
        params: { id: "visit-2", tripId: "trip-1" },
        body: { name: "Changed by another trip" }
    }, updateRes);

    assert.equal(updateRes.statusCode, 404);
    assert.equal(visits[0].name, "Private visit");

    const deleteRes = createResponse();
    await deleteVisits({
        params: { id: "visit-2", tripId: "trip-1" }
    }, deleteRes);

    assert.equal(deleteRes.statusCode, 404);
    assert.equal(visits.length, 1);
});

test("ignores an attempted trip reassignment in the update body", async (t) => {
    const visits = [{
        id: "visit-1",
        trip_id: "trip-1",
        name: "A visit"
    }];
    createSupabaseMock(t, visits);
    const res = createResponse();

    await updateVisits({
        params: { id: "visit-1", tripId: "trip-1" },
        body: { name: "A visit", trip_id: "trip-2" }
    }, res);

    assert.equal(res.statusCode, 201);
    assert.equal(visits[0].trip_id, "trip-1");
});

test("returns not found for missing visits on update and delete", async (t) => {
    const visits = [];
    createSupabaseMock(t, visits);
    const updateRes = createResponse();

    await updateVisits({
        params: { id: "missing", tripId: "trip-1" },
        body: { name: "No visit" }
    }, updateRes);

    assert.equal(updateRes.statusCode, 404);
    assert.deepEqual(updateRes.body, { message: "Visit not found" });

    const deleteRes = createResponse();
    await deleteVisits({
        params: { id: "missing", tripId: "trip-1" }
    }, deleteRes);

    assert.equal(deleteRes.statusCode, 404);
    assert.deepEqual(deleteRes.body, { message: "Visit not found" });
});
