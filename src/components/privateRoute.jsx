import { Navigate } from "react-router-dom";
import { useAuth } from "../firebase/AuthContext";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
