import api from "./api";

const dashboardService = {

    getDashboard: async () => {

        const { data } = await api.get("/dashboard/admin");

        return data;

    }

};

export default dashboardService;