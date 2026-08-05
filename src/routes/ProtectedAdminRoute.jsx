import { Navigate } from "react-router-dom";

const DASHBOARD_ROLES = ["ADMIN", "HR"];

export default function ProtectedAdminRoute({ children }) {

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (!token || !user) {
        return <Navigate to="/" replace />;
    }

    const role = user?.role?.toUpperCase();

    if (!DASHBOARD_ROLES.includes(role)) {
        return <Navigate to="/employee/attendance" replace />;
    }

    return children;
}