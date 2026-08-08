'use client'

import React from 'react'
import { useStore } from '@/lib/store'
import { Menu, Plus, MessageSquare, Settings, LogOut, Trash2, Search, ChevronRight } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { conversations, currentConversation, createConversation, selectConversation, deleteConversation } = useStore()
  const [searchTerm, setSearchTerm] = React.useState('')

  const filteredConversations = conversations.filter((c) =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <aside
      className={`${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-neutral-900 to-neutral-950 text-white border-r border-neutral-800 flex flex-col z-50 md:relative md:translate-x-0`}
    >
      {/* Header */}
      <div className="p-4 border-b border-neutral-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">IA</span>
            </div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Nossa IA
            </h1>
          </div>
          <button
            onClick={onClose}
            className="md:hidden p-1 hover:bg-neutral-800 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
        <button
          onClick={() => createConversation('Novo chat')}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 transition-all duration-200 text-sm font-semibold shadow-lg hover:shadow-xl"
        >
          <Plus className="w-4 h-4" />
          Novo chat
        </button>
      </div>

      {/* Search */}
      <div className="p-3 border-b border-neutral-800">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-800 text-neutral-400 text-sm hover:bg-neutral-700 transition-colors">
          <Search className="w-4 h-4 flex-shrink-0" />
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent flex-1 outline-none"
          />
        </div>
      </div>

      {/* Conversations List */}
      <nav className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-neutral-900">
        {filteredConversations.length > 0 ? (
          <ul className="space-y-2 px-2">
            {filteredConversations.map((conversation) => (
              <li key={conversation.id}>
                <button
                  onClick={() => {
                    selectConversation(conversation.id)
                    onClose()
                  }}
                  className={`w-full flex items-start justify-between gap-2 px-3 py-3 rounded-lg transition-all duration-200 group ${
                    currentConversation?.id === conversation.id
                      ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg'
                      : 'text-neutral-300 hover:bg-neutral-800'
                  }`}
                >
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-sm font-medium truncate line-clamp-2">{conversation.title}</p>
                    <p className={`text-xs mt-1 ${currentConversation?.id === conversation.id ? 'text-blue-100' : 'text-neutral-500'}`}>
                      {formatDistanceToNow(conversation.updatedAt, {
                        addSuffix: true,
                        locale: ptBR,
                      })}
                    </p>
                  </div>
                  {currentConversation?.id === conversation.id && (
                    <ChevronRight className="w-4 h-4 flex-shrink-0" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-12 px-4">
            <MessageSquare className="w-8 h-8 text-neutral-600 mx-auto mb-3" />
            <p className="text-sm text-neutral-400">{searchTerm ? 'Nenhuma conversa encontrada' : 'Nenhuma conversa ainda'}</p>
          </div>
        )}
      </nav>

      {/* Footer */}
      <div className="border-t border-neutral-800 p-4 space-y-2">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg hover:bg-neutral-800 transition-all duration-200 text-sm text-neutral-300 font-medium">
          <Settings className="w-4 h-4" />
          Configurações
        </button>
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg hover:bg-neutral-800 transition-all duration-200 text-sm text-neutral-300 font-medium">
          <LogOut className="w-4 h-4" />
          Sair
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
