<template>
  <div class="publish-container">
    <div class="publish-box">
      <h1>发布新任务</h1>
      <form @submit.prevent="handleSubmit" class="publish-form">
        <div class="form-group">
          <label for="title">任务标题 *</label>
          <input
            type="text"
            id="title"
            v-model="form.title"
            placeholder="请输入任务标题"
            required
          />
        </div>
        
        <div class="form-group">
          <label for="description">任务描述 *</label>
          <textarea
            id="description"
            v-model="form.description"
            placeholder="详细描述任务需求、要求等"
            rows="4"
            required
          ></textarea>
        </div>
        
        <div class="form-group">
          <label for="budget">任务预算（元） *</label>
          <input
            type="number"
            id="budget"
            v-model="form.budget"
            placeholder="请输入预算金额"
            min="0"
            required
          />
        </div>
        
        <div class="button-group">
          <button type="submit" class="submit-btn" :disabled="loading">
            {{ loading ? '发布中...' : '发布任务' }}
          </button>
          <router-link to="/" class="cancel-btn">取消</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTaskStore } from '@/stores/task'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const taskStore = useTaskStore()
const authStore = useAuthStore()
const loading = ref(false)

const form = ref({
  title: '',
  description: '',
  budget: 0
})

const handleSubmit = async () => {
  if (loading.value) return
  loading.value = true

  // 简单验证
  if (!form.value.title || !form.value.description || form.value.budget <= 0) {
    alert('请填写完整信息且预算大于0')
    loading.value = false
    return
  }

  try {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 600))
    
    // 发布任务
    const newTask = taskStore.addTask({
      ...form.value,
      publisher: authStore.userInfo?.username || '匿名用户'
    })
    
    console.log('任务发布成功:', newTask)
    alert(`任务"${form.value.title}"发布成功！`)
    
    // 跳转到任务列表页（明天创建）
    router.push('/')
    
  } catch (error) {
    console.error('发布失败:', error)
    alert('发布失败，请重试')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.publish-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 30px 20px;
}

.publish-box {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.publish-box h1 {
  text-align: center;
  margin-bottom: 40px;
  color: #333;
}

.publish-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #555;
  font-size: 15px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 15px;
  transition: border-color 0.3s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #007bff;
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
}

.button-group {
  display: flex;
  gap: 16px;
  margin-top: 20px;
}

.submit-btn {
  flex: 1;
  padding: 14px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s;
}

.submit-btn:hover:not(:disabled) {
  background: #0056b3;
}

.submit-btn:disabled {
  background: #6c757d;
  cursor: not-allowed;
}

.cancel-btn {
  flex: 1;
  padding: 14px;
  background: #f8f9fa;
  color: #495057;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  transition: all 0.3s;
}

.cancel-btn:hover {
  background: #e9ecef;
  border-color: #ced4da;
}
</style>