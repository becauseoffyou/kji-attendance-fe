import api from "./api";

const leaderService = {
  getLeaveApprovals() {
    return api.get("/leader/leave");
  },

  reject(id, note) {
    return api.patch(`/leader/leave/${id}/reject`, {
      note,
    });
  },

  getLeaveDetail(id) {
    return api.get(`/leader/leave/${id}`);
  },

  approve(id, note) {
    return api.patch(`/leader/leave/${id}/approve`, {
      note,
    });
  },

  reject(id, note) {
    return api.patch(`/leader/leave/${id}/reject`, {
      note,
    });
  },
};

export default leaderService;
