import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import Unprotected from "./components/Unprotected.vue";
import Posts from "./components/Posts.vue";
import { create } from "@crossid/vue-wrapper";

const basename = "/vue";

async function init() {
  const [AuthProvider, AuthCallback] = await create({
    tenant_id: process.env.VUE_APP_CID_TENANT_ID || "",
    client_id: process.env.VUE_APP_CID_CLIENT_ID || "",
    audience: [process.env.VUE_APP_CID_AUDIENCE || ""],
    redirect_uri: `${window.location.origin}${basename}/callback`,
    scope: process.env.REACT_APP_CID_SCOPE || "openid profile email",
    cache_type: "session_storage",
  });

  const routes = [
    {
      path: "/vue/",
      name: "Unprotected",
      component: Unprotected,
    },
    {
      path: "/vue/posts",
      name: "Posts",
      component: Posts,
    },
    {
      path: "/vue/callback",
      name: "AuthCallback",
      component: AuthCallback,
    },
  ];
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  createApp(App)
    .use(router)
    .component("AuthProvider", AuthProvider)
    .component("AuthCallback", AuthCallback)
    .mount("#app");
}

init();
