import { useState, useEffect } from 'react'
import { http } from '../api'

const createUser = (name, email, password) => ({
  id: Date.now().toString(),
  name,
  email,
  password,
  createdAt: new Date().toISOString()
})

export const useAuth = () => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('auth_user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Erro ao carregar usuário do localStorage:', error)
        localStorage.removeItem('auth_user')
      }
    }
    setIsLoading(false)
  }, [])

  const register = async (name, email, password) => {
    try {
      const payload = {
        name,
        email,
        password
      }
      console.log('Enviando payload:', payload) // Debug
      const response = await http.post('auth/register', payload)

      console.log(response.status, response.data)

      return { success: true }
    } catch (error) {
      // Log completo para debug
      console.error('=== ERRO COMPLETO ===')
      console.error('Status:', error.response?.status)
      console.error('Data completa:', error.response?.data)
      console.error('Mensagem:', error.response?.data?.message)
      console.error('Erro completo:', error)

      // Capturar mensagem
      let errorMessage = 'Erro ao realizar cadastro'

      if (error.response?.data) {
        if (Array.isArray(error.response.data.message)) {
          errorMessage = error.response.data.message.join(', ')
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message
        } else if (typeof error.response.data === 'string') {
          errorMessage = error.response.data
        } else {
          errorMessage = JSON.stringify(error.response.data, null, 2)
        }
      } else if (error.message) {
        errorMessage = error.message
      }

      return { success: false, error: errorMessage }
    }
  }

  const login = async (email, password) => {
    try {
      const response = await http.post('auth/login', {
        email,
        password
      })

      const data = await response.data
      setUser(data.user)
      localStorage.setItem('auth_user', JSON.stringify(data.user))
      localStorage.setItem('access_token', JSON.stringify(data.access_token))

      return { success: true, user }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('auth_user')
  }

  const isAuthenticated = !!user

  return {
    user,
    isLoading,
    isAuthenticated,
    register,
    login,
    logout
  }
} 