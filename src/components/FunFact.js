import React, { useEffect, useState } from "react";
import axios from "axios";

const FunFact = () => {
  const [fact, setFact] = useState("");

  useEffect(() => {
    const fetchFact = async () => {
      try {
        const response = await axios.get("https://uselessfacts.jsph.pl/random.json?language=en");
        setFact(response.data.text);
      } catch (error) {
        console.error("Error fetching fun fact:", error);
      }
    };

    fetchFact();
  }, []);

  return (
    <div className="text-center mt-8">
      <h3 className="text-xl font-semibold">Fun Fact</h3>
      <p className="text-lg italic">"{fact}"</p>
    </div>
  );
};

export default FunFact;