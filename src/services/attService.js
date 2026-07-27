import api from "./api";

const attendanceService = {

    getToday: async () => {
        const { data } = await api.get("/attendance/today");
        return data;
    },

    checkIn: async (formData) => {

        const { data } = await api.post(
            "/attendance/checkin",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );

        return data;
    },

    checkOut: async () => {

        const { data } =
            await api.post("/attendance/checkout");

        return data;

    }

};

export default attendanceService;