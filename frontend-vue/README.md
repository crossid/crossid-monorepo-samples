# frontend-vue

Vue frontend with user authentication.

# Prerequisite

- Have a Crossid tenant, or [sign up](https://crossid.io/signup) for free.
- [https://developer.crossid.io/docs/langs/frontend/vue] a Single Page Application (SPA) in Crossid.

# Start locally

to start run:

```bash
VUE_APP_CID_TENANT_ID=<tenant_id> \
VUE_APP_CID_CLIENT_ID=<client_id> \
VUE_APP_CID_SCOPE='openid' \
npm run serve
```

Then navigate to: `http://localhost:3000/vue`

Note: In your SPA app, put the following parameters:

- _Login Redirect URIs_: http://localhost:3000/vue/
- _Logout Redirect URIs_: http://localhost:3000/vue/
- _Allowed Cors Origins_: http://localhost:3000\*

## Learn More

- [Get Started with Crossid](https://developer.crossid.io/docs/guides/get-started)
- To learn Vue, check out the [Vue documentation](https://vuejs.org/).
