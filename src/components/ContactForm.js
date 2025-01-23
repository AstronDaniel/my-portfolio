import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  SendIcon, 
  UserIcon, 
  MailIcon, 
  MessageSquareIcon, 
  CheckCircle2Icon,
  AlertTriangleIcon,
  LoaderIcon 
} from 'lucide-react';

const ContactForm = ({ theme = 'dark' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    subject: ''
  });
  const [errors, setErrors] = useState({});
  const [formStatus, setFormStatus] = useState({
    sending: false,
    success: false,
    error: false
  });
  const [characterCount, setCharacterCount] = useState(0);
  const fileInputRef = useRef(null);

  const SUBJECTS = [
    "Project Inquiry",
    "Collaboration",
    "Technical Support",
    "Other"
  ];

  const MAX_MESSAGE_LENGTH = 500;

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    
    if (!formData.subject) {
      newErrors.subject = "Please select a subject";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length > MAX_MESSAGE_LENGTH) {
      newErrors.message = `Message too long (max ${MAX_MESSAGE_LENGTH} characters)`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setFormStatus({ sending: true, success: false, error: false });

    try {
      // Simulated form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        message: '',
        subject: ''
      });
      setCharacterCount(0);
      setFormStatus({ sending: false, success: true, error: false });
    } catch (error) {
      setFormStatus({ sending: false, success: false, error: true });
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // File upload logic
      console.log('Uploaded file:', file);
    }
  };

  const inputClassName = (field) => `
    w-full p-3 rounded-lg transition-all duration-200 
    ${errors[field] 
      ? 'border-2 border-red-500 focus:ring-2 focus:ring-red-300'
      : 'focus:ring-2 focus:ring-blue-300'
    }
    ${theme === 'dark' 
      ? 'bg-white/10 focus:bg-white/20' 
      : 'bg-black/5 focus:bg-black/10'
    }
  `;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className={`
        min-h-screen flex items-center justify-center py-12 px-4
        ${theme === 'dark' 
          ? 'bg-gradient-to-br from-gray-900 to-black text-white' 
          : 'bg-gradient-to-br from-gray-100 to-white text-gray-800'
        }
      `}
    >
      <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
        <h2 className="text-4xl font-bold text-center mb-8 
          bg-clip-text text-transparent 
          bg-gradient-to-r from-blue-500 to-purple-500">
          Get in Touch
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div>
            <motion.div 
              className="relative"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <motion.input
                type="text"
                placeholder="Name"
                className={`${inputClassName('name')} pl-10`}
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                whileFocus={{ scale: 1.02 }}
              />
            </motion.div>
            <AnimatePresence>
              {errors.name && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.name}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Email Input */}
          <div>
            <motion.div 
              className="relative"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <motion.input
                type="email"
                placeholder="Email"
                className={`${inputClassName('email')} pl-10`}
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                whileFocus={{ scale: 1.02 }}
              />
            </motion.div>
            <AnimatePresence>
              {errors.email && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.email}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Subject Dropdown */}
          <div>
            <motion.select
              className={`${inputClassName('subject')}`}
              value={formData.subject}
              onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <option value="">Select Subject</option>
              {SUBJECTS.map((subject) => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </motion.select>
            <AnimatePresence>
              {errors.subject && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.subject}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Message Input */}
          <div>
            <motion.div 
              className="relative"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <MessageSquareIcon className="absolute left-3 top-4 text-gray-400" />
              <motion.textarea
                placeholder="Your Message"
                rows={4}
                className={`${inputClassName('message')} pl-10`}
                value={formData.message}
                onChange={(e) => {
                  const message = e.target.value;
                  setFormData(prev => ({ ...prev, message }));
                  setCharacterCount(message.length);
                }}
                maxLength={MAX_MESSAGE_LENGTH}
                whileFocus={{ scale: 1.02 }}
              />
              <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                {characterCount}/{MAX_MESSAGE_LENGTH}
              </div>
            </motion.div>
            <AnimatePresence>
              {errors.message && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* File Upload */}
          <div>
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden" 
              accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
            />
            <motion.button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="w-full py-3 rounded-lg border-2 border-dashed border-gray-300 
                hover:border-blue-500 transition-colors"
              whileHover={{ scale: 1.02 }}
            >
              Upload Supporting Document
            </motion.button>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              w-full py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center
              ${formStatus.sending 
                ? 'bg-gray-400 cursor-not-allowed'
                : formStatus.success 
                ? 'bg-green-500 hover:bg-green-600'
                : formStatus.error
                ? 'bg-red-500 hover:bg-red-600'
                : theme === 'dark'
                ? 'bg-blue-500 hover:bg-blue-600'
                : 'bg-blue-600 hover:bg-blue-700'
              }
              text-white
            `}
            type="submit"
            disabled={formStatus.sending}
          >
            {formStatus.sending ? (
              <LoaderIcon className="animate-spin" />
            ) : formStatus.success ? (
              <>
                <CheckCircle2Icon className="mr-2" /> Message Sent
              </>
            ) : formStatus.error ? (
              <>
                <AlertTriangleIcon className="mr-2" /> Send Failed
              </>
            ) : (
              <>
                <SendIcon className="mr-2" /> Send Message
              </>
            )}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default ContactForm;