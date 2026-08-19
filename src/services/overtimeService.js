import api from "./api";

const overtimeService = {

    create(data) {
        return api.post("/overtime", data);
    },

};

export default overtimeService;