<template>
  <AuthProvider
    v-bind:post_logout_redirect_uri="post_logout_redirect_uri"
    v-slot="{
      user,
      logoutWithRedirect,
      isAuthenticated,
    }"
  >
    <div v-if="isAuthenticated">
      <h1>Hello {{ user.sub }}</h1>
      <button v-on:click="logoutWithRedirect({})">
        Logout
      </button>
    </div>
    <div v-else>You are not logged in</div>
  </AuthProvider>
</template>

<script>
export default {
  name: "Protected",
  data() {
    return { post_logout_redirect_uri: window.location.origin + "/" };
  },
};
</script>
