import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Conversation, Message, AppSettings } from '@/types'

interface AppStore {
  conversations: Conversation[]
  currentConversation: Conversation | null
  settings: AppSettings
  
  createConversation: (title: string) => void
  selectConversation: (id: string) => void
  deleteConversation: (id: string) => void
  addMessage: (message: Message) => void
  updateSettings: (settings: Partial<AppSettings>) => void
  clearAllData: () => void
}

const defaultSettings: AppSettings = {
  theme: 'dark',
  fontSize: 'base',
  notifications: true,
}

export const useStore = create<AppStore>()(persist(
  (set) => ({
    conversations: [],
    currentConversation: null,
    settings: defaultSettings,
    
    createConversation: (title: string) => set((state) => {
      const newConversation: Conversation = {
        id: Date.now().toString(),
        title,
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      return {
        conversations: [newConversation, ...state.conversations],
        currentConversation: newConversation,
      }
    }),
    
    selectConversation: (id: string) => set((state) => ({
      currentConversation: state.conversations.find((c) => c.id === id) || null,
    })),
    
    deleteConversation: (id: string) => set((state) => ({
      conversations: state.conversations.filter((c) => c.id !== id),
      currentConversation: state.currentConversation?.id === id ? null : state.currentConversation,
    })),
    
    addMessage: (message: Message) => set((state) => {
      if (!state.currentConversation) return state
      return {
        currentConversation: {
          ...state.currentConversation,
          messages: [...state.currentConversation.messages, message],
          updatedAt: new Date(),
        },
        conversations: state.conversations.map((c) =>
          c.id === state.currentConversation?.id
            ? { ...c, messages: [...c.messages, message], updatedAt: new Date() }
            : c
        ),
      }
    }),
    
    updateSettings: (newSettings: Partial<AppSettings>) => set((state) => ({
      settings: { ...state.settings, ...newSettings },
    })),
    
    clearAllData: () => set(() => ({
      conversations: [],
      currentConversation: null,
      settings: defaultSettings,
    })),
  }),
  {
    name: 'app-store',
  }
))
