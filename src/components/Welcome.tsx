'use client'

import React from 'react'
import { Zap, MessageSquare, Shield, Sparkles, ArrowRight } from 'lucide-react'

interface WelcomeProps {
  onStartChat: () => void
}

const Welcome: React.FC<WelcomeProps> = ({ onStartChat }) => {
  const examples = [
    { title: 'Explicar código', description: 'Ajude-me a entender este trecho de código', emoji: '💻', color: 'from-blue-500 to-cyan-500' },
    { title: 'Brainstorm criativo', description: 'Gere ideias para um projeto novo', emoji: '🎨', color: 'from-purple-500 to-pink-500' },
    { title: 'Resolver problema', description: 'Como posso resolver este erro?', emoji: '🔧', color: 'from-orange-500 to-red-500' },
    { title: 'Aprender novo tópico', description: 'Ensine-me sobre Machine Learning', emoji: '📚', color: 'from-green-500 to-emerald-500' },
  ]

  const features = [
    { icon: Zap, title: 'Rápido', description: 'Respostas instantâneas com alta qualidade' },
    { icon: MessageSquare, title: 'Natural', description: 'Conversas fluidas e contextualizadas' },
    { icon: Shield, title: 'Seguro', description: 'Seus dados são sempre protegidos' },
    { icon: Sparkles, title: 'Avançado', description: 'Tecnologia de IA de última geração' },
  ]

  return (
    <div className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full px-4 py-12">
      {/* Logo Animation */}
      <div className="mb-8 animate-slide-up">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300">
          <Sparkles className="w-10 h-10 text-white animate-pulse" />
        </div>
      </div>

      {/* Title */}
      <h1 className="text-5xl md:text-6xl font-black text-neutral-900 dark:text-white mb-4 text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-slide-up">
        Nossa IA
      </h1>
      <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-12 text-center max-w-lg animate-slide-up">
        Uma assistente inteligente de última geração pronta para ajudá-lo com qualquer coisa. Comece uma conversa ou escolha um dos exemplos abaixo.
      </p>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 w-full animate-fade-in">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <div
              key={index}
              className="p-4 rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-50 dark:from-neutral-900 dark:to-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-2" />
              <p className="font-semibold text-neutral-900 dark:text-white mb-1">{feature.title}</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">{feature.description}</p>
            </div>
          )
        })}
      </div>

      {/* Examples */}
      <div className="w-full animate-fade-in">
        <p className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 mb-4 text-center">Exemplos de uso:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {examples.map((example, index) => (
            <button
              key={index}
              onClick={onStartChat}
              className={`p-4 rounded-xl border-2 border-neutral-200 dark:border-neutral-800 bg-gradient-to-br ${example.color} bg-opacity-5 dark:bg-opacity-10 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-opacity-10 dark:hover:bg-opacity-20 transition-all duration-300 text-left group hover:shadow-lg hover:scale-105`}
            >
              <div className="flex items-start justify-between mb-2">
                <p className="text-2xl">{example.emoji}</p>
                <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-all duration-300" />
              </div>
              <p className="font-semibold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {example.title}
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">{example.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-12 animate-fade-in">
        <button
          onClick={onStartChat}
          className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
        >
          Começar conversa
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

export default Welcome
