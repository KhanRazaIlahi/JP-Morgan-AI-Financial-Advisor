"use client"

import Image from 'next/image'
import { FileText, Check, FileBarChart, AlertCircle, FileSpreadsheet, FileQuestion } from 'lucide-react'
import { motion } from 'framer-motion'

const documentTypes = [
  {
    icon: <FileBarChart className="h-6 w-6" />,
    title: "10-K Reports",
    description: "Annual reports with comprehensive financial performance and company strategy information."
  },
  {
    icon: <FileSpreadsheet className="h-6 w-6" />,
    title: "10-Q Reports",
    description: "Quarterly financial statements providing updates on company performance."
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: "Financial Statements",
    description: "Balance sheets, income statements, and cash flow statements for detailed financial analysis."
  },
  {
    icon: <FileQuestion className="h-6 w-6" />,
    title: "Prospectuses",
    description: "Legal documents describing investment offerings and associated risks."
  }
]

const analyticsFeatures = [
  "Revenue trend analysis",
  "Profit margin insights",
  "Risk assessment",
  "Cash flow analysis",
  "Debt ratio evaluation",
  "Year-over-year comparisons"
]

export default function DocumentAnalysisSection() {
  return (
    <section className="py-24 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left side content */}
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Powerful Document Analysis</h2>
            <p className="text-muted-foreground text-lg mb-8">
              Upload your financial documents and let our AI extract key insights, identify trends, and provide actionable recommendations.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {documentTypes.map((doc, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    {doc.icon}
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{doc.title}</h3>
                    <p className="text-sm text-muted-foreground">{doc.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-card rounded-lg p-5 border border-border">
              <h3 className="font-medium mb-3">Advanced Analytics</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2">
                {analyticsFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 py-1.5">
                    <Check size={16} className="text-primary" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Right side image/illustration */}
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Decorative elements */}
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-chart-1/20 rounded-full blur-xl"></div>
              <div className="absolute -left-4 -bottom-4 w-32 h-32 bg-chart-2/20 rounded-full blur-xl"></div>
              
              <div className="relative h-full w-full bg-card rounded-xl overflow-hidden border border-border shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-background"></div>
                
                {/* Document analysis mockup */}
                <div className="relative p-6 h-full">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                      <FileBarChart className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Financial Report Analysis</h3>
                    </div>
                    <div className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">AI Generated</div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <h4 className="text-sm font-medium">Revenue Analysis</h4>
                      <div className="w-full h-6 bg-muted rounded-sm overflow-hidden">
                        <div className="bg-chart-1 h-full" style={{ width: "72%" }}></div>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Previous: $8.2M</span>
                        <span>Current: $14.1M</span>
                      </div>
                    </div>
                    
                    <div className="space-y-1.5">
                      <h4 className="text-sm font-medium">Profit Margins</h4>
                      <div className="w-full h-6 bg-muted rounded-sm overflow-hidden">
                        <div className="bg-chart-2 h-full" style={{ width: "65%" }}></div>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Previous: 18.5%</span>
                        <span>Current: 24.3%</span>
                      </div>
                    </div>
                    
                    <div className="space-y-1.5">
                      <h4 className="text-sm font-medium">Cash Reserves</h4>
                      <div className="w-full h-6 bg-muted rounded-sm overflow-hidden">
                        <div className="bg-chart-3 h-full" style={{ width: "88%" }}></div>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Previous: $1.2M</span>
                        <span>Current: $4.7M</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-background/80 backdrop-blur-sm border border-border rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-primary mt-0.5" />
                        <div>
                          <h4 className="text-sm font-medium">AI Recommendation</h4>
                          <p className="text-xs text-muted-foreground">Based on growth patterns, consider JP Morgan's Business Growth Credit options.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}