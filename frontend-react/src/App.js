import { useEffect, useState } from "react";
import { Router, Switch, Route, Link } from "react-router-dom";
import { createBrowserHistory } from "history";
import Layout from "./Layout";
import { AuthProvider, useAuth } from "@crossid/crossid-react";
import ProtectedRoute from "./ProtectedRoute";

const basename = "/react";

function App() {
  const history = createBrowserHistory({ basename });

  return (
    <AuthProvider
      tenant_id={process.env.REACT_APP_CID_TENANT_ID || ""}
      client_id={process.env.REACT_APP_CID_CLIENT_ID || ""}
      redirect_uri={`${window.location.origin}${basename}/`}
      post_logout_redirect_uri={`${window.location.origin}${basename}/`}
      audience={[process.env.REACT_APP_CID_AUDIENCE || ""]}
      onRedirectTo={(state) => history.push(state.return_to)}
      scope={process.env.REACT_APP_CID_SCOPE || ""}
      cache_type="session_storage"
    >
      <Router history={history}>
        <Layout>
          <div>
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/posts" exact>
                <ProtectedRoute path="/posts">{() => <Posts />}</ProtectedRoute>
              </Route>
            </Switch>
          </div>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

function Home() {
  const { idToken } = useAuth();

  if (idToken) {
    return (
      <div>
        <h2 className="text-2xl font-bold pb-8">Hello {idToken.name}</h2>
        <span>
          Try to consume protected{" "}
          <Link to="/posts" className="text-indigo-700">
            posts.
          </Link>
        </span>
      </div>
    );
  }

  return (
    <h3>
      Hello visitor, please <i>sign in</i> or visit <i>posts page</i> to see
      more.
    </h3>
  );
}

function Posts() {
  const [posts, setPosts] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const { getAccessToken } = useAuth();

  useEffect(() => {
    let mounted = true;
    async function fetchData() {
      const tok = await getAccessToken();
      const resp = await fetch(`/api-go`, {
        headers: { Authorization: `Bearer ${tok}` },
      });
      if (resp.status !== 200) {
        setError(`failed to fetch api: ${resp.statusText}`);
        return () => {
          mounted = false;
        };
      }

      const json = await resp.json();

      if (mounted) {
        setPosts(json);
        setLoading(false);
      }
    }

    fetchData();

    return () => {
      mounted = false;
    };
  });

  if (error) {
    return <span className="bg-red-100">{error}</span>;
  }

  if (loading) {
    return <span className="bg-indigo-100">Loading...</span>;
  }

  return (
    <>
      <h1 className="text-3xl font-semibold pb-12">Posts</h1>
      <div className="sm:w-full lg:w-1/2">
        <ul className="divide-y-2 divide-gray-100">
          {posts.map((r) => (
            <li
              key={r.id}
              className="flex justify-between p-3 hover:bg-gray-50"
            >
              <h3 className="text-sm font-medium">{r.name}</h3>
              <p className="text-sm text-gray-500">{r.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
