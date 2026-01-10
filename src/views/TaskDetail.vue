<template>
  <div class="detail-container">
    <div v-if="task" class="detail-card">
      <div class="detail-header">
        <h1 class="detail-title">{{ task.title }}</h1>
        <div class="detail-meta">
          <span class="detail-budget">￥{{ task.budget }}</span>
          <span class="detail-status" :class="`status-${task.status}`">
            {{ statusText }}
          </span>
        </div>
      </div>
      
      <div class="detail-content">
        <div class="detail-section">
          <h3>📝 任务描述</h3>
          <p class="detail-description">{{ task.description }}</p>
        </div>
        
        <div class="detail-info">
          <div class="info-item">
            <span class="info-label">发布者</span>
            <span class="info-value">{{ task.publisher }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">发布时间</span>
            <span class="info-value">{{ task.createdAt }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">任务ID</span>
            <span class="info-value">{{ task.id }}</span>
          </div>
        </div>
      </div>
      
      <div class="detail-actions">
        <button 
          v-if="task.status === 'pending' && authStore.isLoggedIn"
          @click="acceptTask"
          class="action-btn accept-btn"
        >
          承接此任务
        </button>
        <router-link to="/" class="action-btn back-btn">返回列表</router-link>
      </div>
    </div>
    
    <div v-else class="not-found">
      <h2>任务不存在</h2>
      <p>您查找的任务可能已被删除或不存在</p>
      <router-link to="/" class="back-link">返回首页</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTaskStore } from '@/stores/task'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const taskStore = useTaskStore()
const authStore = useAuthStore()

const taskId = Number(route.params.id)
const task = computed(() => taskStore.getTaskById(taskId))

const statusText = computed(() => {
  const map = {
    'pending': '待承接',
    'in-progress': '进行中', 
    'completed': '已完成'
  }
  return map[task.value?.status || 'pending']
})

const acceptTask = () => {
  if (confirm(`确定要承接任务"${task.value?.title}"吗？`)) {
    taskStore.updateTaskStatus(taskId, 'in-progress')
    alert('承接成功！请及时与发布者联系。')
    router.push('/')
  }
}

onMounted(() => {
  if (!task.value) {
    console.warn(`任务 ${taskId} 不存在`)
  }
})
</script>

<style scoped>
.detail-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 30px 20px;
}

.detail-card {
  background: white;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.08);
}

.detail-header {
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.detail-title {
  font-size: 28px;
  color: #333;
  margin: 0 0 15px 0;
}

.detail-meta {
  display: flex;
  align-items: center;
  gap: 20px;
}

.detail-budget {
  font-size: 24px;
  font-weight: 700;
  color: #f5576c;
}

.detail-status {
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
}

.detail-status.status-pending {
  background: #fff3cd;
  color: #856404;
}

.detail-status.status-in-progress {
  background: #cce5ff;
  color: #004085;
}

.detail-status.status-completed {
  background: #d4edda;
  color: #155724;
}

.detail-content {
  display: grid;
  gap: 30px;
}

.detail-section h3 {
  font-size: 18px;
  color: #495057;
  margin: 0 0 15px 0;
}

.detail-description {
  line-height: 1.8;
  color: #666;
  font-size: 16px;
  white-space: pre-line;
}

.detail-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  background: #f8f9fa;
  padding: 25px;
  border-radius: 8px;
}

.info-item {
  display: flex;
  flex-direction: column;
}

.info-label {
  font-size: 14px;
  color: #6c757d;
  margin-bottom: 5px;
}

.info-value {
  font-size: 16px;
  color: #333;
  font-weight: 500;
}

.detail-actions {
  display: flex;
  gap: 15px;
  margin-top: 40px;
  padding-top: 30px;
  border-top: 1px solid #eee;
}

.action-btn {
  padding: 12px 28px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s;
  border: none;
}

.accept-btn {
  background: linear-gradient(135deg, #4cd964 0%, #5ac8fa 100%);
  color: white;
}

.accept-btn:hover {
  opacity: 0.9;
}

.back-btn {
  background: #6c757d;
  color: white;
}

.back-btn:hover {
  background: #545b62;
}

.not-found {
  text-align: center;
  padding: 60px 20px;
}

.not-found h2 {
  color: #dc3545;
  margin-bottom: 15px;
}

.not-found p {
  color: #6c757d;
  margin-bottom: 30px;
}

.back-link {
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
}

.back-link:hover {
  text-decoration: underline;
}
</style>