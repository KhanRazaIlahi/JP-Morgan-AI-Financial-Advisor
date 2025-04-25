"use client"

import { motion } from 'framer-motion'
import { Bot, FileText, BarChart3, Lightbulb, Lock, FileSearch, LineChart, FileCog } from 'lucide-react'

const features = [
  {
    icon: <Bot className="h-6 w-6 text-primary" />,
    title: "AI-Powered Chat",
    description: "Engage with our advanced AI assistant for personalized financial guidance and product recommendations."
  },
  {
    icon: <FileText className="h-6 w-6 text-primary" />,
    title: "Document Analysis",
    description: "Upload financial documents like 10-Ks and 10-Qs for instant insights and summaries."
  },
  {
    icon: <BarChart3 className="h-6 w-6 text-primary" />,
    title: "Data Visualization",
    description: "View financial data from your documents through interactive charts and graphs for better understanding."
  },
  {
    icon: <Lightbulb className="h-6 w-6 text-primary" />,
    title: "Smart Recommendations",
    description: "Receive tailored financial product suggestions based on your documents and conversations."
  },
  {
    icon: <Lock className="h-6 w-6 text-primary" />,
    title: "Secure Interactions",
    description: "Bank-level security protocols ensure your financial data and conversations remain private."
  },
  {
    icon: <FileSearch className="h-6 w-6 text-primary" />,
    title: "Document Search",
    description: "Quickly search across your uploaded documents to find specific information or insights."
  },
  {
    icon: <LineChart className="h-6 w-6 text-primary" />,
    title: "Financial Trends",
    description: "Identify patterns and trends in your financial data with our advanced analytics engine."
  },
  {
    icon: <FileCog className="h-6 w-6 text-primary" />,
    title: "Custom Reports",
    description: "Generate personalized financial reports based on your uploaded documents and preferences."
  }
]

export default function Features() {
  return (
    <section id="features" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features for Your Financial Journey</h2>
          <p className="text-muted-foreground text-lg">
            Our AI-powered platform combines document analysis with intelligent financial guidance to help you make informed decisions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}