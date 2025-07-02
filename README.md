# Angular App Setup Guide

This guide provides step-by-step instructions to set up and run the Angular application locally.

## 🛠️ Setup Instructions

### 1. Install Dependencies

Ensure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.

Then run the following command in the project root folder:

```bash
npm install
```

### 2. Configure Environment Variables

Open the file src/environments/environment.development.ts and fill in the following values:

```ts
export const environment = {
  production: false,
  BACKEND_URL: "http://localhost:8080",

  CLOUDINARY_CLOUD_NAME: "",
  UPLOAD_PRESET_NAME: "",
  CLOUDINARY_API_KEY: "",
  CLOUDINARY_API_SECRET: "",
};
```

⚠️ **Note**:

- Go to [Cloudinary](https://cloudinary.com/) to create an account and get your API keys.
- Go to [Let's learn backend](https://github.com/ptdat4823/spring-lets-learn-be) to set up the backend server for this application. (This backend server runs on port 8080 by default.)

### 3. Run the Application

Start the development server by running:

```bash
npm run dev
```

Once the server is running, open your browser and go to: **http://localhost:4200**
