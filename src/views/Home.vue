<template>
  <div class="home">
    <h1>任务发布与接单管理系统</h1>
    
    <!-- 显示登录状态 -->
    <div class="auth-status" v-if="authStore.isLoggedIn">
      <p>✅ 已登录 | 用户：<strong>{{ authStore.userInfo?.username }}</strong></p>
      <button @click="handleLogout" class="logout-btn">退出登录</button>
    </div>
    <div v-else>
      <p>❌ 未登录</p>
      <router-link to="/login">去登录</router-link>
    </div>

    <hr />
    
    <p>这里是系统的主页，未来会展示任务列表和统计数据。</p>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

// 初始化：检查本地是否有token，恢复登录状态
authStore.initialize()

const handleLogout = () => {
  authStore.logout()
  alert('已退出登录')
  router.push('/login')
}
</script>

<style scoped>
.home {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}
.auth-status {
  background: #f0f9ff;
  padding: 15px;
  border-radius: 8px;
  margin: 20px 0;
}
.logout-btn {
  margin-top: 10px;
  padding: 8px 16px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.logout-btn:hover {
  background: #c82333;
}
</style>