import {
  Client,
  Databases,
  Storage,
  ID,
  Query,
  Permission,
  Role,
} from "appwrite";
import config from "../config/config";

class DatabaseService {
  client;
  databases;
  bucket;

  constructor() {
    this.client = new Client()
      .setEndpoint(config.appwriteURL)
      .setProject(config.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  // CREATE POST
  async createPost({
    blog_title,
    slug,
    blog_content,
    blog_img,
    status,
    userID,
    author_name,
  }) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          blog_title,
          blog_content,
          blog_img,
          status,
          userID,
          author_name,
        },
        [
          Permission.read(Role.any()), // public read
          Permission.update(Role.user(userID)), // only owner can update
          Permission.delete(Role.user(userID)), // only owner can delete
        ]
      );
    } catch (error) {
      console.error("createPost error:", error);
      return null;
    }
  }

  // UPDATE POST
  async updatePost(
    slug,
    { blog_title, blog_content, blog_img, status, author_name }
  ) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          blog_title,
          blog_content,
          blog_img,
          status,
          author_name,
        }
      );
    } catch (error) {
      console.error("updatePost error:", error);
      return null;
    }
  }

  // DELETE POST
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.error("deletePost error:", error);
      return false;
    }
  }

  // GET SINGLE POST
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.error("getPost error:", error);
      return null;
    }
  }

  // GET POSTS WITH PAGINATION
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.error("getPosts error:", error);
      return null;
    }
  }

  // UPLOAD FILE
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file,
        [Permission.read(Role.any())] // public file access
      );
    } catch (error) {
      console.error("uploadFile error:", error);
      return null;
    }
  }

  // DELETE FILE
  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(config.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.error("deleteFile error:", error);
      return false;
    }
  }

  // GET FILE PREVIEW LINK (.href is essential to avoid CORB)
  getFilePreview(fileId) {
    return this.bucket.getFileDownload(config.appwriteBucketId, fileId);
  }

  // Export query helpers
  get Query() {
    return Query;
  }
}

const databaseService = new DatabaseService();
export default databaseService;
