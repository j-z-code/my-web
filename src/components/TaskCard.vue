<template>
  <div class="task-card" :class="`status-${task.status}`">
    <div class="task-header">
      <h3 class="task-title">{{ task.title }}</h3>
      <span class="task-budget">￥{{ task.budget }}</span>
    </div>
    
    <p class="task-description">{{ task.description }}</p>
    
    <div class="task-footer">
      <div class="task-meta">
        <span class="task-publisher">发布者: {{ task.publisher }}</span>
        <span class="task-date">{{ task.createdAt }}</span>
      </div>
      <div class="task-actions">
        <span class="task-status">{{ statusText }}</span>
        <router-link :to="`/task/${task.id}`" class="detail-link">查看详情</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Task } from '@/stores/task'

const props = defineProps<{
  task: Task
}>()

const statusText = computed(() => {
  const map = {
    'pending': '待承接',
    'in-progress': '进行中',
    'completed': '已完成'
  }
  return map[props.task.status]
})
</script>

<style scoped>
.task-card {
  background: white;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  border-left: 4px solid #6c757d;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s, box-shadow 0.2s;
}

.task-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.task-card.status-pending {
  border-left-color: #ffc107;
}

.task-card.status-in-progress {
  border-left-color: #007bff;
}

.task-card.status-completed {
  border-left-color: #28a745;
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.task-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
  flex: 1;
}

.task-budget {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 14px;
  white-space: nowrap;
  margin-left: 10px;
}

.task-description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.task-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.task-meta {
  color: #888;
}

.task-publisher {
  margin-right: 15px;
}

.task-date {
  color: #aaa;
}

.task-actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.task-status {
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.status-pending .task-status {
  background: #fff3cd;
  color: #856404;
}

.status-in-progress .task-status {
  background: #cce5ff;
  color: #004085;
}

.status-completed .task-status {
  background: #d4edda;
  color: #155724;
}

.detail-link {
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
}

.detail-link:hover {
  text-decoration: underline;
}
</style>