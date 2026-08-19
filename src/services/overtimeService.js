import api from "./api";

const overtimeService = {

    create(data) {
        return api.post("/overtime", data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    },

    history() {
        return api.get("/overtime/history");
    },

    managerHistory() {
        return api.get("/overtime/manager");
    },

    managerDetail(id) {
        return api.get(`/overtime/manager/${id}`);
    },
    approveByManager(id, note = "") {
        return api.put(`/overtime/${id}/approve`, {
            note
        });
    },

};

export default overtimeService;