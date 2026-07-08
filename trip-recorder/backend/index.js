import express from "express";
import cors from "cors";
import tripRoutes from "./routes/tripRoutes.js";
import visitRoutes from "./routes/visitRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import mapRoutes from "./routes/mapRoutes.js";


const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use("/trips", tripRoutes);
app.use('/auth', authRoutes);
app.use("/trips/:tripId/visits", visitRoutes);
app.use('/', mapRoutes);


app.get("/", (req, res) => {
  res.send("Backend running!");
});

app.listen(port, () => {
  console.log("Listening on port 3000");
});