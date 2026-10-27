module.exports = (req, res, next) => {
  const {
    title,
    category,
    subCategory,
    description,
    price,
    location,
    mobile,
    mainImage,
    images,
    details,
  } = req.body;
  const text = (value, max) =>
    typeof value === "string" && value.trim().length > 0 && value.length <= max;
  const image = (value) =>
    typeof value === "string" &&
    value.length <= 2048 &&
    /^https:\/\//i.test(value);
  if (
    !text(title, 150) ||
    !["Recycle", "Refurbished", "Reuse"].includes(category) ||
    !text(subCategory, 100) ||
    !text(description, 10000) ||
    !["number", "string"].includes(typeof price) ||
    (typeof price === "string" && price.trim() === "") ||
    !Number.isFinite(Number(price)) ||
    Number(price) < 0 ||
    !text(location, 150) ||
    !text(mobile, 40) ||
    !image(mainImage) ||
    !Array.isArray(images) ||
    images.length > 8 ||
    images.some((value) => !image(value)) ||
    (details != null && (typeof details !== "object" || Array.isArray(details)))
  ) {
    return res
      .status(400)
      .json({
        message:
          "Please include a title, category, description, non-negative price, location, phone and valid listing images.",
      });
  }
  next();
};
