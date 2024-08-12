import express from "express";
import { fetchPuscrapperArticles } from "../utils/scrappers/puscrapper";
import { translateAbstractToIDN } from "../utils/translate";

const articlesRouter = express.Router({ mergeParams: true });

articlesRouter.get("/search", async (req, res, next) => {
  try {
    const { q } = req.query;

    if (!q) {
      res.status(400).send("Query parameter 'q' is required");
    }

    const articles = await fetchPuscrapperArticles(q as string);

    res.json(articles);
  } catch (err) {
    next(err);
  }
});

articlesRouter.post("/translate/abstract", async (req, res, next) => {
  try {
    const { abstract } = req.body;

    const translation = await translateAbstractToIDN(abstract as string);

    res.json(translation);
  } catch (err) {
    next(err);
  }
});

export default articlesRouter;
