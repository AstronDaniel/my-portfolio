import React from "react";
import { motion } from "framer-motion";

const skills = [
  { name: "Python", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/python.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/javascript.svg" },
  { name: "React", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/react.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/git.svg" },
  { name: "HTML", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/html5.svg" },
  { name: "CSS", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/css3.svg" },
];

const Skills = () => {
  return (
    <section id="skills" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex flex-col items-center"
            >
              <img src={skill.icon} alt={skill.name} className="w-12 h-12 mb-4" />
              <p className="text-lg font-semibold">{skill.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;