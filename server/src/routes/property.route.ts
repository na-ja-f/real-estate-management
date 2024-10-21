import express from "express";
import {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
} from "../controllers/property.controller";
// import { validateProperty } from "../middleware/validation.middleware";

const router = express.Router();

// Route to create a new property
router.post("/add-property", createProperty);

// Route to get all properties
router.get("/get-properties", getAllProperties);

// Route to get a single property by ID
router.get("/get-property-detail/:id", getPropertyById);

// Route to update a property by ID
router.put("/:id", updateProperty);

// Route to delete a property by ID
router.delete("/:id", deleteProperty);

export default router;
