import axiosInstance from "@helpers/axios";
import handleApiResponse from "@helpers/handleApiResponse";

class PostService {
  async create(post) {
    const response = handleApiResponse(axiosInstance.post("/posts", post));
    return response;
  }

  async update(postId, post) {
    const response = handleApiResponse(
      axiosInstance.put(`/posts/${postId}`, post)
    );
    return response;
  }

  async getAll(allPosts, friendId) {
    // TODO: Make limit dynamic in future for infinite scroll
    const response = handleApiResponse(
      axiosInstance.get(
        `/posts?allPosts=${allPosts}&limit=999999&friendId=${friendId}`
      )
    );
    return response;
  }

  async getPostById(postId) {
    const response = handleApiResponse(axiosInstance.get(`/posts/${postId}`));
    return response;
  }

  async delete(postId) {
    const response = handleApiResponse(
      axiosInstance.delete(`/posts/${postId}`)
    );
    return response;
  }

  async addComment(postId, content) {
    const response = handleApiResponse(
      axiosInstance.post(`/comments/${postId}`, content)
    );
    return response;
  }
}

const postService = new PostService();
export default postService;
