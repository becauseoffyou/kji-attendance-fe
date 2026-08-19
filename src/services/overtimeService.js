import api from "./api";

const overtimeService = {
    create(data) {
        return api.post("/overtime", data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    },
};

export default overtimeService;