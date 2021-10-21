<template>
  <AuthProvider
    ref="authProvider"
    v-bind:post_logout_redirect_uri="post_logout_redirect_uri"
    v-slot="{
      isAuthenticated,
    }"
  >
    <div v-if="isAuthenticated" v-on:click="myFunc()">
      <div v-if="error">Error: {{ error }}</div>
      <div v-else>
        <h1 className="text-3xl font-semibold pb-12">Posts</h1>
        <div className="sm:w-full lg:w-1/2">
          <ul className="divide-y-2 divide-gray-100">
            <li
              v-for="post in posts"
              :key="post.id"
              className="flex justify-between p-3 hover:bg-gray-50"
            >
              <h3 className="text-sm font-medium">{{ post.name }}</h3>
              <p className="text-sm text-gray-500">{{ post.description }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-else>You are not logged in</div>
  </AuthProvider>
</template>

<script>
export default {
  name: "Posts",

  computed: {
    isAuthenticated() {
      return this.auth.getIsAuthenticated();
    },
  },

  watch: {
    isAuthenticated(value) {
      console.log("called: ", value);
      if (value) {
        this.getPosts();
      }
    },
  },

  methods: {
    async getPosts() {
      console.log("get posts called!!!");
      this.error = "";
      this.posts = [];
      this.token = await this.auth.getToken();

      const resp = await fetch(`/api-go`, {
        headers: { Authorization: `Bearer ${this.token}` },
      });

      if (resp.status !== 200) {
        this.error = `failed to fetch api: ${resp.statusText}`;
      } else {
        this.posts = await resp.json();
      }
    },
  },

  mounted() {
    this.auth = this.$refs.authProvider;
  },

  data() {
    return {
      post_logout_redirect_uri: window.location.origin + "/",
      token: "",
      posts: [],
      error: "",
      auth: {
        getIsAuthenticated() {
          return false;
        },
      },
    };
  },
};
</script>
