<script setup lang="ts">

import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="page">
    <div class="container">
    <h1> This is home </h1>
    <h3> To see person page login or register</h3>
      <div class="container-row">
        <RouterLink class="button" to="/login">Login</RouterLink>
        <RouterLink class="button"  to="/register">Register</RouterLink>
      </div>
    </div>
  </main>
</template>
