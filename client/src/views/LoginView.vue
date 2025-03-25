<template>
  <div class="page">
    <form class="form" @submit.prevent="handleLogin">
      <h2>Login</h2>
      <label for="email">Email</label>
      <input class="form-input" type="email" id="email" v-model="email" required />

      <label for="password">Password</label>
      <input class="form-input" type="password" id="password" v-model="password" required />

      <button class="button" type="submit">Login</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios'

export default defineComponent({

  setup() {
    const email = ref<string>('');
    const password = ref<string>('');


    const handleLogin = (): void => {
      const dataPayload = {
        email: email.value,
        password: password.value
      }
      console.log(dataPayload);
      try {
        const res = axios.post('http://localhost:3000/api/login', dataPayload);
        console.log('Login success', res);
      } catch (err: unknown) {
        console.error('Login failed', err);
      }
    };

    return {
      email,
      password,

      handleLogin,
    };
  },
});
</script>

