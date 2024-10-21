import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export const validateProperty = [
  body("property_name").notEmpty().withMessage("Property name is required."),
  body("property_type")
    .isIn(["Residential", "Commercial", "Both"])
    .withMessage("Invalid property type."),
  body("location.area").notEmpty().withMessage("Location area is required."),
  body("location.google_maps_link")
    .notEmpty()
    .withMessage("Google Maps link is required."),
  body("location.zone_number")
    .isNumeric()
    .withMessage("Zone number must be a number."),
  body("location.street_number")
    .isNumeric()
    .withMessage("Street number must be a number."),
  body("location.building_number")
    .isNumeric()
    .withMessage("Building number must be a number."),
  body("mode").isIn(["Sales", "Leasing"]).withMessage("Invalid mode."),
  body("reserved_units")
    .isNumeric()
    .withMessage("Reserved units must be a number."),
  body("available_units")
    .isNumeric()
    .withMessage("Available units must be a number."),
  body("taken_units").isNumeric().withMessage("Taken units must be a number."),
  body("contract_type")
    .isIn(["Exclusive", "Non-Exclusive"])
    .withMessage("Invalid contract type."),
  body("expected_commission.rate")
    .isNumeric()
    .withMessage("Expected commission rate must be a number."),
  body("photos").isArray().withMessage("Photos must be an array."),
  (req: Request, res: Response, next: NextFunction):any => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
