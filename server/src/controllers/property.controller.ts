import { Request, Response } from "express";
import Property from "../models/property.model";

export const createProperty = async (req: Request, res: Response) => {
  try {
    const newProperty = new Property(req.body);
    await newProperty.save();
    console.log("body", res);
    res.status(201).json({
      message: "Property created successfully",
    });
  } catch (error) {
    console.log(error);
    
    res.status(400).json({ message: "Error creating property", error });
  }
};

export const getAllProperties = async (req: Request, res: Response) => {
  try {    
    const properties = await Property.find();    
    res.status(200).json({properties});
  } catch (error) {
    res.status(500).json({ message: "Error fetching properties", error });
  }
};

export const getPropertyById = async (req: Request, res: Response) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json({property});
  } catch (error) {
    res.status(500).json({ message: "Error fetching property", error });
  }
};

export const updateProperty = async (req: Request, res: Response) => {
  try {
    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProperty) {
      res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json({
      message: "Property updated successfully",
      property: updatedProperty,
    });
  } catch (error) {
    res.status(400).json({ message: "Error updating property", error });
  }
};

export const deleteProperty = async (req: Request, res: Response) => {
  try {
    const deletedProperty = await Property.findByIdAndDelete(req.params.id);
    if (!deletedProperty) {
      res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting property", error });
  }
};
