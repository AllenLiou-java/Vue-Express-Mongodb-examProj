import axios from "axios";

// const url = "http://localhost:5000/api/posts/";
const url = "api/posts/";

// 使用物件導向的概念建立一個class類別 - PostService，並針對此class來新增CRUD方法(getPost、insertPost、deletePost)
// ，此時即可透過PostService.getPost來呼叫使用此方法以操作CRUD
class PostService {
  // Get Posts
  static async getPosts() {
    try {
      const res = await axios.get(url);
      const data = res.data;
      // 注意：當針對物件進行解構，而該句式沒有進行宣告時，指派式外必須加上括號 ( ... ) 。
      return data.map((post) => ({
        ...post,
        createdAt: new Date(post.createdAt),
      }));
    } catch (err) {
      return err;
    }
  }

  // Add Post
  static insertPost(text) {
    return axios.post(url, {
      text: text,
    });
  }

  //Delete Post
  static deletePost(id) {
    return axios.delete(`${url}${id}`);
  }
}

export default PostService;
