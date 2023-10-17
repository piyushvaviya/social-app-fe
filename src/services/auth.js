import axiosInstance from "@helpers/axios";
import handleApiResponse from "@helpers/handleApiResponse";

class AuthService {
  async login(user) {
    const response = handleApiResponse(
      axiosInstance.post("/users/login", user)
    );
    return response;
  }

  async checkAuth() {
    const response = handleApiResponse(axiosInstance.get("/users/checkToken"));
    return response;
  }

  async getFriendById(id) {
    const response = handleApiResponse(axiosInstance.get(`/users/${id}`));
    return response;
  }
}

const authService = new AuthService();
export default authService;
