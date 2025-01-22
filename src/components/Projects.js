import React from "react";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Project 1",
    description: "A brief description of the project.",
    tech: ["Python", "Flask"],
    github: "https://github.com/AstronDaniel/project1",
    demo: "https://project1-demo.com",
  },
  {
    title: "Project 2",
    description: "A brief description of the project.",
    tech: ["JavaScript", "React"],
    github: "https://github.com/AstronDaniel/project2",
    demo: "https://project2-demo.com",
  },
  // Add more projects here
];

const Projects = () => {
  return (
    <section id="projects" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold mb-4">{project.title}</h3>
              <p className="text-gray-700 mb-4">{project.description}</p>
              <div className="mb-4">
                <span className="font-medium">Tech:</span> {project.tech.join(", ")}
              </div>
              <div className="flex gap-4">
                <a
                  href={project.github}
                  className="text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Demo
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;