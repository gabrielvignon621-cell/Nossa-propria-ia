'use client'

import React from 'react'
import { Message } from '@/types'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Copy, Check, Zap } from 'lucide-react'

interface ChatMessageProps {
  message: Message
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const isUser = message.role === 'user'

  return (
    <div className={`flex gap-4 py-6 px-4 animate-fade-in ${isUser ? 'bg-transparent' : 'bg-neutral-100 dark:bg-neutral-900'}`}>
      <div className="flex-shrink-0">
        {isUser ? (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
            V
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
            <Zap className="w-4 h-4 text-white" />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            {isUser ? 'Você' : 'Nossa IA'}
          </span>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            {formatDistanceToNow(message.timestamp, { addSuffix: true, locale: ptBR })}
          </span>
        </div>

        {message.thinking && (
          <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800 animate-slide-up">
            <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 mb-2 flex items-center gap-2">
              <span className="animate-pulse">💭</span> Processo de pensamento
            </p>
            <p className="text-sm text-blue-600 dark:text-blue-300 italic">{message.thinking}</p>
          </div>
        )}

        <div className="text-base text-neutral-900 dark:text-neutral-100 leading-relaxed whitespace-pre-wrap break-words prose dark:prose-invert max-w-none">
          {message.content}
        </div>
      </div>

      {!isUser && (
        <button
          onClick={handleCopy}
          className="flex-shrink-0 mt-2 p-2 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-lg transition-all duration-200 hover:scale-110"
          title="Copiar mensagem"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
          )}
        </button>
      )}
    </div>
  )
}

export default ChatMessage
