import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import DashboardLayout from "../layouts/DashboardLayout";
import EmployeeLayout from "../layouts/AbsensiLayout";
import EmployeeAttendance from "../pages/attendance/Attendance";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />

                <Route
                    path="/dashboard"
                    element={
                        <DashboardLayout>
                            <Dashboard />
                        </DashboardLayout>
                    }
                />
                <Route
                    path="/employee/attendance"
                    element={
                        <EmployeeLayout>
                            <EmployeeAttendance />
                        </EmployeeLayout>
                    }
                />

                <Route path="/report" element={<DashboardLayout><h2>Laporan</h2></DashboardLayout>} />

                <Route path="/settings" element={<DashboardLayout><h2>Pengaturan</h2></DashboardLayout>} />


            </Routes>
        </BrowserRouter>
    );
}