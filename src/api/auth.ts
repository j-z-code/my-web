// src/stores/auth.ts
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
    localStorage.setItem('token', newToken) // 这行必须存在！
    console.log('【Store】token已存储:', newToken) // 调试用
  }

  const setUserInfo = (info: { username: string }) => {
    userInfo.value = info
  }

  const login = (userData: { token: string; username: string }) => {
    console.log('【Store】login方法被调用，数据:', userData) // 调试用
    setToken(userData.token)
    setUserInfo({ username: userData.username })
  }

  const logout = () => {
    token.value = null
    userInfo.value = null
    localStorage.removeItem('token')
  }

  // 初始化：从localStorage恢复状态
  const initialize = () => {
    const savedToken = localStorage.getItem('token')
    if (savedToken) {
      token.value = savedToken
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