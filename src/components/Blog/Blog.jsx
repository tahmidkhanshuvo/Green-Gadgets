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
        image: "https://via.placeholder.com/150",
        content:
          "E-waste recycling is an essential process in managing discarded electronic devices responsibly. With technology evolving rapidly, outdated gadgets pile up, contributing to pollution and hazardous waste. Proper recycling ensures materials are reused efficiently, reducing environmental damage. The first step in recycling e-waste is identifying the recyclable items such as old smartphones, laptops, chargers, batteries, televisions, and circuit boards. Many countries have authorized e-waste collection centers where individuals can drop off these items for safe disposal. Before recycling, it is crucial to wipe all personal data from devices and perform a factory reset. Batteries, screens, and other hazardous components should be separated, as they require specialized disposal methods. Alternatively, functional devices can be donated or resold to refurbishment centers, extending their lifespan. Recycling e-waste prevents toxic substances from seeping into the environment while also recovering valuable materials like gold, silver, and copper for reuse."
      },
      {
        title: "Benefits of Recycling",
        image: "https://via.placeholder.com/150",
        content:
          "Recycling e-waste conserves natural Recycling e-waste provides significant benefits to both the environment and the economy. One of the primary advantages is the reduction of landfill waste. Electronic devices contain materials that take hundreds of years to decompose, and improper disposal leads to toxic leaks into the soil and water. Recycling also conserves natural resources by recovering precious metals such as gold, platinum, and aluminum, reducing the need for mining operations. Another critical benefit is pollution prevention. E-waste contains hazardous chemicals like lead and mercury, which can cause serious environmental and health issues if disposed of improperly. Additionally, the e-waste recycling industry generates employment opportunities, as the demand for technicians and workers in collection, processing, and refurbishment continues to grow. Furthermore, recycling electronics saves energy by requiring less power to process old materials compared to mining and manufacturing new ones. By participating in recycling programs, individuals and businesses contribute to a sustainable and eco-friendly future., reduces landfill waste, and prevents hazardous materials from contaminating soil and water. It also supports job creation in the recycling industry and reduces energy consumption required for mining and manufacturing new products."
      },
    ],
    refurbish: [
      {
        title: "How to Refurbish E-Waste Products",
        image: "https://via.placeholder.com/250",
        content:
          "Refurbishing e-waste involves Refurbishing electronic waste is an excellent way to extend the lifespan of old devices while reducing unnecessary disposal. Instead of discarding outdated gadgets, they can be repaired, upgraded, and resold for continued use. The refurbishment process begins with assessing the condition of the device, identifying faulty components such as cracked screens, dead batteries, or malfunctioning circuit boards. Once identified, thorough cleaning is essential, as dust and debris can affect performance. Damaged parts can be replaced or upgraded, such as installing additional RAM in laptops or swapping out old batteries in smartphones. Software updates also play a crucial role in refurbishing, as installing the latest operating system and security patches can improve functionality. After repairs, devices should be tested to ensure they work properly before being sold or donated. Refurbishing electronics helps minimize e-waste, provides affordable tech options, and supports sustainability efforts., upgrading, and restoring electronic devices to extend their lifespan. This process can include replacing faulty components, updating software, and cleaning internal parts to enhance performance. Many refurbished devices function like new ones, offering a cost-effective alternative to purchasing brand-new products."
      },
      {
        title: "Benefits of Refurbishing E-Waste",
        image: "https://via.placeholder.com/250",
        content:
          "Recycling e-Refurbishing e-waste presents several advantages that benefit both consumers and the environment. One of the primary benefits is the extended lifespan of electronic products. Instead of throwing away a device after minor damage or outdated software, refurbishment allows it to be used for several more years. This approach significantly reduces the amount of electronic waste piling up in landfills. Additionally, refurbishing promotes sustainability by lowering the demand for new electronic production, which in turn conserves resources like metals and plastics. Consumers also benefit from more affordable technology, as refurbished products are often sold at lower prices than brand-new models. Businesses focused on refurbishing electronics contribute to a circular economy, where products are repaired and reused instead of discarded. By choosing refurbished over new devices, individuals can save money while reducing their environmental footprint.waste provides significant benefits to both the environment and the economy. One of the primary advantages is the reduction of landfill waste. Electronic devices contain materials that take hundreds of years to decompose, and improper disposal leads to toxic leaks into the soil and water. Recycling also conserves natural resources by recovering precious metals such as gold, platinum, and aluminum, reducing the need for mining operations. Another critical benefit is pollution prevention. E-waste contains hazardous chemicals like lead and mercury, which can cause serious environmental and health issues if disposed of improperly. Additionally, the e-waste recycling industry generates employment opportunities, as the demand for technicians and workers in collection, processing, and refurbishment continues to grow. Furthermore, recycling electronics saves energy by requiring less power to process old materials compared to mining and manufacturing new ones. By participating in recycling programs, individuals and businesses contribute to a sustainable and eco-friendly future."
      },
      {
        title: "Repair Guide",
        image: "https://via.placeholder.com/250",
        content:
          "Many electronic devices can be repaired rather than discarded, preventing unnecessary waste and saving money. Common issues such as broken screens, battery failure, and slow performance can often be fixed with basic tools and knowledge. For cracked screens, repair kits are available that include replacement glass, adhesives, and necessary tools. Battery problems can often be resolved by replacing the battery with a new one, which is particularly useful for laptops and smartphones. Charging issues may stem from a damaged port or faulty cables, which can be replaced easily. Slow performance in devices such as computers and phones can be improved by upgrading RAM, replacing hard drives with SSDs, or reinstalling software. Connectivity issues, such as Wi-Fi problems, can sometimes be fixed by updating drivers or replacing antennas. Learning basic repair skills allows individuals to extend the life of their devices, reducing e-waste and saving costs.e presents several advantages that benefit both consumers and the environment. One of the primary benefits is the extended lifespan of electronic products. Instead of throwing away a device after minor damage or outdated software, refurbishment allows it to be used for several more years. This approach significantly reduces the amount of electronic waste piling up in landfills. Additionally, refurbishing promotes sustainability by lowering the demand for new electronic production, which in turn conserves resources like metals and plastics. Consumers also benefit from more affordable technology, as refurbished products are often sold at lower prices than brand-new models. Businesses focused on refurbishing electronics contribute to a circular economy, where products are repaired and reused instead of discarded. By choosing refurbished over new devices, individuals can save money while reducing their environmental footprint.waste provides significant benefits to both the environment and the economy. One of the primary advantages is the reduction of landfill waste. Electronic devices contain materials that take hundreds of years to decompose, and improper disposal leads to toxic leaks into the soil and water. Recycling also conserves natural resources by recovering precious metals such as gold, platinum, and aluminum, reducing the need for mining operations. Another critical benefit is pollution prevention. E-waste contains hazardous chemicals like lead and mercury, which can cause serious environmental and health issues if disposed of improperly. Additionally, the e-waste recycling industry generates employment opportunities, as the demand for technicians and workers in collection, processing, and refurbishment continues to grow. Furthermore, recycling electronics saves energy by requiring less power to process old materials compared to mining and manufacturing new ones. By participating in recycling programs, individuals and businesses contribute to a sustainable and eco-friendly future."
      },
    ],
    "e-waste": [
      {
        title: "How E-Waste is Destroying Our Environment",
        image: "https://via.placeholder.com/250",
        content:
          "ImpropeE-waste has become one of the fastest-growing waste streams, and its improper disposal is causing significant environmental damage. When electronics are dumped into landfills, toxic substances such as lead, mercury, and cadmium leach into the soil, contaminating nearby water sources and affecting agriculture. In developing countries where e-waste is often processed informally, workers are exposed to harmful chemicals without protective measures, leading to serious health risks. Burning e-waste to extract metals releases toxic fumes into the air, contributing to respiratory diseases and environmental pollution. Additionally, electronic waste affects marine life when disposed of improperly in water bodies, as hazardous chemicals disrupt aquatic ecosystems. The growing demand for electronic devices further accelerates this issue, highlighting the urgent need for proper recycling and responsible disposal practices. Addressing e-waste pollution requires stricter regulations, increased awareness, and responsible consumer behavior.r e-waste disposal leads to environmental hazards such as soil and water contamination, air pollution, and health risks for communities near landfill sites. Many electronic devices contain toxic substances like lead, mercury, and cadmium, which can leach into the ecosystem and cause long-term damage."
      },
      {
        title: "What Can We Do About E-Waste?",
        image: "https://via.placeholder.com/250",
        content:
          "To combaReducing e-waste requires a collective effort from individuals, businesses, and governments. One of the most effective ways to tackle e-waste is by recycling responsibly through certified e-waste recycling programs. Instead of discarding old gadgets, consumers should consider selling or donating them to refurbishing centers where they can be repaired and reused. Purchasing refurbished electronics rather than new ones also helps reduce waste while saving money. Manufacturers should design products with sustainability in mind, making devices easier to repair and upgrade rather than replacing them entirely. Governments and organizations should implement policies that encourage proper e-waste management and educate the public on the importance of responsible disposal. By adopting these practices, we can significantly minimize electronic waste and its negative impact on the environment.t e-waste, individuals and businesses must adopt responsible disposal habits, support recycling programs, and consider refurbishing or donating old electronics. Governments and organizations should also implement stricter regulations on e-waste management to ensure sustainability."
      },
    ],
  };

  return (
    <Container maxWidth="lg" className="py-10">
      <Typography
        variant="h2"
        align="center"
        gutterBottom
        className="font-extrabold text-green-700 dark:text-white"
      >
        Green Gadgets Blog
      </Typography>

      <div className="flex justify-center space-x-6 my-8">
        {Object.keys(articles).map((topic) => (
          <Button
            key={topic}
            onClick={() => setSelectedTopic(topic)}
            className="px-10 py-5 text-white text-xl font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
            style={{ background: "linear-gradient(#579040, #487C3E)" }}
          >
            {topic.charAt(0).toUpperCase() + topic.slice(1)}
          </Button>
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {articles[selectedTopic].map((article, index) => (
          <motion.div key={index} whileHover={{ scale: 1.05 }}>
            <Card className="shadow-lg border border-green-300 dark:bg-gray-800 dark:border-gray-700 rounded-xl overflow-hidden">
              <div className="flex items-center p-4">
                <CardMedia component="img" className="w-32 h-32 rounded-lg" image={article.image} alt={article.title} />
                <CardContent className="flex-1 ml-4">
                  <Typography variant="h4" className="font-bold text-green-900 dark:text-white mb-2">
                    {article.title}
                  </Typography>
                  <Typography className="text-base mt-2 text-gray-700 dark:text-gray-300 leading-relaxed">
                    {article.content}
                  </Typography>
                </CardContent>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Container>
  );
};

export default Blog;
