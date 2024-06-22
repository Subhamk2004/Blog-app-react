import {Client, Account} from "appwrite";
import {nanoid} from "@reduxjs/toolkit";
import config from "../Config/Config.js";

// const client = new Client()
//     .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
//     .setProject('<PROJECT_ID>');               // Your project ID
//
// const account = new Account(client);
//
// const promise = account.create('[USER_ID]', 'email@example.com', '');
//
// promise.then(function (response) {
//     console.log(response); // Success
// }, function (error) {
//     console.log(error); // Failure
// });

// we could have done the authentication just like appwrite gave us the code
// snippet but for a better code we will not be using that

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.account = new Account(this.client)
    }

    async createAccount({email, password, name}) {
        try {
            let userAccount = await this.account.create(nanoid(), email, password, name);
            if (userAccount) {
                // call another method
                //     this method will automatically log the user in the
                //     service if his account exists
                //     Now this if is empty but will call a method here that
                //     will handle the same
                return this.login({email, password})
            }
            else{
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}){
        try {
            let login_user = await this.account.createEmailSession(email, password);
            return login_user;
        }
        catch (e) {
            throw e;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get()
        }
        catch (e) {
            throw e;
        }
        return null; // in case try catch block also cause errors
    }

    async logoutUser () {
        try {
            await this.account.deleteSessions();
        }
        catch (e) {
            throw e;
        }
    }
}

let authService = new AuthService();

export default authService

//This (authService) is an object

// now whoever will use this class will have to make an object and then use
// the class,
// but it would be better if I make an object and then directly export it.

//Imports:
//
//     Config: Imports a configuration object (likely containing API endpoints
//     and project IDs) from a separate Config.js file for security reasons.
//     Client, Account: Imports functionality for interacting with an Appwrite
//     backend from the appwrite library.
//     nanoid: Imports a function from @reduxjs/toolkit to generate unique IDs
//     (used for user IDs).

//AuthService Class:
//
//     This class encapsulates (the bundling of data with the methods that
//     operate on that data) functionalities for user account management
//     with Appwrite.
//         Constructor:
//             Initializes a Client object for interacting with the Appwrite backend.
//             Sets the endpoint and project ID from the imported config object.
//             Creates an Account object using the initialized Client.
//         Methods:
//             (createAccount): Creates a new user account with the provided email,
//             password, and name. It uses nanoid to generate a unique user ID.
//                 If successful, it attempts to log the user in using the login
//                 method and returns the login response.
//                 If unsuccessful, it returns the error object.
//             login: Attempts to log in a user with the provided email and
//             password using Appwrite's (createEmailSession) method.
//                 If successful, it returns the logged-in user information.
//                 If unsuccessful, it throws an error.
//             (getCurrentUser): Retrieves information about the currently logged-in
//             user from Appwrite.
//                 If successful, it returns the user information.
//                 If unsuccessful (including errors in the try-catch block), it
//                 returns null to indicate the user is not logged in.
//             logoutUser: Deletes all active sessions for the currently logged-in
//             user, effectively logging them out.

// Exporting authService:
//
//     export default authService: This line makes the instantiated authService
//     object available for import in other parts of your React application. This
//     allows you to use the AuthService class's methods for user account management.

// In the above code we have used various services which are not of js or
// react, these services are of appwrite;
//
// The appwrite services used here are:
// Client(), setEndpoint(), setProject(), Account(), account.create(),
// account.createEmailSession(), account.get(), account.deleteSessions
//
// more of the services can be found on the appwrite's documentation, so
// refer appwrite's documentation for more services and to read about the
// current services used in this project

