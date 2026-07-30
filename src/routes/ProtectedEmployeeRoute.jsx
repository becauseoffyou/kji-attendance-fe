import { Navigate } from "react-router-dom";

export default function ProtectedEmployeeRoute({ children }) {

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || !user) {
        return <Navigate to="/" replace />;
    }

    if (user.role !== 3) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}