import { Navigate } from "react-router-dom";
import { JSX } from "react/jsx-runtime";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const token = localStorage.getItem("token");

    return token ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
