import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  RefreshCwIcon, 
  SparklesIcon, 
  BookOpenIcon,
  ShareIcon 
} from 'lucide-react';
import { X_API_KEY } from '../env';

const FunFactGenerator = ({ theme = 'light' }) => {
  const [fact, setFact] = useState({ text: "", category: "" });
  const [loading, setLoading] = useState(true);
  const [factCategories, setFactCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fun fact categories with APIs
  const factSources = [
    {
      name: "Random",
      url: "https://uselessfacts.jsph.pl/random.json?language=en",
      icon: SparklesIcon,
      apiKeyRequired: false
    },
    {
      name: "Science",
      url: "https://api.api-ninjas.com/v1/facts",
      icon: BookOpenIcon,
      apiKeyRequired: true
    },
    {
      name: "History",
      url: "https://api.api-ninjas.com/v1/facts",
      icon: BookOpenIcon,
      apiKeyRequired: true
    }
  ];

  const fetchFact = async (category = factSources[0]) => {
    try {
      setLoading(true);
      const headers = category.apiKeyRequired
        ? { 'X-Api-Key': X_API_KEY }
        : {};

      const response = await fetch(category.url, { headers });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);
      console.log(headers);
      let factText;

      // Handle different API response structures
      if (category.name === "Random") {
        factText = data.text;
      } else if (category.name === "Science" || category.name === "History") {
        factText = data[0]?.fact || "No fact found";
      } else {
        factText = "No fact found";
      }

      setFact({
        text: factText,
        category: category.name
      });
      setSelectedCategory(category);
    } catch (error) {
      console.error("Error fetching fun fact:", error);
      setFact({
        text: "Oops! Couldn't fetch a fact. Try again.",
        category: "Error"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFact();
    setFactCategories(factSources);
  }, []);

  const handleShareFact = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Fun Fact',
        text: fact.text
      });
    } else {
      navigator.clipboard.writeText(fact.text);
      alert('Fact copied to clipboard!');
    }
  };

  return (
    <section 
      className={`
        py-16 min-h-[50vh] flex items-center justify-center
        ${theme === 'dark' 
          ? 'bg-gradient-to-br from-gray-900 to-black text-white' 
          : 'bg-gradient-to-br from-gray-100 to-white text-gray-800'
        }
      `}
    >
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.h2 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-12 
            bg-clip-text text-transparent 
            bg-gradient-to-r from-blue-500 to-purple-500"
        >
          Fact Explorer
        </motion.h2>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          {/* Fact Categories */}
          <div className="flex justify-center space-x-4 mb-6">
            {factCategories.map((category) => {
              const CategoryIcon = category.icon;
              return (
                <motion.button
                  key={category.name}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => fetchFact(category)}
                  className={`
                    flex items-center p-2 rounded-full
                    ${selectedCategory?.name === category.name
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
                    }
                  `}
                >
                  <CategoryIcon className="mr-2" size={20} />
                  {category.name}
                </motion.button>
              );
            })}
          </div>

          {/* Fact Display */}
          <motion.div
            key={fact.text}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            {loading ? (
              <div className="h-24 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 1, 
                    ease: "linear" 
                  }}
                  className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
                />
              </div>
            ) : (
              <>
                <p className="text-xl italic mb-4">
                  "{fact.text}"
                </p>
                <div className="flex justify-center space-x-4 mt-6">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => fetchFact(selectedCategory)}
                    className="bg-blue-500 text-white p-3 rounded-full flex items-center"
                  >
                    <RefreshCwIcon className="mr-2" size={20} />
                    New Fact
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleShareFact}
                    className="bg-green-500 text-white p-3 rounded-full flex items-center"
                  >
                    <ShareIcon className="mr-2" size={20} />
                    Share
                  </motion.button>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  Category: {fact.category}
                </p>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FunFactGenerator;