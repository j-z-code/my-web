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
  <div v-if="authStore.isLoggedIn" class="action-buttons">
  <router-link to="/task/publish" class="action-btn publish-btn">
    🚀 发布新任务
  </router-link>
</div>
<!-- 在 <template> 的适当位置添加 -->
<div v-if="authStore.isLoggedIn" class="task-section">
  <h2>📋 任务列表</h2>
  <div v-if="taskStore.tasks.length === 0" class="empty-tasks">
    <p>暂无任务，快去发布第一个任务吧！</p>
  </div>
  <div v-else class="task-list">
    <TaskCard
      v-for="task in taskStore.tasks"
      :key="task.id"
      :task="task"
    />
  </div>
</div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { useTaskStore } from '@/stores/task'
import TaskCard from '@/components/TaskCard.vue'

const taskStore = useTaskStore()
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
  .task-section {
  margin-top: 40px;
  padding-top: 30px;
  border-top: 1px solid #eee;
}

.task-section h2 {
  color: #333;
  margin-bottom: 25px;
  font-size: 24px;
}

.empty-tasks {
  text-align: center;
  padding: 60px 20px;
  background: #f8f9fa;
  border-radius: 10px;
  color: #6c757d;
}

.empty-tasks p {
  font-size: 16px;
  margin: 0;
}

.task-list {
  display: flex;
  flex-direction: column;
}
  .action-buttons {
  margin: 30px 0;
}

.action-btn {
  display: inline-block;
  padding: 14px 28px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  font-size: 16px;
  transition: transform 0.2s;
}

.action-btn:hover {
  transform: translateY(-2px);
}

.publish-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}
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
