import React, { useState } from "react";
import {
  Typography,
  Button,
  Container,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Stack,
  Paper,
} from "@mui/material";

const PostAd = () => {
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [showAdForm, setShowAdForm] = useState(false);

  const textFieldSx = {
    backgroundColor: "#e8f5e9", // Light green background
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#e8f5e9",
      "& fieldset": {
        borderColor: "rgba(0, 0, 0, 0.23)",
      },
      "&:hover fieldset": {
        borderColor: "rgba(0, 0, 0, 0.23)",
      },
    },
    "& .MuiInputLabel-root": {
      color: "rgba(0, 0, 0, 0.87)",
    },
    "& .MuiInputBase-input": {
      color: "rgba(0, 0, 0, 0.87)",
    },
  };

  const subcategories = [
    "TV",
    "Laptop",
    "Smart Phone",
    "Monitor",
    "Speaker",
    "CPU",
    "Tablet",
    "Camera",
    "Video Game Console",
    "Photocopiers",
  ];

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setSubcategory("");
    setShowAdForm(false);
  };

  const handleSubcategoryChange = (e) => {
    setSubcategory(e.target.value);
    setShowAdForm(!!e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Ad submitted successfully!");
  };

  return (
    <Box>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{
            background: "linear-gradient(#579040, #487C3E)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Post Your Ad
        </Typography>

        <Paper
          component="form"
          onSubmit={handleSubmit}
          sx={{ p: 4, backgroundColor: "#e8f5e9", borderRadius: "8px" }}
        >
          <Stack spacing={3}>
            <FormControl fullWidth>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                value={category}
                label="Category"
                onChange={handleCategoryChange}
                sx={textFieldSx}
              >
                <MenuItem value="">Select a category</MenuItem>
                <MenuItem value="recycled">Recycled Product</MenuItem>
                <MenuItem value="refurbished">Refurbished Products</MenuItem>
                <MenuItem value="ewaste">E-waste</MenuItem>
              </Select>
            </FormControl>

            {category && (
              <FormControl fullWidth>
                <InputLabel id="subcategory-label">Sub Category</InputLabel>
                <Select
                  labelId="subcategory-label"
                  id="subcategory"
                  value={subcategory}
                  label="Sub Category"
                  onChange={handleSubcategoryChange}
                  sx={textFieldSx}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 200, // Limit dropdown height
                        overflow: "auto",
                      },
                    },
                  }}
                >
                  <MenuItem value="">Select a sub-category</MenuItem>
                  {subcategories.map((sub) => (
                    <MenuItem key={sub} value={sub}>
                      {sub}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            {showAdForm && (
              <Stack spacing={3}>
                <TextField fullWidth label="Title" required sx={textFieldSx} />
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={4}
                  required
                  sx={textFieldSx}
                />
                <TextField
                  fullWidth
                  label="Quantity"
                  type="number"
                  required
                  sx={textFieldSx}
                />
                <TextField
                  fullWidth
                  label="Price"
                  type="number"
                  required
                  sx={textFieldSx}
                />
                <TextField
                  fullWidth
                  label="Location"
                  required
                  sx={textFieldSx}
                />
                <TextField
                  fullWidth
                  label="Contact Number"
                  required
                  sx={textFieldSx}
                />
                <TextField
                  fullWidth
                  required
                  type="file"
                  id="pictures"
                  name="pictures"
                  accept="image/*"
                  multiple
                  sx={textFieldSx}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    whiteSpace: "nowrap",
                    minWidth: "fit-content",
                    alignSelf: "flex-start",
                  }}
                >
                  Post Ad
                </Button>
              </Stack>
            )}
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default PostAd;
