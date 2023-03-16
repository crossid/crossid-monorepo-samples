# frontend-react

React frontend with user authentication.

# Start locally

to start run:

```bash
REACT_APP_CID_TENANT_ID=<tenant_id> \
REACT_APP_CID_REGION=<region> \
REACT_APP_CID_CLIENT_ID=<client_id> \
REACT_APP_CID_SCOPE='openid' \
npm start
```

Then navigate to: `http://localhost:3000/react`

Note: In your SPA app, put the following parameters:

- _Login Redirect URIs_: http://localhost:3000/react/
- _Logout Redirect URIs_: http://localhost:3000/react/
- _Allowed Cors Origins_: http://localhost:3000\*

## Learn More

- [Get Started with Crossid](https://developer.crossid.io/docs/guides/get-started)
- [Crossid for React](https://developer.crossid.io/docs/langs/frontend/react)
- [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
- To learn React, check out the [React documentation](https://reactjs.org/).
