import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
})

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface ChatResponse {
  message: string
  thinking?: string
  model: string
}

export const chatAPI = {
  async sendMessage(message: string, conversationId?: string): Promise<ChatResponse> {
    try {
      const response = await apiClient.post('/chat', {
        message,
        conversationId,
      })
      return response.data
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  },

  async getConversation(conversationId: string) {
    try {
      const response = await apiClient.get(`/conversations/${conversationId}`)
      return response.data
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  },

  async getConversations() {
    try {
      const response = await apiClient.get('/conversations')
      return response.data
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  },

  async deleteConversation(conversationId: string) {
    try {
      await apiClient.delete(`/conversations/${conversationId}`)
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  },
}

export default apiClient
