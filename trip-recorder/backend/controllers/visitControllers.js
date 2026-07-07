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
    const {error} = await supabase
    .from("visits")
    .delete()
    .eq('id', req.params.id);

    if (error) return res.status(500).json(error);

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
        longitude,
        trip_id
        } = req.body;

    const {data, error} = await supabase
    .from("visits")
    .update({
        name,
        cover,
        date,
        latitude,
        longitude,
        trip_id
    })
    .eq('id', req.params.id)
    .select();

    if (error) return res.status(500).json(error);

    res.status(201).json(data);
}