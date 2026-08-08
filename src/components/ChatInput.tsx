'use client'

import React from 'react'
import { Send, Plus, Paperclip, Loader } from 'lucide-react'

interface ChatInputProps {
  onSendMessage: (message: string) => void
  isLoading?: boolean
  disabled?: boolean
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading = false, disabled = false }) => {
  const [input, setInput] = React.useState('')
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !isLoading && !disabled) {
      onSendMessage(input.trim())
      setInput('')
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as any)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px'
    }
  }

  return (
    <div className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-4">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="flex gap-3 items-end">
          <button
            type="button"
            disabled={disabled}
            className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Novo chat"
          >
            <Plus className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
          </button>

          <div className="flex-1 flex gap-2">
            <button
              type="button"
              disabled={disabled}
              className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Anexar arquivo"
            >
              <Paperclip className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
            </button>

            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              disabled={isLoading || disabled}
              placeholder="Envie uma mensagem... (Shift + Enter para nova linha)"
              className="flex-1 resize-none p-3 rounded-lg bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 border-2 border-neutral-200 dark:border-neutral-800 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              rows={1}
              style={{ minHeight: '44px', maxHeight: '200px' }}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || disabled || !input.trim()}
            className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white disabled:bg-neutral-300 dark:disabled:bg-neutral-700 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-lg disabled:shadow-none"
            title="Enviar mensagem"
          >
            {isLoading ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ChatInput
