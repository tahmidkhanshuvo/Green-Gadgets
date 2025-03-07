const Blog = require("../models/Blog");

// ✅ Create a Blog Post (Protected)
exports.createBlog = async (req, res) => {
  try {
    const { title, shortDescription, content, images, category } = req.body;

    if (!title || !shortDescription || !content || !category) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const newBlog = new Blog({
      title,
      shortDescription,
      content,
      images,
      category,
      createdBy: req.user._id, // Associate with logged-in user
    });

    await newBlog.save();
    res.status(201).json({ message: "Blog posted successfully!", blog: newBlog });
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get All Blogs (Public)
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("createdBy", "name email").sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get Blog by ID (Public)
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("createdBy", "name email");
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ message: "Server error" });
  }
};
