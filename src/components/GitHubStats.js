import React, { useEffect, useState } from "react";
import axios from "axios";

const GitHubStats = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("https://api.github.com/users/AstronDaniel");
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching GitHub stats:", error);
      }
    };

    fetchStats();
  }, []);

  if (!stats) return <div>Loading GitHub stats...</div>;

  return (
    <div className="text-center mt-8">
      <h3 className="text-xl font-semibold">GitHub Stats</h3>
      <p className="text-lg">
        Repositories: {stats.public_repos} | Followers: {stats.followers}
      </p>
    </div>
  );
};

export default GitHubStats;