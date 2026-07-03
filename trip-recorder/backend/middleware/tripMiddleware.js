import supabase from "../config/supabase.js";

const tripAuth = async (req, res, next) => {
  const { data: trip, error } = await supabase
    .from("trips")
    .select("*")
    .eq("id", req.params.tripId)
    .eq("user_id", req.userId)
    .single();
    
  if (error || !trip) {
    return res.status(403).json({
      message: "Unauthorized"
    });
  }

  req.trip = trip;

  next();
};

export default tripAuth;