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
        <button type="submit" class="login-btn">登录</button>
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

// 1. 使用 ref 创建响应式数据对象
const loginForm = ref({
  username: '',
  password: ''
})

// 获取路由实例，用于后续跳转
const router = useRouter()

// 登录处理函数 (将在代码块C中实现)
// 登录处理函数
const handleLogin = () => {
  // 1. 简单验证
  if (!loginForm.value.username || !loginForm.value.password) {
    alert('用户名和密码不能为空！')
    return
  }

  // 2. 打印数据到控制台（模拟请求）
  console.log('尝试登录，表单数据：', loginForm.value)

  // 3. 模拟登录成功，跳转到首页
  // 先简单模拟一个成功提示
  alert(`欢迎回来，${loginForm.value.username}！`)
  
  // 实际项目中这里会是调用API，成功后：
  // 1. 保存 token
  // 2. 跳转页面
  router.push('/') // 跳转到首页
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 20px;
}

.login-box {
  width: 100%;
  max-width: 400px;
  padding: 40px;
  border: 1px solid #e1e4e8;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.login-box h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.login-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #555;
}

.form-group input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d9e0;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #007bff;
}

.login-btn {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-btn:hover {
  background-color: #0056b3;
}

.back-home {
  text-align: center;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}
</style>