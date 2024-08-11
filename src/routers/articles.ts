import express from "express";
import { searchDOAJArticles } from "../utils/scrappers/DOAJ";

const articlesRouter = express.Router({ mergeParams: true });

articlesRouter.get("/search", async (req, res, next) => {
  try {
    const { q } = req.query;

    if (!q) {
      res.status(400).send("Query parameter 'q' is required");
    }

    // const scrappers = [searchDOAJArticles(q as string)];
    // const articles = await Promise.all(scrappers);

    const articles = await searchDOAJArticles(q as string);

    res.json(articles);
  } catch (err) {
    next(err);
  }
});

export default articlesRouter;
