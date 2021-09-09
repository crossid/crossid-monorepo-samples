import { useAuth } from "@crossid/crossid-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Layout({ children }) {
  const { idToken, loading, error, loginWithRedirect, logoutWithRedirect } =
    useAuth();
  const [open, setOpen] = useState(false);

  if (error) {
    return (
      <p className="bg-red-50">
        <span>auth error: {error.error}</span>
        {error.error_description && <span> : {error.error_description}</span>}
      </p>
    );
  }

  if (loading) {
    return <span className="bg-indigo-50">loading...</span>;
  }

  const signin = () => {
    loginWithRedirect({ state: { return_to: "/" } });
  };

  const signout = () => {
    logoutWithRedirect({ state: { return_to: "/" } });
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <a href="https://crossid.io" target="_blank" rel="noreferrer">
                  <img
                    className="block lg:hidden h-8 w-auto"
                    src="https://crossid.io/android-chrome-192x192.png"
                    alt="Brand"
                  />
                  <img
                    className="hidden lg:block h-8 w-auto"
                    src="https://crossid.io/logo.png"
                    alt="Brand"
                  />
                </a>
              </div>
              <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                <NavLink
                  to="/"
                  className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  exact
                  activeClassName="border-indigo-500"
                  aria-current="page"
                >
                  Home
                </NavLink>
                <NavLink
                  to="/posts"
                  activeClassName="border-indigo-500"
                  className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Posts
                </NavLink>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
              {!idToken && (
                <button
                  type="button"
                  className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => {
                    loginWithRedirect({ state: { return_to: "/" } });
                  }}
                >
                  Sign In
                </button>
              )}
              {idToken && (
                <button
                  type="button"
                  className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => {
                    logoutWithRedirect({ state: { return_to: "/" } });
                  }}
                >
                  Sign Out
                </button>
              )}
            </div>
            <div className="-mr-2 flex items-center sm:hidden">
              <button
                onClick={() => setOpen(!open)}
                className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        {/* mobile menu */}
        {open && (
          <div className="sm:hidden" id="mobile-menu">
            <div className="pt-2 pb-3 space-y-1">
              <NavLink
                to="/"
                onClick={() => setOpen(false)}
                exact
                className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                activeClassName="bg-indigo-50 border-indigo-500 text-indigo-700"
                aria-current="page"
              >
                Home
              </NavLink>
              <NavLink
                to="/posts"
                onClick={() => setOpen(false)}
                className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                activeClassName="bg-indigo-50 border-indigo-500 text-indigo-700"
              >
                Posts
              </NavLink>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              {idToken && (
                <div className="flex items-center px-4">
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">
                      {idToken.name}
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      {idToken.email}
                    </div>
                  </div>
                </div>
              )}
              <div className="mt-3 space-y-1">
                {!idToken && (
                  <button
                    onClick={signin}
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  >
                    Sign in
                  </button>
                )}
                {idToken && (
                  <button
                    onClick={signout}
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
      <div className="py-10">
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">{children}</div>
        </main>
        {!idToken && (
          <footer>
            <div className="max-w-7xl mx-auto py-48 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
              <div className="mt-8 md:mt-0 md:order-1">
                <p className="text-center text-base text-gray-400">
                  Don't have a Crossid tenant?
                  <a
                    href="https://crossid.io/signup"
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-700"
                  >
                    {" "}
                    register
                  </a>
                  <span> for free.</span>
                </p>
              </div>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}
