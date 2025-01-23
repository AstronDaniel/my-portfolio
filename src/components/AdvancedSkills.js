import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CodeIcon, 
  ServerIcon, 
  DatabaseIcon, 
  BarChartIcon,
  ZapIcon,
  BrushIcon,
  CloudIcon,
  ActivityIcon
} from 'lucide-react';

const AdvancedSkills = ({ theme = 'light' }) => {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const skills = [
    { 
      name: "React", 
      level: 90, 
      icon: CodeIcon,
      color: "text-blue-500",
      category: "Frontend",
      technologies: ["Hooks", "Redux", "Next.js"],
      complexity: 5,
      description: "Crafting interactive, performant web applications with modern React ecosystem."
    },
    { 
      name: "Node.js", 
      level: 85, 
      icon: ServerIcon,
      color: "text-green-500",
      category: "Backend",
      technologies: ["Express", "GraphQL", "Microservices"],
      complexity: 4,
      description: "Building scalable, efficient server-side applications and RESTful APIs."
    },
    { 
      name: "Python", 
      level: 80, 
      icon: DatabaseIcon,
      color: "text-yellow-500",
      category: "Data & AI",
      technologies: ["Pandas", "TensorFlow", "Django"],
      complexity: 4,
      description: "Advanced data analysis, machine learning, and backend development."
    },
    { 
      name: "TypeScript", 
      level: 75, 
      icon: BarChartIcon,
      color: "text-purple-500",
      category: "Type Safety",
      technologies: ["React", "Node.js", "Advanced Types"],
      complexity: 5,
      description: "Implementing robust, type-safe applications with advanced TypeScript features."
    }
  ];

  const SkillCard = ({ skill, isSelected, onSelect, onHover }) => {
    const Icon = skill.icon;
    const complexityBars = Array(5).fill(0).map((_, index) => (
      <div 
        key={index} 
        className={`
          h-2 w-4 rounded-full mr-1 
          ${index < skill.complexity 
            ? 'bg-blue-500' 
            : (theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300')
          }
        `}
      />
    ));

    return (
      <motion.div 
        className={`
          relative p-5 rounded-2xl cursor-pointer group
          transition-all duration-300 
          ${isSelected 
            ? 'ring-4 ring-blue-500 scale-105' 
            : 'hover:scale-105 hover:shadow-xl'
          }
          ${theme === 'dark' 
            ? 'bg-gray-800 hover:bg-gray-700' 
            : 'bg-white hover:bg-gray-50'
          }
        `}
        whileHover={{ scale: 1.05 }}
        onClick={() => onSelect(skill)}
        onMouseEnter={() => onHover(skill)}
        onMouseLeave={() => onHover(null)}
      >
        <div className="flex items-center mb-4">
          <div className={`
            p-3 rounded-full mr-4 transition-all 
            group-hover:rotate-12 
            ${skill.color} 
            ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}
          `}>
            <Icon size={32} />
          </div>
          <div>
            <h3 className="text-xl font-semibold">{skill.name}</h3>
            <p className="text-sm text-gray-500">{skill.category}</p>
          </div>
        </div>
        
        <div className="flex items-center mb-2">
          <div className="flex mr-2">{complexityBars}</div>
          <span className="text-sm text-gray-500">Complexity</span>
        </div>

        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${skill.level}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`h-2.5 rounded-full ${skill.color}`}
          />
        </div>
      </motion.div>
    );
  };

  return (
    <section 
      className={`
        py-20 min-h-screen flex items-center justify-center
        ${theme === 'dark' 
          ? 'bg-gradient-to-br from-gray-900 to-black text-white' 
          : 'bg-gradient-to-br from-gray-100 to-white text-gray-800'
        }
      `}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4"
      >
        <h2 className="text-5xl font-bold text-center mb-16 
          bg-clip-text text-transparent 
          bg-gradient-to-r from-blue-500 to-purple-500">
          My Technology Ecosystem
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
          {skills.map((skill) => (
            <SkillCard 
              key={skill.name} 
              skill={skill}
              isSelected={selectedSkill?.name === skill.name}
              onSelect={setSelectedSkill}
              onHover={setHoveredSkill}
            />
          ))}
        </div>

        <AnimatePresence>
          {selectedSkill && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className={`
                mt-8 p-8 rounded-2xl max-w-4xl mx-auto
                ${theme === 'dark' 
                  ? 'bg-gray-800 text-white' 
                  : 'bg-white text-gray-800'
                }
                shadow-2xl
              `}
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-3xl font-bold mb-4 
                    bg-clip-text text-transparent 
                    bg-gradient-to-r from-blue-500 to-purple-500">
                    {selectedSkill.name} Deep Dive
                  </h3>
                  <p className="text-lg mb-4">{selectedSkill.description}</p>
                  <div>
                    <h4 className="font-semibold mb-2">Key Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedSkill.technologies.map((tech) => (
                        <span 
                          key={tech} 
                          className={`
                            px-3 py-1 rounded-full text-sm
                            ${theme === 'dark' 
                              ? 'bg-gray-700 text-white' 
                              : 'bg-gray-200 text-gray-800'
                            }
                          `}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {React.createElement(selectedSkill.icon, { 
                      size: 120, 
                      className: `${selectedSkill.color} opacity-70` 
                    })}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default AdvancedSkills;