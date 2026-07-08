import supabase from "../config/supabase.js";

export const getMap = async (req, res) => {
    const { data, error } = await supabase
  .from("visits")
  .select(`id, trip_id, name, latitude, longitude, trips!inner (user_id)`)
  .eq("trips.user_id", req.userId);

    if (error) return res.status(500).json(error);

    res.json(data);
}