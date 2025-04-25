"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled ? 'bg-background/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
    )}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <span className="text-primary-foreground font-bold">JP</span>
          </div>
          <span className="font-bold text-xl hidden sm:inline-block">JP Morgan AI Advisor</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
            Features
          </Link>
          <Link href="#products" className="text-sm font-medium hover:text-primary transition-colors">
            Products
          </Link>
          <Link href="#support" className="text-sm font-medium hover:text-primary transition-colors">
            Support
          </Link>
          
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full hover:bg-accent transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
            Sign In
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center md:hidden">
          <button 
            onClick={toggleTheme} 
            className="p-2 mr-2 rounded-full hover:bg-accent transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <button 
            onClick={toggleMenu} 
            className="p-2 rounded-full hover:bg-accent transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-background border-b border-border md:hidden">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link 
              href="/" 
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link 
              href="#features" 
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={toggleMenu}
            >
              Features
            </Link>
            <Link 
              href="#products" 
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={toggleMenu}
            >
              Products
            </Link>
            <Link 
              href="#support" 
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={toggleMenu}
            >
              Support
            </Link>
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors w-full">
              Sign In
            </button>
          </div>
        </div>
      )}
    </header>
  )
}