import api from "./api";

const notificationService = {
  getBadge() {
    return api.get("/notification/badge");
  },
};

export default notificationService;
