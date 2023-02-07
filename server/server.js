import express from "express";
import cors from "cors";

const app = express(); //initialising our app

app.use(express.json()); //middleware: express.json
app.use(
  express.urlencoded({
    //middleware: urlencoded
    extended: true,
  })
);

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
};

app.use(cors(corsOptions)); //middleware: cors

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server is running on " + port + "port"); // OR --> (`...: ${port}`)
  console.log("something");
});
