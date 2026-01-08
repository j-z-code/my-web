import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // 状态
  const token = ref<string | null>(localStorage.getItem('token'))
  const userInfo = ref<{ username: string } | null>(null)

  // 计算属性
  const isLoggedIn = computed(() => !!token.value)

  // 动作
  const setToken = (newToken: string) => {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  const setUserInfo = (info: { username: string }) => {
    userInfo.value = info
  }

  const login = (userData: { token: string; username: string }) => {
    setToken(userData.token)
    setUserInfo({ username: userData.username })
  }

  const logout = () => {
    token.value = null
    userInfo.value = null
    localStorage.removeItem('token')
  }

  // 初始化：从localStorage恢复状态（如果有token的话）
  const initialize = () => {
    const savedToken = localStorage.getItem('token')
    if (savedToken) {
      token.value = savedToken
      // 这里可以调用API获取最新的用户信息
      userInfo.value = { username: '已登录用户' }
    }
  }

  return {
    token,
    userInfo,
    isLoggedIn,
    setToken,
    setUserInfo,
    login,
    logout,
    initialize
  }
})