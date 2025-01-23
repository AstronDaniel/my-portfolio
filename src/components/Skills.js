import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CodeIcon, 
  DatabaseIcon, 
  LayoutGridIcon, 
  ServerIcon, 
  BrainIcon, 
  BarChartIcon 
} from 'lucide-react';

// const skills = [
//   { name: "Python", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/python.svg" },
//   { name: "JavaScript", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/javascript.svg" },
//   { name: "React", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/react.svg" },
//   { name: "Git", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/git.svg" },
//   { name: "HTML", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/html5.svg" },
//   { name: "CSS", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/css3.svg" },
// ];
const skillCategories = [
  {
    name: "Programming Languages",
    skills: [
      { 
        name: "Python", 
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/python.svg", 
        proficiency: 90,
        description: "Advanced data science and backend development",
        projects: ["Machine Learning Dashboard", "AI Automation Scripts"]
      },
      { 
        name: "JavaScript", 
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/javascript.svg", 
        proficiency: 85,
        description: "Full-stack web development with React and Node.js",
        projects: ["E-Commerce Platform", "Interactive Dashboards"]
      }
    ]
  },
  {
    name: "Web Technologies",
    skills: [
      { 
        name: "React", 
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/react.svg", 
        proficiency: 85,
        description: "Modern frontend development with hooks and context",
        projects: ["Portfolio Website", "Real-time Applications"]
      },
      { 
        name: "Tailwind CSS", 
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/tailwind.svg", 
        proficiency: 80,
        description: "Responsive and utility-first styling",
        projects: ["Design Systems", "Responsive Layouts"]
      }
    ]
  },
  {
    name: "Tools & DevOps",
    skills: [
      { 
        name: "Git", 
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/git.svg", 
        proficiency: 90,
        description: "Version control and collaborative development",
        projects: ["Open Source Contributions", "Team Project Management"]
      },
      { 
        name: "Docker", 
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/docker.svg", 
        proficiency: 75,
        description: "Containerization and deployment",
        projects: ["Microservices Architecture", "CI/CD Pipelines"]
      }
    ]
  }
];

const SkillsShowcase = ({ theme = 'light' }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const categoryIcons = {
    "Programming Languages": CodeIcon,
    "Web Technologies": LayoutGridIcon,
    "Tools & DevOps": ServerIcon
  };

  const renderProficiencyBar = (proficiency) => {
    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div 
          className="bg-blue-600 h-2.5 rounded-full" 
          style={{ width: `${proficiency}%` }}
        ></div>
      </div>
    );
  };

  return (
    <section 
      className={`
        py-16 min-h-screen
        ${theme === 'dark' 
          ? 'bg-gradient-to-br from-gray-900 to-black text-white' 
          : 'bg-gradient-to-br from-gray-100 to-white text-gray-800'
        }
      `}
    >
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-12 
            bg-clip-text text-transparent 
            bg-gradient-to-r from-blue-500 to-purple-500"
        >
          Skills Ecosystem
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Categories */}
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-semibold mb-4">Categories</h3>
            {skillCategories.map((category) => {
              const CategoryIcon = categoryIcons[category.name];
              return (
                <motion.div
                  key={category.name}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`
                    flex items-center p-4 rounded-xl cursor-pointer
                    ${selectedCategory === category 
                      ? 'bg-blue-100 dark:bg-blue-900' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }
                  `}
                >
                  <CategoryIcon className="mr-4" />
                  <span>{category.name}</span>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Skills */}
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-semibold mb-4">
              {selectedCategory ? selectedCategory.name : "Select a Category"}
            </h3>
            {selectedCategory && selectedCategory.skills.map((skill) => (
              <motion.div
                key={skill.name}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedSkill(skill)}
                className={`
                  flex items-center p-4 rounded-xl cursor-pointer
                  ${selectedSkill === skill 
                    ? 'bg-green-100 dark:bg-green-900' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }
                `}
              >
                <img 
                  src={`${skill.icon}`} 
                  alt={skill.name} 
                  className="w-8 h-8 mr-4" 
                />
                <div className="flex-grow">
                  <div className="flex justify-between">
                    <span>{skill.name}</span>
                    <span>{skill.proficiency}%</span>
                  </div>
                  {renderProficiencyBar(skill.proficiency)}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Skill Details */}
          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-semibold mb-4">
              {selectedSkill ? selectedSkill.name : "Skill Details"}
            </h3>
            {selectedSkill ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={`${selectedSkill.icon}`} 
                    alt={selectedSkill.name} 
                    className="w-16 h-16 mr-6" 
                  />
                  <div>
                    <h4 className="text-xl font-bold">{selectedSkill.name}</h4>
                    <p className="text-gray-500">{selectedSkill.description}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <h5 className="font-semibold mb-2">Related Projects:</h5>
                  <ul className="list-disc list-inside">
                    {selectedSkill.projects.map((project) => (
                      <li key={project}>{project}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ) : (
              <div className="text-center text-gray-500">
                Select a skill to see details
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsShowcase;