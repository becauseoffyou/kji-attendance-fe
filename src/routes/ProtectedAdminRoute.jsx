import { Navigate } from "react-router-dom";

export default function ProtectedAdminRoute({ children }) {

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || !user) {
        return <Navigate to="/" replace />;
    }

    if (user.role !== 1) {
        return <Navigate to="/employee/attendance" replace />;
    }

    return children;
}