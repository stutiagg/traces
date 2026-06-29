import express from "express";
import tripRoutes from "./routes/tripRoutes.js";
import visitRoutes from "./routes/visitRoutes.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/trips", tripRoutes);
app.use("/visits", visitRoutes);

app.get("/", (req, res) => {
  res.send("Backend running!");
});

app.listen(port, () => {
  console.log("Listening on port 3000");
});