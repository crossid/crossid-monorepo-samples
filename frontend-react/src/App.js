import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Layout from "./Layout";
import { AuthProvider, useAuth } from "@crossid/crossid-react";
import ProtectedRoute from "./ProtectedRoute";

export const basename = "/react";

function App() {
  const tenant_id = process.env.REACT_APP_CID_TENANT_ID || "";
  const region = process.env.REACT_APP_CID_REGION || "";
  const redirect_uri = `${window.location.origin}${basename}/`;
  return (
    <AuthProvider
      domain={`${tenant_id}.${region}.crossid.io`}
      client_id={process.env.REACT_APP_CID_CLIENT_ID || ""}
      redirect_uri={redirect_uri}
      post_logout_redirect_uri={`${window.location.origin}${basename}/`}
      audience={[process.env.REACT_APP_CID_AUDIENCE || ""]}
      onRedirectTo={(state) => {
        window.location.replace(state.return_to);
      }}
      scope={process.env.REACT_APP_CID_SCOPE || "openid email"}
      cache_type="session_storage"
    >
      <Router basename={basename}>
        <Layout>
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/posts"
                element={
                  <ProtectedRoute path="/posts">
                    {() => <Posts />}
                  </ProtectedRoute>
                }
              ></Route>
            </Routes>
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
