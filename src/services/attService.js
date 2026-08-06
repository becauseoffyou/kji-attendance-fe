import api from "./api";

const attendanceService = {
  getToday: async () => {
    const { data } = await api.get("/attendance/today");
    return data;
  },

  checkIn: async (formData) => {
    const { data } = await api.post("/attendance/checkin", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  },

  checkOut: async (formData) => {
    const { data } = await api.post("/attendance/checkout", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  },

  getHistory: async () => {
    const { data } = await api.get("/attendance/history");

    return data;
  },

  getSummary: async () => {
    const response = await api.get("/attendance/summary");

    return response.data;
  },
  getEmployeeAttendance: async (id) => {
    const { data } = await api.get(`/attendance/employee/${id}`);

    return data;
  },
  getDailyAttendance: async (params) => {
    console.log("GET DAILY PARAMS:", params);

    const { data } = await api.get("/attendance/daily", {
      params,
    });

    console.log("GET DAILY RESPONSE:", data);

    return data;
  },
  getDepartments: async () => {
    const { data } = await api.get("/attendance/departments");

    return data;
  },
};

export default attendanceService;
