import supabase from "../config/supabase.js";

export const getVisits = async (req, res) => {
    const { data, error } = await supabase
    .from("visits")
    .select("*")
    .eq("trip_id", req.params.tripId);

    if (error) return res.status(500).json(error);

    res.json(data);
};

export const addVisits = async (req, res) => {
    const {data, error} = await supabase
    .from("visits")
    .insert([{
        ...req.body,
        trip_id: req.params.tripId}])
    .select();

    if (error) return res.status(500).json(error);

    res.status(201).json(data);
};

export const deleteVisits = async (req, res) => {
    const {data, error} = await supabase
    .from("visits")
    .delete()
    .eq('id', req.params.id)
    .eq('trip_id', req.params.tripId)
    .select("id");

    if (error) return res.status(500).json(error);

    if (!data?.length) {
        return res.status(404).json({
            message: "Visit not found"
        });
    }

    res.status(200).json({
        message: "Visit deleted sucessfully"
    })
};

export const updateVisits = async (req, res) => {
    const {
        name,
        cover,
        date,
        latitude,
        longitude
        } = req.body;

    const {data, error} = await supabase
    .from("visits")
    .update({
        name,
        cover,
        date,
        latitude,
        longitude
    })
    .eq('id', req.params.id)
    .eq('trip_id', req.params.tripId)
    .select();

    if (error) return res.status(500).json(error);

    if (!data?.length) {
        return res.status(404).json({
            message: "Visit not found"
        });
    }

    res.status(201).json(data);
}