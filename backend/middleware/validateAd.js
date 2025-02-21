module.exports = (req, res, next) => {
    const { title, category, subCategory, description, price, location, name, email, mobile, images, details } = req.body;
  
    if (!title || !category || !subCategory || !description || !price || !location || !name || !email || !mobile || !images) {
      return res.status(400).json({ message: "All required fields must be filled!" });
    }
  
    next();
  };
  