import supabase from "../config/supabase.js";

export const getTrips = async (req, res) => {
    const { data, error } = await supabase
    .from("trips")
    .select("*")
    .eq('user_id', req.userId);

    if (error) return res.status(500).json(error);

    res.json(data);
};

export const addTrips = async (req, res) => {
    const {data, error} = await supabase
    .from("trips")
    .insert([{
        ...req.body,
        user_id: req.userId}])
    .select();

    if (error) return res.status(500).json(error);

    res.status(201).json(data);
};

export const deleteTrips = async (req, res) => {
    const {data, error} = await supabase
    .from("trips")
    .delete()
    .eq('id', req.params.id)
    .eq('user_id', req.userId);

    // if (req.userId !== data) return res.status(403).json({
    //     message: "Not authorized to delete this trip."
    // });

    if (error) return res.status(500).json(error);

    res.status(200).json({
        message: "Trip deleted sucessfully"
    })
};

export const updateTrips = async (req, res) => {
    const {
        name,
        start_date,
        end_date,
        cover_url,
        description, 
        user_id
        } = req.body;

    const {data, error} = await supabase
    .from("trips")
    .update({
        name,
        start_date,
        end_date,
        cover_url,
        description
    })
    .eq('id', req.params.id)
    .eq('user_id', req.userId)
    .select();

    if (error) return res.status(500).json(error);

    res.status(200).json(data); }