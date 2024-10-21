import { Request, Response } from "express";
import { Owner, IOwner } from "../models/owner.model";

// Create a new owner
export const createOwner = async (req: Request, res: Response) => {
  const { owner_name, owner_type, contact_number, email, properties } =
    req.body;

  try {
    const newOwner = new Owner({
      owner_name,
      owner_type,
      contact_number,
      email,
      properties,
    });
    await newOwner.save();
    res.status(201).json(newOwner);
  } catch (error) {
    res.status(500).json({ message: "Owner creation failed", error });
  }
};

// Get all owners
export const getAllOwners = async (req: Request, res: Response) => {
  try {
    const owners = await Owner.find();
    res.status(200).json(owners);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch owners", error });
  }
};

// Get owner by ID
export const getOwnerById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const owner = await Owner.findById(id);
    if (!owner) return res.status(404).json({ message: "Owner not found" });
    res.status(200).json(owner);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch owner", error });
  }
};

// Update an existing owner
export const updateOwner = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedOwner = await Owner.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedOwner)
      return res.status(404).json({ message: "Owner not found" });
    res.status(200).json(updatedOwner);
  } catch (error) {
    res.status(500).json({ message: "Update failed", error });
  }
};

// Delete an owner
export const deleteOwner = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedOwner = await Owner.findByIdAndDelete(id);
    if (!deletedOwner)
      return res.status(404).json({ message: "Owner not found" });
    res.status(200).json({ message: "Owner deleted" });
  } catch (error) {
    res.status(500).json({ message: "Deletion failed", error });
  }
};
