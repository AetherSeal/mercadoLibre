import express from "express";
import { queryItems, queryItemDetails } from "../controllers/items.js";

const router = express.Router();

// get request to search items, return a json for use as an api
router.get("/api/items", queryItems);

// get request to for one item, return a json for use as an api
router.get("/api/items/:id", queryItemDetails);

export default router;
