import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

// Auth
import Login from "../pages/auth/Login";

// Admin
import Dashboard from "../pages/dashboard/Dashboard";
import Report from "../pages/report/Report";
import Settings from "../pages/settings/Settings";
import DashboardLayout from "../layouts/DashboardLayout";

// Employee
import EmployeeLayout from "../layouts/AbsensiLayout";
import EmployeeAttendance from "../pages/attendance/Attendance";
import EmployeeHistory from "../pages/history/History";
import EmployeeProfile from "../pages/profile/Profile";

export default function AppRoutes() {
    const isLogin = !!localStorage.getItem("token");

    return (
        <BrowserRouter>
            <Routes>

                {/* LOGIN */}
                <Route
                    path="/"
                    element={
                        isLogin
                            ? <Navigate to="/employee/attendance" replace />
                            : <Login />
                    }
                />

                {/* ===================== ADMIN ===================== */}

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <DashboardLayout>
                                <Dashboard />
                            </DashboardLayout>
                        </ProtectedRoute>
                    }
                />

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
                />

                {/* ===================== EMPLOYEE ===================== */}

                <Route
                    path="/employee"
                    element={
                        <ProtectedRoute>
                            <EmployeeLayout />
                        </ProtectedRoute>
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