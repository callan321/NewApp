<template>
  <div class="page">
    <form class="form" @submit.prevent="handleRegister">
      <h2>Register</h2>

      <label for="user_name">User Name</label>
      <input class="form-input" type="text" id="user_name" v-model="user_name"  required />

      <label for="email">Email</label>
      <input class="form-input" type="email" id="email" v-model="email" required />

      <label for="password">Password</label>
      <input class="form-input" type="password" id="password" v-model="password" required />

      <button class="button" type="submit">Register</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios'

export default defineComponent({
  setup() {
    const email = ref<string>('');
    const user_name = ref<string>('');
    const password = ref<string>('');


    const handleRegister = (): void => {
      const dataPayload = {
        user_name: user_name.value,
        email: email.value,
        password: password.value
      }
      console.log(dataPayload);
      try {
        const res = axios.post('http://localhost:3000/api/register', dataPayload);
        console.log('Registration success', res);
      } catch (err: unknown) {
        console.error('Registration failed', err);
      }
    };


    return {
      email,
      password,
      user_name,
      handleRegister
    };
  },
});
</script>

