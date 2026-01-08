<template>
  <div class="login-container">
    <div class="login-box">
      <h1>用户登录</h1>
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="username">用户名：</label>
          <input
            type="text"
            id="username"
            v-model="loginForm.username"
            placeholder="请输入用户名"
          />
        </div>
        <div class="form-group">
          <label for="password">密码：</label>
          <input
            type="password"
            id="password"
            v-model="loginForm.password"
            placeholder="请输入密码"
          />
        </div>
       <button 
          type="submit" 
          class="login-btn"
          :disabled="loading"
        >
          {{ loading ? '登录中...' : '登录' }}
        </button>
      </form>
      <p class="back-home">
        <router-link to="/">返回首页</router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const loginForm = ref({
  username: '',
  password: ''
})

const router = useRouter()
const authStore = useAuthStore()
const loading = ref(false)

const handleLogin = async () => {
  if (loading.value) return
  loading.value = true
  
  if (!loginForm.value.username || !loginForm.value.password) {
    alert('用户名和密码不能为空！')
    loading.value = false
    return
  }

  try {
    console.log('发送登录请求...')
    
    // 调试：验证Store
    console.log('【调试】authStore对象:', authStore)
    console.log('【调试】authStore.login类型:', typeof authStore.login)
    
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // 模拟后端返回的数据
    const mockUserData = {
      token: 'mock_jwt_token_' + Date.now(),
      username: loginForm.value.username
    }
    
    console.log('【调试】准备调用login，数据:', mockUserData)
    
    // 【核心】调用Pinia Store，更新全局状态
    authStore.login(mockUserData)
    
    // 立即验证存储结果
    console.log('【验证】调用login后:')
    console.log('1. localStorage token:', localStorage.getItem('token'))
    console.log('2. Store token:', authStore.token)
    console.log('3. Store isLoggedIn:', authStore.isLoggedIn)
    
    alert(`登录成功！欢迎，${loginForm.value.username}`)
    
    // 跳转到首页
    router.push('/')
    
  } catch (error: any) {
    console.error('登录失败:', error)
    alert(`登录失败: ${error.message || '未知错误'}`)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* 样式保持不变 */
</style>