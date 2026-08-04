import { Navigate } from "react-router-dom";

const DASHBOARD_ROLES = ["ADMIN", "HR"];

export default function ProtectedAdminRoute({ children }) {

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (!token || !user) {
        return <Navigate to="/" replace />;
    }

    if (!DASHBOARD_ROLES.includes(user.role)) {
        return <Navigate to="/employee/attendance" replace />;
    }

    return children;
}