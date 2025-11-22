# Bigebucket - Modern E-commerce Application

A full-stack e-commerce application built with the MERN stack (MongoDB, Express, React, Node.js).

## 🚀 Features

- **Modern UI/UX:** Responsive design with glassmorphism, smooth animations, and a premium feel.
- **Product Management:** Admin panel for managing products, categories, and subcategories.
- **Shopping Cart:** Real-time cart updates with Redux Toolkit.
- **User Authentication:** Secure login/signup with JWT.
- **Search & Filtering:** Advanced search and category-based filtering.

## 📂 Project Structure

```
public_html/
├── app.js                  # cPanel Entry Point
├── package.json            # Root dependencies & scripts
├── server/                 # Node.js Backend Source
│   ├── index.js            # Main Server Logic
│   ├── config/             # DB and app config
│   ├── routes/             # API routes
│   └── ...
├── public/                 # Built React Frontend (Static Assets)
│   ├── index.html
│   ├── assets/
│   └── ...
└── ...
```

## ⚡ Getting Started (Local Development)

### Prerequisites

- Node.js (v18+)
- MongoDB Atlas Account (or local MongoDB)

### Installation & Run

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Environment Setup:**
    Create a `.env` file in the `server` directory (or root, depending on where you run):
    ```env
    PORT=8080
    MONGODB_URI=your_mongodb_connection_string
    FRONTEND_URL=http://localhost:8080
    SECRET_KEY_ACCESS_TOKEN=your_access_token_secret
    SECRET_KEY_REFRESH_TOKEN=your_refresh_token_secret
    ```

3.  **Run the Application:**
    ```bash
    npm start
    ```
    The server will start on port 8080 and serve the frontend from the `public` folder.

4.  **Access the App:**
    Open [http://localhost:8080](http://localhost:8080) in your browser.

    > **Note:** API endpoints are available at `http://localhost:8080/api/...`.

## 📦 Deployment to BigRock cPanel

1.  **Prepare Files:**
    - Ensure `app.js`, `package.json`, `server/`, and `public/` are in your `public_html` folder.
    - (Or upload the provided `deployment_final.zip` and extract it).

2.  **Setup Node.js App:**
    - **Node.js Version:** 18.x or 20.x
    - **Application Mode:** Production
    - **Application Root:** `public_html`
    - **Application Startup File:** `app.js` (Important!)
    - **Application URL:** `bigebucket.com`

3.  **Install Dependencies:**
    - Click "Run NPM Install" in the cPanel Node.js interface.

4.  **Environment Variables:**
    - Add all keys from your `.env` file in the "Environment Variables" section of the Node.js app settings.

5.  **Permissions (Critical):**
    - Ensure the `public/assets` folder has permissions set to **755** (rwxr-xr-x).
    - If you see 404 errors for assets, check these permissions in File Manager.

6.  **Restart:**
    - Click "Restart Application".

## 📝 License

This project is licensed under the MIT License.
