const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
var APIRouter = require("./routes/api");

app.use("/api", APIRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});