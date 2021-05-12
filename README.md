# SmileFace

SmileFace is an Instagram-like social network. You have the same basic features, like uploading photos, following people, liking and commenting their posts. But what sets us apart is our privacy in mind approach and ad-free experience. SmileFace is the perfect choice if you want a private and ad-free environment where you can share unforgettable moments with other people.

## 1. How is it built
* [The back-end](./REST_API) portion uses **Express**, **mongoose**, **bcrypt** for password hashing and **jsonwebtoken (JWT)** for encoding user data stored in cookies.
* [The front-end](.) portion uses **React**.

## 2. Functionality
* Unauthorized users are only allowed to login or register.
* Authorized users can upload photos, change their profile picture and info, follow other people, like and comment posts.



# REST-API

## 1. Project set up
* Run **npm install** in REST_API directory
* Create a **_.env_** file which contains the following variables:

| Variable               | Value                    |
| ---------------------- | -------------------------|
| PORT                   | 3333                     |
| PRIVATE_KEY            | SMILE_FACE               |
| COOKIE                 | auth-token               |
| MONGO_USER             | Your username for mongo  |
| MONGO_PASSWORD         | Your password for mongo  |
| MONGO_DEFAULT_DATABASE | name which You prefer    |   

## 2. Start the REST API
* Run **npm run start**



# SmileFace Front-end

## Project set up and running
* Run **`npm install`**
* Run **`npm run start`**

## Routes

| Route             | Description                                            |
| ----------------- | ------------------------------------------------------ |
| /                 | This is the home page which contains your feed         |
| /login            | Login page                                             |
| /register         | Register page                                          |
| /profile/(userId) | User's profile page which contains your posts          |
| /add-post         | Allows you to upload photos                            |
| /explore          | Allows you to explore other users photos               |
| /details/(postId) | This is post details page, here u can edit post        |
| /settings/(userId)| The settings page allows you to edit your profile info |
| /changePassword   | Change Password Page                                   |
| any other route   | Error Page                                             |

### The app runs on **`localhost:3000`**