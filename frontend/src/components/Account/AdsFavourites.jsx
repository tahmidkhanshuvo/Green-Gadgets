import React from "react";
import { Box, Grid, Card, CardContent, CardMedia, Typography } from "@mui/material";
import "./AdsFavorites.css";

const myAds = [
  {
    id: 1,
    title: "iPhone 12",
    price: "৳62,999",
    image: "https://via.placeholder.com/300x200",
    description: "Excellent condition, 1 year old",
  },
  {
    id: 2,
    title: "Samsung Galaxy S21",
    price: "৳52,999",
    image: "https://via.placeholder.com/300x200",
    description: "Like new, complete box",
  },
];

const favoriteAds = [
  {
    id: 1,
    title: "Gaming Laptop",
    price: "৳85,000",
    image: "https://via.placeholder.com/300x200",
    description: "High-performance gaming laptop with NVIDIA graphics and 16GB RAM",
  },
  {
    id: 2,
    title: "27-inch Monitor",
    price: "৳12,000",
    image: "https://via.placeholder.com/300x200",
    description: "Crystal clear display with 144Hz refresh rate",
  },
];

const AdsFavorites = ({ activeTab }) => {
  const adsToShow = activeTab === "myAds" ? myAds : favoriteAds;

  return (
    <Box>
      <Grid container spacing={3}>
        {adsToShow.map((ad) => (
          <Grid item xs={12} sm={6} md={4} key={ad.id}>
            <Card className="ad-card">
              <CardMedia component="img" height="200" image={ad.image} alt={ad.title} />
              <CardContent>
                <Typography gutterBottom variant="h5">{ad.title}</Typography>
                <Typography variant="h6" color="primary" sx={{ fontWeight: "bold" }}>{ad.price}</Typography>
                <Typography variant="body2" color="text.secondary">{ad.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdsFavorites;
