import React from 'react';

import { Github, Linkedin, Mail, ExternalLink, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const links = [
    { title: 'Projects', items: ['Portfolio', 'Blog', 'Open Source'] },
    { title: 'Connect', items: ['About Me', 'Contact', 'Resume'] },
    { title: 'Legal', items: ['Privacy Policy', 'Terms', 'Cookies'] }
  ];

  const socials = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: '#', label: 'Email' }
  ];

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-300">
      <div className="container mx-auto px-4 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">Daniel's Portfolio</h2>
            <p className="text-sm">Crafting digital experiences with passion and precision</p>
            <div className="flex space-x-4">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="hover:text-blue-400 transition-colors duration-200"
                  aria-label={label}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {links.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item}>
                    <button className="hover:text-blue-400 transition-colors duration-200 flex items-center gap-1 text-sm">
                      {item}
                      <ExternalLink size={12} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">
            © {new Date().getFullYear()} Daniel's Portfolio. Built with ❤️ and React.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors duration-200"
          >
            <ArrowUp size={16} />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;