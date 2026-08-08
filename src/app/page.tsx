'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useStore } from '@/lib/store'
import { chatAPI } from '@/lib/api'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import ChatMessage from '@/components/ChatMessage'
import ChatInput from '@/components/ChatInput'
import Welcome from '@/components/Welcome'
import { Message } from '@/types'

export default function Page() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { currentConversation, addMessage, createConversation } = useStore()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [currentConversation?.messages])

  const handleSendMessage = async (content: string) => {
    if (!currentConversation) {
      createConversation('Novo chat')
      return
    }

    // Add user message
    const userMessage: Message = {
      id: `msg_${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date(),
    }

    addMessage(userMessage)
    setIsLoading(true)

    try {
      const response = await chatAPI.sendMessage(content, currentConversation.id)

      // Add assistant message
      const assistantMessage: Message = {
        id: `msg_${Date.now() + 1}`,
        role: 'assistant',
        content: response.message,
        timestamp: new Date(),
        thinking: response.thinking,
      }

      addMessage(assistantMessage)
    } catch (error) {
      console.error('Failed to send message:', error)

      // Add error message
      const errorMessage: Message = {
        id: `msg_${Date.now() + 1}`,
        role: 'assistant',
        content: 'Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.',
        timestamp: new Date(),
      }

      addMessage(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleStartChat = () => {
    if (!currentConversation) {
      createConversation('Novo chat')
    }
  }

  return (
    <div className="flex h-screen w-full bg-white dark:bg-neutral-950 overflow-hidden">
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} title={currentConversation?.title || 'Nossa IA'} />

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto flex flex-col">
          {currentConversation && currentConversation.messages.length > 0 ? (
            <>
              <div className="flex-1 max-w-4xl mx-auto w-full">
                {currentConversation.messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                {isLoading && (
                  <div className="py-6 px-4 flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-neutral-400 dark:bg-neutral-600 animate-bounce" />
                        <div className="w-2 h-2 rounded-full bg-neutral-400 dark:bg-neutral-600 animate-bounce delay-100" />
                        <div className="w-2 h-2 rounded-full bg-neutral-400 dark:bg-neutral-600 animate-bounce delay-200" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div ref={messagesEndRef} />
            </>
          ) : (
            <Welcome onStartChat={handleStartChat} />
          )}
        </div>

        {/* Chat Input */}
        {currentConversation && (
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        )}
      </div>
    </div>
  )
}
