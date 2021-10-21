<template>
  <div>
    <h1>Unprotected Page</h1>
    <router-link to="/posts">Try to consume protected</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Unprotected",
});
</script>
