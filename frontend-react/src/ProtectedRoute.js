import { withAuth } from "@crossid/crossid-react";
import { basename } from "./App";

/**
 * Wrapping your component with this high order component will redirect anonymous visitors to the login page.
 * Your component will be rendered if user is already authenticated.
 */
const ProtectedRoute = ({ children, path }) => {
  // e.g., /react/users -> /users, /react -> /
  const pathname =
    window.location.pathname.replace(new RegExp(`^(${basename})`), "") || "/";
  const return_to = path || `${pathname}${window.location.search}`;

  const Comp = withAuth(children, { return_to });
  return <Comp />;
};

export default ProtectedRoute;
