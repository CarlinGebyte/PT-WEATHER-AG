import { Navigate } from "react-router-dom";

const PrivateRoters = ({ isAuth, children }) => {
  return isAuth ? children : <Navigate to="/login" />;
};

export default PrivateRoters;
