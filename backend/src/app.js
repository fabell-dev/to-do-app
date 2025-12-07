import express from "express";
import cors from "cors";
import usersRouter from "./routes/users.js";
import notesRouter from "./routes/notes.js";

const app = express();

//settings
app.set("port", process.env.PORT || 4000); //Puerto

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use("/api/users", usersRouter);
app.use("/api/notes", notesRouter);

export default app;
