# sample-monorepo

A mono repo with multiple services and frontends, demonstrating how to perform authentication and authorization on different languages and frameworks with [Crossid](https://crossid.io).

It let you:

- Protect APIs with OAuth2 access token, for [Golang](./api-go).
- Authenticate users at Crossid and consume the protected APIs, for [React](./frontend-react).
- One click/command deployment on DigitalOcean.

# Prerequisite

- Have a Crossid tenant, or [sign up](https://crossid.io/signup) for free.

# Running locally

- api-go: see [api-go/README.md](./api-go/README.md).
- frontend-react: see [frontend-react/README.md](./frontend-react/README.md)

## Deploying on Digital Ocean

Click this button to deploy the app to the DigitalOcean App Platform.

[![Deploy to DigitalOcean](https://www.deploytodo.com/do-btn-blue.svg)](https://cloud.digitalocean.com/apps/new?repo=https://github.com/crossid/sample-monorepo/tree/main)

or if you have `doctl` installed then run:

`doctl apps create --spec .do/app.yaml`

Note: Using the button disables the ability to automatically re-deploy when pushing to a branch or tag as you are using this repo directly, for more info see [Deploying the App](https://github.com/digitalocean/sample-nodejs#deploying-the-app)

## What is Crossid?

Crossid can:

- Sign users in using various _passwordless_ authentication factors (e.g., _otp_, _fingerprint_, etc...)
- Sign users in via social providers (e,g. _Facebook_) or enterprise providers (e.g., _Azure_)
- Multi factor authentication.
- Issue signed OAuth2 and Openid-Connect access tokens to protect API calls.
- Manage user profiles and access.
- Authenticate machines.
