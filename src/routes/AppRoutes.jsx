import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import DashboardLayout from "../layouts/DashboardLayout";
import EmployeeLayout from "../layouts/AbsensiLayout";
import EmployeeAttendance from "../pages/attendance/Attendance";
import ProtectedRoute from "./ProtectedRoute";
import { Navigate } from "react-router-dom";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
               <Route
    path="/"
    element={
        localStorage.getItem("token")
            ? <Navigate to="/employee/attendance" replace />
            : <Login />
    }
/>

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
                    path="/employee/attendance"
                    element={
                        <ProtectedRoute>

                            <EmployeeLayout>
                                <EmployeeAttendance />
                            </EmployeeLayout>
                        </ProtectedRoute>

                    }
                />

                <Route path="/report" element={  <ProtectedRoute><DashboardLayout><h2>Laporan</h2></DashboardLayout>  </ProtectedRoute>} />

            <Route path="/settings" element={ <ProtectedRoute><DashboardLayout><h2>Pengaturan</h2></DashboardLayout></ProtectedRoute>} />


        </Routes>
        </BrowserRouter >
    );
}