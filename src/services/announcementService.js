import api from "./api";

const announcementService = {

    // Untuk dashboard HR
    getAll: async () => {
        const { data } =
            await api.get("/announcements");

        return data;
    },

    create: async (payload) => {
        const { data } =
            await api.post(
                "/announcements",
                payload
            );

        return data;
    },

    // Untuk slider aplikasi karyawan
    getActive: async () => {
        const { data } =
            await api.get(
                "/announcements/active"
            );

        return data;
    },

};

export default announcementService;