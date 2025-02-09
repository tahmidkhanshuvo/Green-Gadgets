import React, { useState } from "react";
import { Typography, Container, Button, Card, CardContent, CardMedia } from "@mui/material";
import { motion } from "framer-motion";
import './Blog.css';

const Blog = () => {
  const [selectedTopic, setSelectedTopic] = useState("recycle");

  const articles = {
    recycle: [
      {
        title: "How to Recycle E-Waste Products",
        image: "https://via.placeholder.com/600x400",
        content:
          "E-waste recycling is an essential process in managing discarded electronic devices responsibly. With technology evolving rapidly, outdated gadgets pile up, contributing to pollution and hazardous waste. Proper recycling ensures materials are reused efficiently, reducing environmental damage."
      },
      {
        title: "Benefits of Recycling",
        image: "https://via.placeholder.com/600x400",
        content:
          "Recycling e-waste provides significant benefits to both the environment and the economy. One of the primary advantages is the reduction of landfill waste, preventing hazardous materials from contaminating soil and water."
      },
    ],
    refurbish: [
      {
        title: "How to Refurbish E-Waste Products",
        image: "https://via.placeholder.com/600x400",
        content:
          "Refurbishing electronic waste is an excellent way to extend the lifespan of old devices while reducing unnecessary disposal. Instead of discarding outdated gadgets, they can be repaired, upgraded, and resold for continued use."
      },
      {
        title: "Benefits of Refurbishing E-Waste",
        image: "https://via.placeholder.com/600x400",
        content:
          "Refurbishing electronics helps minimize e-waste, provides affordable tech options, and supports sustainability efforts. It extends device lifespan while promoting a circular economy."
      }
    ],
    "e-waste": [
      {
        title: "How E-Waste is Destroying Our Environment",
        image: "https://via.placeholder.com/600x400",
        content:
          "E-waste has become one of the fastest-growing waste streams, and its improper disposal is causing significant environmental damage. Toxic substances such as lead, mercury, and cadmium leach into the soil and water, contaminating ecosystems."
      },
      {
        title: "What Can We Do About E-Waste?",
        image: "https://via.placeholder.com/600x400",
        content:
          "Reducing e-waste requires a collective effort. Consumers should recycle responsibly, donate or refurbish old electronics, and opt for sustainable tech solutions to minimize environmental impact."
      }
    ]
  };

  return (
    <Container maxWidth="xl" className="py-12">
      <Typography
        variant="h3"
        align="center"
        className="font-bold bg-clip-text"
        style={{ background: "linear-gradient(135deg, #6A994E, #3A6351)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
      >
        Blogs
      </Typography>

      <div className="flex justify-center space-x-32 mb-12">
        {Object.keys(articles).map((topic) => (
          <Button
            key={topic}
            onClick={() => setSelectedTopic(topic)}
            className="px-24 py-10 text-white text-2xl font-semibold rounded-xl shadow-lg transition-transform transform hover:scale-110"
            style={{ background: "linear-gradient(135deg, #6A994E, #3A6351)", color: "white" }}
          >
            {topic.charAt(0).toUpperCase() + topic.slice(1)}
          </Button>
        ))}
      </div>

      <div className="grid gap-16 md:grid-cols-2 lg:grid-cols-3 overflow-y-auto max-h-screen">
        {articles[selectedTopic].map((article, index) => (
          <motion.div key={index} whileHover={{ scale: 1.05 }}>
            <Card className="shadow-2xl border border-green-500 dark:bg-gray-800 dark:border-gray-700 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-3xl">
              <CardMedia component="img" className="h-64 object-cover" image={article.image} alt={article.title} />
              <CardContent className="p-6">
                <Typography variant="h5" className="font-semibold text-green-900 dark:text-white mb-4">
                  {article.title}
                </Typography>
                <Typography className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {article.content}
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </Container>
  );
};

export default Blog;
