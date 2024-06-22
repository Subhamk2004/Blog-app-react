import {Client, Account, Databases, Storage, Query} from "appwrite";
import {nanoid} from "@reduxjs/toolkit";
import config from "../Config/Config.js";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, articleImage, status, userId}) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    articleImage,
                    status,
                    userId
                }
            )
        } catch (e) {
            throw e;
        }
    }

    async updatePost(slug, {title, content, articleImage, status}) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    articleImage,
                    status
                }
            )
        } catch (e) {
            throw e;
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            return true;
        } catch (e) {
            // throw e;
            console.log('Error in deleting post', e)
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
        } catch (e) {
            throw e;
        }
    }

    async getPosts(queries = [Query.equal('status', 'active')]) {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries,
                // [
                //     Query.equal('status', 'active')
                // ]
                //     both of the syntax can be used for queries
            )
        } catch (e) {
            throw e;
        }
    }

    async fileUpload(file) {
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                nanoid(),
                file
            )
        }
        catch (e) {
            throw e;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            )
        }
        catch (e) {
            throw e;
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            config.appwriteBucketId,
            fileId
        )
    }
}

let service = new Service()

export default service;

// storage and buckets are same things, both are synonyms in this project

//https://www.example.com/category/this-is-the-slug
//
//     Domain Name: www.example.com
//     Directory Path: /category/ (optional)
//     Slug: this-is-the-slug

//In getPosts we have used queries to get all the posts whose status is
// active, this is achieved only if we have made indexes in appwrite

//Imports:
//
//     Client, Account, Databases, Storage, Query: Imports functionalities from
//     the appwrite library for interacting with Appwrite's database, storage,
//     and querying capabilities.
//
//     nanoid: Imports a function from @reduxjs/toolkit for generating unique IDs.
//     config: Imports a configuration object (likely containing Appwrite endpoint,
//     project ID, database ID, collection ID, and bucket ID) from a separate Config.js
//     file for security reasons.
//
// Service Class:
//
//     Encapsulates functionalities for interacting with Appwrite's database (posts)
//     and storage (files) relevant to a blog or similar content management system.
//
//         Constructor:
//             Initializes a Client object for interacting with the Appwrite backend.
//             Sets the endpoint and project ID from the imported config object.
//
//             Creates objects for interacting with the database (Databases) and
//             storage (Storage) using the initialized Client.
//
//         Methods:
//
//             Post Management:
//                 createPost: Creates a new post document in the Appwrite database
//                 with provided details (title, slug, content, articleImage URL,
//                 status, and user ID).
//
//                 updatePost: Updates an existing post document based on its slug
//                 and the provided updated details.
//
//                 deletePost: Deletes a post document identified by its slug. Logs
//                 the error to the console but doesn't throw an exception for a
//                 cleaner failure handling approach in React.
//
//                 getPost: Retrieves a post document by its slug.
//                 getPosts: Retrieves a list of post documents, optionally filtered
//                 by queries (e.g., only active posts).
//
//             File Management:
//                 fileUpload: Uploads a file object to the Appwrite storage bucket.
//                 It generates a unique ID using nanoid for the uploaded file.
//                 deleteFile: Deletes a file from the Appwrite storage bucket based
//                 on its ID.
//
//             File Preview (Optional):
//                 getFilePreview: Retrieves a preview of the stored file
//                 (if supported by Appwrite's storage configuration).
//
// Exporting service:
//
//     export default service: Makes the instantiated service object available
//     for import and use in other parts of your React application.