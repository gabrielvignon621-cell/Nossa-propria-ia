export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  thinking?: string
}

export interface Conversation {
  id: string
  title: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

export interface AppSettings {
  theme: 'light' | 'dark' | 'system'
  fontSize: 'sm' | 'base' | 'lg'
  notifications: boolean
}
