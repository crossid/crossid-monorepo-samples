# sample-monorepo

A mono repo with multiple services and frontends, demonstrating how to perform authentication and authorization on different languages and frameworks with [Crossid](https://crossid.io).

It let you:

- Protect APIs with OAuth2 access token, for [Golang](./api-go).
- Authenticate users at Crossid and consume the protected APIs, for [React](./frontend-react).
- One click/command deployment on DigitalOcean.

# Prerequisite

- Have a Crossid tenant, or [sign up](https://crossid.io/signup) for free.
- [Create a single page application](https://developer.crossid.io/docs/guides/howto/add-spa-app)

# Running locally

- api-go: see [api-go/README.md](./api-go/README.md).
- frontend-react: see [frontend-react/README.md](./frontend-react/README.md)
- frontend-vue: see [frontend-vue/README.md](./frontend-vue/README.md)

## Deploying on Digital Ocean

Note: when creating the single page app, put a temporary URLs in _Redirect URI_ and _Logout URI_ until the app is deployed.

- Install doctl[https://github.com/digitalocean/doctl]
- Form the repo.
- Change env vars in `api.yaml` such: `REACT_APP_CID_TENANT_ID`, `REACT_APP_CID_CLIENT_ID`, `VUE_APP_CID_TENANT_ID`, `VUE_APP_CID_CLIENT_ID` and `ISSUER_BASE_URL`.

Then run:

```bash
doctl apps create --spec .do/app.yaml
```

Once app components deployed, go to

## What is Crossid?

Crossid can:

- Sign users in using various _passwordless_ authentication factors (e.g., _otp_, _fingerprint_, etc...)
- Sign users in via social providers (e,g. _Facebook_) or enterprise providers (e.g., _Azure_)
- Multi factor authentication.
- Issue signed OAuth2 and Openid-Connect access tokens to protect API calls.
- Manage user profiles and access.
- Authenticate machines.
