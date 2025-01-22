import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Quote from "./components/Quote";
import Weather from "./components/Weather";
import GitHubStats from "./components/GitHubStats";
import FunFact from "./components/FunFact";
import { motion, AnimatePresence } from "framer-motion";

const App = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);

  // Handle scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Projects data
  const projects = [
    { id: 1, title: "Project 1", description: "Description 1", tech: ["React", "Node.js"] },
    { id: 2, title: "Project 2", description: "Description 2", tech: ["Python", "Django"] },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-900 text-white">
      {/* Progress bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-blue-500 z-50 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />

      <Header />

      <main className="relative">
        {/* Hero Section */}
        <section className="min-h-screen relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-50" />
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="container mx-auto px-4 pt-32 relative z-10"
          >
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <motion.h1 
                className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Hi, I'm Daniel
              </motion.h1>
              
              <p className="text-2xl text-gray-300">
                A passionate developer crafting digital experiences
              </p>

              <div className="flex gap-4 justify-center">
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-500 px-8 py-3 rounded-full font-medium hover:bg-blue-600 transition"
                >
                  View My Work
                </motion.a>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-transparent border-2 border-white px-8 py-3 rounded-full font-medium hover:bg-white hover:text-blue-900 transition"
                >
                  Contact Me
                </motion.a>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto p-10">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6"
              >
                <Weather />
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6"
              >
                <Quote />
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6"
              >
                <GitHubStats />
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-4xl font-bold text-center mb-12"
            >
              Featured Projects
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/5 rounded-xl overflow-hidden"
                >
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-300 mb-4">{project.description}</p>
                    <div className="flex gap-2">
                      {project.tech.map((tech) => (
                        <span key={tech} className="bg-blue-500/20 px-3 py-1 rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Fun Fact Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="py-20 bg-gradient-to-r from-purple-900/50 to-blue-900/50"
        >
          <div className="container mx-auto px-4 text-center">
            <FunFact />
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
};

export default App;