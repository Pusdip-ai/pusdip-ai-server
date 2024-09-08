import express from "express";
import {
  askPuschatHandler,
  askPuschatStreamHandler,
  askPuschatHistoryHandler,
} from "../handlers/puschat";

const puschatRouter = express.Router({ mergeParams: true });

puschatRouter.post("/ask", askPuschatHandler);
puschatRouter.post("/ask/stream", askPuschatStreamHandler);
puschatRouter.post("/ask/history", askPuschatHistoryHandler);

export default puschatRouter;
