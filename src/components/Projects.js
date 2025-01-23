import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  GithubIcon, 
  ExternalLinkIcon, 
  CodeIcon, 
  LayersIcon, 
  TagIcon,
  StarIcon,
  EyeIcon,
  FolderIcon
} from 'lucide-react';

const GithubProjects = ({ 
  username = 'AstronDaniel', 
  theme = 'dark',
  maxProjects = 6 
}) => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGitHubProjects = async () => {
      try {
        setLoading(true);
        // GitHub API to fetch user's repositories
        const reposResponse = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=${maxProjects}`
        );
        const repos = await reposResponse.json();

        // Fetch additional details for each project
        const projectDetails = await Promise.all(
          repos.map(async (repo) => {
            // Skip forks
            if (repo.fork) return null;

            // Fetch additional repo details
            const detailsResponse = await fetch(repo.url);
            const details = await detailsResponse.json();

            // Attempt to fetch README content
            let readmeContent = '';
            const branches = ['main', 'master'];
            const readmeFiles = ['README.md', 'ReadMe.md', 'readme.md'];

            for (const branch of branches) {
              for (const readmeFile of readmeFiles) {
                try {
                  const readmeResponse = await fetch(
                    `https://raw.githubusercontent.com/${username}/${repo.name}/${branch}/${readmeFile}`
                  );
                  if (readmeResponse.ok) {
                    readmeContent = await readmeResponse.text();
                    break;
                  }
                } catch {
                  // Continue to the next iteration
                }
              }
              if (readmeContent) break;
            }

            // Extract first paragraph or first line as description
            const description = readmeContent.split('\n')
              .filter(line => line.trim() && !line.startsWith('#'))
              [0] || details.description;

            return {
              title: repo.name.replace(/-/g, ' '),
              description: description,
              tech: details.topics || [], 
              github: repo.html_url,
              demo: details.homepage || null,
              stars: repo.stargazers_count,
              watchers: repo.watchers_count,
              features: [
                `Language: ${details.language || 'Not specified'}`,
                `Created: ${new Date(repo.created_at).toLocaleDateString()}`,
                `Last Updated: ${new Date(repo.updated_at).toLocaleDateString()}`
              ],
              difficulty: repo.size > 10000 ? 'Expert' : 
                         repo.size > 5000 ? 'Advanced' : 'Intermediate',
              category: details.language || 'Miscellaneous'
            };
          })
        );

        // Filter out null projects (forks)
        setProjects(projectDetails.filter(project => project !== null));
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch GitHub projects');
        setLoading(false);
      }
    };

    fetchGitHubProjects();
  }, [username, maxProjects]);

  const ProjectCard = ({ project, index }) => {
    const isSelected = selectedProject === project;

    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        transition={{ 
          duration: 0.3, 
          delay: index * 0.1 
        }}
        className={`
          relative rounded-3xl p-6 overflow-hidden 
          ${isSelected ? 'ring-4 ring-blue-500' : 'hover:shadow-2xl'}
          transition-all duration-300 cursor-pointer
          ${theme === 'dark' 
            ? 'bg-gray-800 text-white' 
            : 'bg-white text-gray-800'
          }
        `}
        onClick={() => setSelectedProject(isSelected ? null : project)}
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold capitalize">{project.title}</h3>
          <div className="flex space-x-2">
            <a 
              href={project.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition"
              onClick={(e) => e.stopPropagation()}
            >
              <GithubIcon size={20} />
            </a>
            {project.demo && (
              <a 
                href={project.demo} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-green-500 transition"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLinkIcon size={20} />
              </a>
            )}
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech) => (
            <span 
              key={tech} 
              className={`
                px-2 py-1 rounded-full text-xs
                ${theme === 'dark' 
                  ? 'bg-gray-700 text-blue-300' 
                  : 'bg-blue-100 text-blue-800'
                }
              `}
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="absolute top-2 right-2 flex space-x-2 text-sm">
          <div className="flex items-center">
            <StarIcon size={16} className="mr-1 text-yellow-500" />
            {project.stars}
          </div>
          <div className="flex items-center">
            <EyeIcon size={16} className="mr-1 text-green-500" />
            {project.watchers}
          </div>
        </div>

        {isSelected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 space-y-3"
          >
            <div className="flex items-center space-x-2">
              <CodeIcon size={16} className="text-blue-500" />
              <span>Difficulty: {project.difficulty}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FolderIcon size={16} className="text-green-500" />
              <span>Category: {project.category}</span>
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <TagIcon size={16} className="text-purple-500" />
                <span className="font-semibold">Project Details:</span>
              </div>
              <ul className="list-disc list-inside">
                {project.features.map((feature) => (
                  <li key={feature} className="text-sm">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </motion.div>
    );
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[500px]">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ 
          repeat: Infinity, 
          duration: 1, 
          ease: "linear" 
        }}
        className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
      />
    </div>
  );

  if (error) return (
    <div className="text-center text-red-500 py-16">
      {error}. Check GitHub username and internet connection.
    </div>
  );

  return (
    <section 
      id="github-projects" 
      className={`
        py-16 
        ${theme === 'dark' 
          ? 'bg-gradient-to-br from-gray-900 to-black' 
          : 'bg-gradient-to-br from-gray-100 to-white'
        }
      `}
    >
      <div className="container mx-auto px-4">
        <h2 className={`
          text-4xl font-bold text-center mb-12
          bg-clip-text text-transparent 
          bg-gradient-to-r from-blue-500 to-purple-500
        `}>
         My Projects
        </h2>
        
        {projects.length === 0 ? (
          <div className="text-center text-gray-500">
            No public projects found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {projects.map((project, index) => (
                <ProjectCard 
                  key={project.title} 
                  project={project} 
                  index={index} 
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};

export default GithubProjects;