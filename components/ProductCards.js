"use client"

import { motion } from 'framer-motion'
import { CreditCard, PiggyBank, Home, TrendingUp, ArrowRight } from 'lucide-react'

const products = [
  {
    icon: <CreditCard className="h-6 w-6" />,
    title: "Credit Cards",
    description: "Explore our range of credit cards with competitive rates, rewards, and exclusive benefits.",
    color: "bg-chart-1/10 text-chart-1",
    link: "#"
  },
  {
    icon: <PiggyBank className="h-6 w-6" />,
    title: "Savings Accounts",
    description: "Grow your wealth with our high-yield savings accounts and flexible access options.",
    color: "bg-chart-2/10 text-chart-2",
    link: "#"
  },
  {
    icon: <Home className="h-6 w-6" />,
    title: "Mortgages",
    description: "Find the perfect mortgage solution with competitive rates and flexible repayment terms.",
    color: "bg-chart-3/10 text-chart-3",
    link: "#"
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: "Investments",
    description: "Diversify your portfolio with our range of investment products and expert guidance.",
    color: "bg-chart-4/10 text-chart-4",
    link: "#"
  }
]

export default function ProductCards() {
  return (
    <section id="products" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Financial Products & Solutions</h2>
          <p className="text-muted-foreground text-lg">
            Discover our range of financial products designed to meet your unique needs and goals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={index}
              className="bg-card rounded-xl p-6 border border-border hover:shadow-md transition-all group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className={`w-12 h-12 ${product.color} rounded-lg flex items-center justify-center mb-4`}>
                {product.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
              <p className="text-muted-foreground mb-4">{product.description}</p>
              <a
                href={product.link}
                className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Learn more
                <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}