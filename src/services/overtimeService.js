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

};

export default overtimeService;