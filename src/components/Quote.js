import React, { useEffect, useState } from "react";
import axios from "axios";

const Quote = () => {
  const [quote, setQuote] = useState({ text: "", author: "" });

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await axios.get("https://api.gameofthronesquotes.xyz/v1/random");
        setQuote({ 
          text: response.data.sentence, 
          author: response.data.character.name 
        });
      } catch (error) {
        console.error("Error fetching quote:", error);
        setQuote({ text: "An inspiring quote will appear here", author: "Unknown" });
      }
    };

    fetchQuote();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto my-8">
      <blockquote className="text-xl italic font-medium text-gray-700">
        "{quote.text}"
      </blockquote>
      <cite className="block mt-4 text-gray-600 font-semibold">
        — {quote.author}
      </cite>
    </div>
  );
};

export default Quote;