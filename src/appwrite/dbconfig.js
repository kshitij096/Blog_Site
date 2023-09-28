import config from "../config/config";

import { Client, ID, Databases, Storage, Query } from "appwrite";

export class dbService {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appwriteURL)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({
    blog_title,
    slug,
    blog_content,
    blog_img,
    status,
    userID,
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
        }
      );
    } catch (error) {
      console.log("Appwrite DB service :: createPost :: error", error);
    }
  }
  async updatePost(slug, { blog_title, blog_content, blog_img, status }) {
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
        }
      );
    } catch (error) {
      console.log("Appwrite DB service :: createPost :: error", error);
    }
  }
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite DB service :: createPost :: error", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite DB service :: createPost :: error", error);
      return false;
    }
  }
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        queries
        // we can provide pagination like --
        //100
        //0
      );
    } catch (error) {
      console.log("Appwrite DB service :: createPost :: error", error);
      return false;
    }
  }

  // File upload service section

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite DB service :: createPost :: error", error);
      return false;
    }
  }

  //File delete service section

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(
        config.appwriteBucketId,

        fileId
      );
      return true;
    } catch (error) {
      console.log("Appwrite DB service :: createPost :: error", error);
      return false;
    }
  }

  // File Preview service section

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(config.appwriteBucketId, fileId);
  }
}

const databaseService = new dbService();
export default databaseService;
