import { Navigate } from "react-router-dom";
import { JSX } from "react/jsx-runtime";
import { useAppSelector } from "../store/hooks";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const token = useAppSelector(state => state.user.token)

    return token ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
