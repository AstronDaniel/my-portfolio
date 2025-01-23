import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { 
  GitPullRequestIcon, 
  StarIcon, 
  UsersIcon, 
  FolderCode 
} from 'lucide-react';

const GitHubStats = () => {
  const [stats, setStats] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [userResponse, reposResponse] = await Promise.all([
          axios.get("https://api.github.com/users/AstronDaniel"),
          axios.get("https://api.github.com/users/AstronDaniel/repos", {
            params: { 
              sort: 'updated', 
              direction: 'desc', 
              per_page: 2
            }
          })
        ]);

        setStats(userResponse.data);
        setRepositories(reposResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching GitHub stats:", error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return (
    <motion.div 
      className="text-center py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="animate-pulse">
        <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
      </div>
    </motion.div>
  );

  if (!stats) return null;

  const StatItem = ({ icon: Icon, value, label }) => (
    <motion.div 
      className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 p-3 rounded-lg"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Icon className="text-blue-500" size={24} />
      <div>
        <p className="font-bold text-lg">{value}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
      </div>
    </motion.div>
  );

  const RepoCard = ({ repo }) => (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-1 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
      whileHover={{ scale: 1.03 }}
    >
      <div className="flex justify-between items-center">
        <h4 className="font-semibold text-blue-600 dark:text-blue-400">
          {repo.name}
        </h4>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <StarIcon size={16} />
          <span>{repo.stargazers_count}</span>
        </div>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
        {repo.description || "No description"}
      </p>
    </motion.a>
  );

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatItem 
          icon={FolderCode} 
          value={stats.public_repos} 
          label="Repositories" 
        />
        <StatItem 
          icon={UsersIcon} 
          value={stats.followers} 
          label="Followers" 
        />
        <StatItem 
          icon={GitPullRequestIcon} 
          value={stats.following} 
          label="Following" 
        />
        <StatItem 
          icon={StarIcon} 
          value={stats.public_gists} 
          label="Gists" 
        />
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4 text-center">
          Recent Repositories
        </h3>
        <div className="flex flex-grow flex-wrap flex-shrink gap-4">
          {repositories.map(repo => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default GitHubStats;