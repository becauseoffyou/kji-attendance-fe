import api from "./api";

const announcementService = {

    async getAll() {

        const { data } = await api.get("/attendance/list");

        return data;

    }

};

export default announcementService;