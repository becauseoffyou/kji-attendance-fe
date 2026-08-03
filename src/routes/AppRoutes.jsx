import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProtectedAdminRoute from "./ProtectedAdminRoute";
import ProtectedEmployeeRoute from "./ProtectedEmployeeRoute";

// Auth
import Login from "../pages/auth/Login";

// Admin
import Dashboard from "../pages/dashboard/Dashboard";
// import Report from "../pages/report/Report";
// import Settings from "../pages/settings/Settings";
import DashboardLayout from "../layouts/DashboardLayout";

// Employee
import EmployeeLayout from "../layouts/AbsensiLayout";
import EmployeeAttendance from "../pages/attendance/Attendance";
import EmployeeHistory from "../pages/employee/History";
import EmployeeProfile from "../pages/employee/Profile";
import Leave from "../pages/employee/Leave";

export default function AppRoutes() {
    const isLogin = !!localStorage.getItem("token");
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");
    return (
        <BrowserRouter>
            <Routes>

                {/* LOGIN */}
                <Route
                    path="/"
                    element={
                        !token
                            ? (
                                <Login />
                            )
                            : user?.role === 1
                                ? (
                                    <Navigate
                                        to="/dashboard"
                                        replace
                                    />
                                )
                                : (
                                    <Navigate
                                        to="/employee/attendance"
                                        replace
                                    />
                                )
                    }
                />

                {/* ===================== ADMIN ===================== */}

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedAdminRoute>
                            <DashboardLayout>
                                <Dashboard />
                            </DashboardLayout>
                        </ProtectedAdminRoute>
                    }
                />
                {/* 
                <Route
                    path="/report"
                    element={
                        <ProtectedRoute>
                            <DashboardLayout>
                                <Report />
                            </DashboardLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/settings"
                    element={
                        <ProtectedRoute>
                            <DashboardLayout>
                                <Settings />
                            </DashboardLayout>
                        </ProtectedRoute>
                    }
                /> */}

                {/* ===================== EMPLOYEE ===================== */}

                <Route
                    path="/employee"
                    element={
                        <ProtectedEmployeeRoute>
                            <EmployeeLayout />
                        </ProtectedEmployeeRoute>
                    }
                >
                    <Route
                        path="attendance"
                        element={<EmployeeAttendance />}
                    />

                    <Route
                        path="history"
                        element={<EmployeeHistory />}
                    />

                    <Route
                        path="leave"
                        element={<Leave />}
                    />

                    <Route
                        path="profile"
                        element={<EmployeeProfile />}
                    />
                </Route>

                {/* 404 */}
                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />

            </Routes>
        </BrowserRouter>
    );
}