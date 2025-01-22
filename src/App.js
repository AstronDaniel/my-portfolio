import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Quote from "./components/Quote";
import Weather from "./components/Weather";
import GitHubStats from "./components/GitHubStats";
import FunFact from "./components/FunFact";
import Projects from "./components/Projects";

import Skills from "./components/Skills";

const App = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isLoading, setIsLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  const skills = [
    { name: "React", level: 90 },
    { name: "Node.js", level: 85 },
    { name: "Python", level: 80 },
    { name: "TypeScript", level: 75 }
  ];

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loader"
          className="fixed inset-0 bg-blue-900 flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity }}
            className="w-16 h-16 border-4 border-white border-t-transparent rounded-full"
          />
        </motion.div>
      ) : (
        <div className={`min-h-screen ${theme}`}>
          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-blue-500 origin-left z-50"
            style={{ scaleX }}
          />

          <Header theme={theme} toggleTheme={toggleTheme} />

          <main className="relative">
            {/* Hero Section */}
            <section className="min-h-screen relative overflow-hidden">
             
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-gradient-to-b from-blue-900/80 to-purple-900/80"
              />

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="container mx-auto px-4 pt-32 relative z-10"
              >
                <div className="max-w-4xl mx-auto text-center space-y-8">
                  <motion.h1
                    className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Hi, I'm Daniel
                  </motion.h1>

                  <div className="relative">
                    <TypewriterText texts={[
                      "Full Stack Developer",
                      "UI/UX Enthusiast",
                      "Problem Solver",
                      "Lifelong Learner",
                      "Tech Enthusiast",
                      "Web Developer",
                      "Coffee Lover",
                      "Music Enthusiast",
                      "Gamer",
                      "Dreamer",
                      "Explorer",
                      
                      "Mentor",
                      "Leader",
                      "Team Player",
                      "Ambitious",
                      "Passionate",
                      "Motivated",
                      "Determined",
                      "Focused",
                      "Positive",
                      "Optimistic",
                      "Adventurous",
                      "Curious",
                      "Persistent",
                      "Resilient",
                      "Empathetic",

                    ]} />
                  </div>

                  <motion.div className="flex gap-6 justify-center">
                    <motion.a
                      href="#projects"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-blue-500 px-8 py-4 rounded-full font-medium hover:bg-blue-600 transition"
                    >
                      View Projects
                    </motion.a>
                    <motion.a
                      href="#contact"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-transparent border-2 border-white px-8 py-4 rounded-full font-medium hover:bg-white hover:text-blue-900 transition"
                    >
                      Contact Me
                    </motion.a>
                  </motion.div>
                </div>

                {/* Interactive Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto p-10">
                  <InteractiveCard>
                    <Weather />
                  </InteractiveCard>
                  
                  <InteractiveCard>
                    <Quote />
                  </InteractiveCard>
                  
                  <InteractiveCard>
                    <GitHubStats />
                  </InteractiveCard>
                </div>
              </motion.div>
            </section>

            {/* Skills Section */}
            <section className="py-20 bg-gradient-to-r from-blue-900/50 to-purple-900/50">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="container mx-auto px-4"
              >
                <h2 className="text-4xl font-bold text-center mb-16">Skills & Technologies</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  {skills.map((skill) => (
                    <SkillBar key={skill.name} skill={skill} />
                  ))}
                </div>
              </motion.div>
            </section>

            {/* Projects Section with 3D Cards */}
            <Projects />
            <Skills />

            {/* Fun Facts Section */}
            <section className="py-20 bg-gradient-to-r from-purple-900/50 to-blue-900/50">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="container mx-auto px-4"
              >
                <FunFact />
              </motion.div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20">
              <ContactForm />
            </section>
          </main>

          <Footer />
        </div>
      )}
    </AnimatePresence>
  );
};

// Helper Components
const TypewriterText = ({ texts }) => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isDeleting) {
        setText(texts[index].substring(0, text.length - 1));
        if (text === '') {
          setIsDeleting(false);
          setIndex((index + 1) % texts.length);
        }
      } else {
        setText(texts[index].substring(0, text.length + 1));
        if (text === texts[index]) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      }
    }, isDeleting ? 50 : 150);

    return () => clearTimeout(timer);
  }, [text, isDeleting, index, texts]);

  return (
    <h2 className="text-2xl font-semibold text-gray-300 h-8">
      {text}<span className="animate-pulse">|</span>
    </h2>
  );
};

const InteractiveCard = ({ children }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    setRotate({ x: rotateX, y: rotateY });
  };

  return (
    <motion.div
      className="bg-white/10 backdrop-blur-lg rounded-xl p-6 cursor-pointer"
      whileHover={{ scale: 1.05 }}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: 'transform 0.1s'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setRotate({ x: 0, y: 0 })}
    >
      {children}
    </motion.div>
  );
};

const SkillBar = ({ skill }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between">
        <span className="font-medium">{skill.name}</span>
        <span>{skill.level}%</span>
      </div>
      <motion.div
        className="h-2 bg-gray-700 rounded-full"
        initial={{ width: 0 }}
        animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="h-full bg-blue-500 rounded-full" />
      </motion.div>
    </div>
  );
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="max-w-2xl mx-auto px-4"
    >
      <h2 className="text-4xl font-bold text-center mb-8">Get in Touch</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            type="text"
            placeholder="Name"
            className="w-full p-3 rounded-lg bg-white/10 backdrop-blur-lg"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-white/10 backdrop-blur-lg"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div>
          <textarea
            placeholder="Message"
            rows={4}
            className="w-full p-3 rounded-lg bg-white/10 backdrop-blur-lg"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-blue-500 py-3 rounded-lg font-medium hover:bg-blue-600 transition"
          type="submit"
        >
          Send Message
        </motion.button>
      </form>
    </motion.div>
  );
};

export default App;