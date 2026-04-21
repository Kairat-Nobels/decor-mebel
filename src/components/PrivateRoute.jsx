// components/PrivateRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const valid = useSelector(state => state.adminReducer.valid);
  return valid ? children : <Navigate to="/" />;
}

export default PrivateRoute;
