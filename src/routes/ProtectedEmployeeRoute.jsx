import { Navigate } from "react-router-dom";

const EMPLOYEE_ROLES = [
    "EMPLOYEE",
    "SUPERVISOR",
    "MANAGER"
];

export default function ProtectedEmployeeRoute({ children }) {

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (!token || !user) {
        return <Navigate to="/" replace />;
    }

    const role = user.role?.toUpperCase();

    if (!EMPLOYEE_ROLES.includes(role)) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}