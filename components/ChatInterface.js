"use client"

import { useState, useRef, useEffect } from 'react'
import { Send, ArrowDown, X, Paperclip } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { processFile } from '@/lib/utils/processFile'

const MessageType = {
  USER: 'user',
  BOT: 'bot',
}

const initialMessages = [
  {
    id: 1,
    type: MessageType.BOT,
    content: "Hello! I'm your JP Morgan AI Financial Advisor. How can I assist you today?",
    timestamp: new Date(),
  }
]

export default function ChatInterface() {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [file, setFile] = useState(null)
  const [showScrollButton, setShowScrollButton] = useState(false)
  
  const messagesEndRef = useRef(null)
  const fileInputRef = useRef(null)
  const chatContainerRef = useRef(null)
  
  useEffect(() => {
    scrollToBottom()
  }, [messages])
  
  useEffect(() => {
    const handleScroll = () => {
      if (!chatContainerRef.current) return
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current
      setShowScrollButton(scrollHeight - scrollTop - clientHeight > 100)
    }
    
    const container = chatContainerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [])
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  
  const handleSendMessage = async () => {
    if (input.trim() === '' && !file) return
    
    // Add user message
    const userMessage = {
      id: Date.now(),
      type: MessageType.USER,
      content: input,
      file: file,
      timestamp: new Date(),
    }
    
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)
    
    try {
      let response;
      
      if (file) {
        // Process file
        const result = await processFile(file)
        response = { content: result.analysis }
      } else {
        // Regular chat message
        const chatResponse = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: [{ role: 'user', content: input }]
          }),
        })
        
        if (!chatResponse.ok) {
          throw new Error('Failed to get response')
        }
        
        const data = await chatResponse.json()
        response = data.response
      }
      
      setMessages(prev => [...prev, {
        id: Date.now(),
        type: MessageType.BOT,
        content: response.content,
        timestamp: new Date(),
      }])
    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [...prev, {
        id: Date.now(),
        type: MessageType.BOT,
        content: "I apologize, but I encountered an error processing your request. Please try again.",
        timestamp: new Date(),
      }])
    } finally {
      setIsTyping(false)
      setFile(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }
  
  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }
  
  const removeFile = () => {
    setFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }
  
  const formatMessage = (content) => {
    if (!content) return ''
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n\n/g, '<br /><br />')
      .replace(/\n•\s(.*)/g, '<br />• $1')
  }
  
  return (
    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden flex flex-col h-[600px] relative">
      <div className="bg-card p-4 border-b border-border flex items-center">
        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
          <Bot size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="font-medium">JP Morgan Financial Advisor</h3>
          <p className="text-xs text-muted-foreground">AI-powered assistant</p>
        </div>
      </div>
      
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.type === MessageType.USER ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-xl p-3 ${
                  message.type === MessageType.USER 
                    ? 'bg-primary text-primary-foreground rounded-tr-none' 
                    : 'bg-secondary text-secondary-foreground rounded-tl-none'
                }`}
              >
                {message.file && (
                  <div className="mb-2 p-2 bg-background/10 rounded-md flex items-center">
                    <FileText size={16} className="mr-2" />
                    <span className="text-sm truncate">{message.file.name}</span>
                  </div>
                )}
                <div 
                  className="text-sm"
                  dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
                />
                <div className={`text-xs mt-1 ${message.type === MessageType.USER ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                  {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="bg-secondary text-secondary-foreground rounded-xl rounded-tl-none p-3 max-w-[80%]">
              <div className="flex space-x-1">
                <span className="w-2 h-2 bg-muted-foreground/70 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                <span className="w-2 h-2 bg-muted-foreground/70 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-2 h-2 bg-muted-foreground/70 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <AnimatePresence>
        {showScrollButton && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToBottom}
            className="absolute bottom-24 right-4 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
            title="Scroll to bottom"
          >
            <ArrowDown size={16} />
          </motion.button>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {file && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-2 border-t border-border bg-card/80"
          >
            <div className="flex items-center p-2 bg-muted rounded-md">
              <FileText size={16} className="mr-2 text-primary" />
              <span className="text-sm truncate flex-1">{file.name}</span>
              <button 
                onClick={removeFile}
                className="ml-2 p-1 hover:bg-muted-foreground/20 rounded-full"
                aria-label="Remove file"
              >
                <X size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="p-4 border-t border-border">
        <div className="flex items-end gap-2">
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="w-full p-3 pr-10 rounded-lg border border-input bg-background min-h-[80px] max-h-[200px] focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm resize-none"
            />
            <div className="absolute bottom-3 right-3 flex space-x-1">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.txt"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-1.5 rounded-md hover:bg-muted transition-colors"
                title="Attach file"
              >
                <Paperclip size={18} className="text-muted-foreground" />
              </button>
            </div>
          </div>
          <button
            onClick={handleSendMessage}
            disabled={input.trim() === '' && !file}
            className="bg-primary text-primary-foreground p-3 rounded-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Upload financial documents for analysis or type your question about JP Morgan products.
        </p>
      </div>
    </div>
  )
}

function Bot(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  )
}

function FileText(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
  )
}