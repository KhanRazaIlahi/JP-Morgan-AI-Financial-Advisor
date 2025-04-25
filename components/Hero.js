"use client"

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
}

export default function Hero() {
  const [email, setEmail] = useState('')

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-background overflow-hidden">
      {/* Abstract gradient bg */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 top-0 w-1/2 h-1/2 bg-gradient-to-bl from-primary/5 to-transparent" />
        <div className="absolute left-0 bottom-0 w-1/2 h-1/2 bg-gradient-to-tr from-primary/5 to-transparent" />
      </div>

      <motion.div 
        className="container mx-auto px-4 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div variants={itemVariants} className="inline-block px-3 py-1 mb-6 rounded-full bg-primary/10 text-primary text-sm font-medium">
            Introducing JP Morgan AI Financial Advisor
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Your AI-Powered <span className="text-primary">Financial Assistant</span> for Smarter Decisions
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-muted-foreground text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            Upload financial documents, get instant analysis, and receive personalized guidance on JP Morgan's financial products—all through an intuitive AI conversational interface.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button className="w-full sm:w-auto whitespace-nowrap bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-md font-medium transition-colors flex items-center justify-center gap-2">
              Get Started <ArrowRight size={16} />
            </button>
          </motion.div>
          
          <motion.div variants={itemVariants} className="mt-6 text-sm text-muted-foreground">
            No credit card required. Start your free 14-day trial today.
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}