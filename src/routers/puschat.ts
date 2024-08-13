import express from "express";
import {
  askPuschatHandler,
  askPuschatStreamHandler,
} from "../handlers/puschat";

const puschatRouter = express.Router({ mergeParams: true });

puschatRouter.post("/ask", askPuschatHandler);
puschatRouter.post("/ask/stream", askPuschatStreamHandler);

export default puschatRouter;
