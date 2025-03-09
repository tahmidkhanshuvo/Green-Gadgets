const { body, validationResult } = require("express-validator");

exports.validateBlog = [
  body("title").notEmpty().withMessage("Title is required"),
  body("shortDescription").notEmpty().withMessage("Short description is required"),
  body("content").notEmpty().withMessage("Content is required"),
  body("category").notEmpty().withMessage("Category is required"),
  body("images").isArray({ min: 1 }).withMessage("At least one image is required"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
