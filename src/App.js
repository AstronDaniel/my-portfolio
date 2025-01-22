import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Parallax } from "react-scroll-parallax";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Quote from "./components/Quote";
import Weather from "./components/Weather";
import GitHubStats from "./components/GitHubStats";
import FunFact from "./components/FunFact";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import { SpeedInsights } from "@vercel/speed-insights/react"

const App = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isLoading, setIsLoading] = useState(true);
  const [bgImage, setBgImage] = useState(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [theme, setTheme] = useState(() => 
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );

  const fetchBackgroundImage = useCallback(async () => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/photos/random?query=technology&orientation=landscape`,
        {
          headers: {
            Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`,
          },
        }
      );

      if (!response.ok) throw new Error('Failed to fetch image');
      const data = await response.json();
      setBgImage(data.urls.regular);
    } catch (error) {
      console.error("Error fetching image:", error);
      setBgImage('hero-bg.jpg'); // Ensure you have a fallback image
    }
  }, []);

  useEffect(() => {
    fetchBackgroundImage();
    const loadingTimer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(loadingTimer);
  }, [fetchBackgroundImage]);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === "dark" ? "light" : "dark";
      document.documentElement.style.setProperty(
        '--bg-primary',
        newTheme === 'dark' ? '#1a1a1a' : '#ffffff'
      );
      document.documentElement.style.setProperty(
        '--text-primary',
        newTheme === 'dark' ? '#ffffff' : '#1a1a1a'
      );
      return newTheme;
    });
  }, []);

  const heroStyle = {
    backgroundImage: bgImage ? `url(${bgImage})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
  };

  const skills = [
    { name: "React", level: 90 },
    { name: "Node.js", level: 85 },
    { name: "Python", level: 80 },
    { name: "TypeScript", level: 75 }
  ];

  return (
    <AnimatePresence mode="wait">
      <SpeedInsights/>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className={`min-h-screen ${theme} transition-colors duration-300`}>
          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-blue-500 origin-left z-50"
            style={{ scaleX }}
          />

          <Header theme={theme} toggleTheme={toggleTheme} />

          <main className="relative">
            <Parallax speed={-20}>
              <section
                className="min-h-screen relative overflow-hidden"
                style={heroStyle}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-black/50"
                />

                <HeroContent theme={theme} />
                <ParallaxMouse />
                <InteractiveGrid theme={theme} />
              </section>
            </Parallax>

            <section className="py-20 bg-gradient-to-r from-blue-900/50 to-purple-900/50">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
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

            <Projects />
            <Skills />

            <section className="py-20 bg-gradient-to-r from-purple-900/50 to-blue-900/50">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="container mx-auto px-4"
              >
                <FunFact />
              </motion.div>
            </section>

            <section id="contact" className="py-20">
              <ContactForm theme={theme} />
            </section>
          </main>

          <Footer />
        </div>
      )}
    </AnimatePresence>
  );
};

const LoadingScreen = () => (
  <motion.div
    key="loader"
    className="fixed inset-0 bg-blue-900 flex items-center justify-center"
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    <motion.div
      animate={{
        rotate: 360,
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="w-16 h-16 border-4 border-white border-t-transparent rounded-full"
    />
  </motion.div>
);

const ParallaxMouse = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    requestAnimationFrame(() => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      animate={mousePosition}
      transition={{
        type: "spring",
        stiffness: 50,
        damping: 30,
      }}
    >
      <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-500 rounded-full opacity-50 blur-sm" />
      <div className="absolute top-3/4 right-1/4 w-6 h-6 bg-purple-500 rounded-full opacity-50 blur-sm" />
    </motion.div>
  );
};

const InteractiveGrid = ({ theme }) => {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto p-10"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <InteractiveCard theme={theme}>
        <Weather />
      </InteractiveCard>

      <InteractiveCard theme={theme}>
        <Quote />
      </InteractiveCard>

      <InteractiveCard theme={theme}>
        <GitHubStats />
      </InteractiveCard>
    </motion.div>
  );
};

const TypewriterText = ({ texts }) => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isDeleting) {
        setText(prev => prev.slice(0, -1));
        if (text === '') {
          setIsDeleting(false);
          setIndex(prev => (prev + 1) % texts.length);
        }
      } else {
        setText(texts[index].slice(0, text.length + 1));
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

const InteractiveCard = ({ children, theme }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    requestAnimationFrame(() => {
      setRotate({ x: rotateX, y: rotateY });
    });
  }, []);

  return (
    <motion.div
      className={`backdrop-blur-lg rounded-xl p-6 cursor-pointer
        ${theme === 'dark' ? 'bg-white/10' : 'bg-black/5'}`}
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
        className="h-2 bg-gray-700 rounded-full overflow-hidden"
        initial={{ width: 0 }}
        animate={inView ? { width: "100%" } : { width: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.div
          className="h-full bg-blue-500 rounded-full"
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        />
      </motion.div>
    </div>
  );
};

const ContactForm = ({ theme }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log('Form submitted:', formData);
  };

  const inputClassName = `w-full p-3 rounded-lg transition-colors duration-200
    ${theme === 'dark' 
      ? 'bg-white/10 focus:bg-white/20' 
      : 'bg-black/5 focus:bg-black/10'}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="max-w-2xl mx-auto px-4"
    >
      <h2 className="text-4xl font-bold text-center mb-8">Get in Touch</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.input
          type="text"
          placeholder="Name"
          className={inputClassName}
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          whileFocus={{ scale: 1.02 }}
        />
        <motion.input
          type="email"
          placeholder="Email"
          className={inputClassName}
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          whileFocus={{ scale: 1.02 }}
        />
        <motion.textarea
          placeholder="Message"
          rows={4}
          className={inputClassName}
          value={formData.message}
          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
          whileFocus={{ scale: 1.02 }}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-full py-3 rounded-lg font-medium transition-colors duration-200
            ${theme === 'dark'
              ? 'bg-blue-500 hover:bg-blue-600'
              : 'bg-blue-600 hover:bg-blue-700'}`}
          type="submit"
        >
          Send Message
        </motion.button>
      </form>
    </motion.div>
  );
};

const HeroContent = ({ theme }) => {
  const texts = [
    "Full Stack Developer",
    "UI/UX Enthusiast",
    "Problem Solver",
    "Lifelong Learner"
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="container mx-auto px-4 pt-32 relative z-10"
    >
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <motion.h1
          className={`text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r 
            ${theme === 'dark' ? 'from-blue-400 to-purple-500' : 'from-blue-600 to-purple-700'}`}
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Hi, I'm Astrav Daniel
        </motion.h1>

        <div className="relative">
          <TypewriterText texts={texts} />
        </div>

        <motion.div className="flex gap-6 justify-center">
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-8 py-4 rounded-full font-medium transition 
              ${theme === 'dark' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            View Projects
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`border-2 px-8 py-4 rounded-full font-medium transition
              ${theme === 'dark' 
                ? 'border-white hover:bg-white hover:text-blue-900' 
                : 'border-blue-600 hover:bg-blue-600 hover:text-white'}`}
          >
            Contact Me
          </motion.a>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default App;