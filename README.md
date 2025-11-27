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
├── bigebucket-api/         # Node.js Backend API
│   ├── app.js              # Express App Configuration
│   ├── package.json        # Backend dependencies
│   ├── .env                # Environment variables
│   ├── server/             # Server Source Code
│   │   ├── index.js        # Main Server Entry Point
│   │   ├── config/         # DB and app config
│   │   ├── routes/         # API routes
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # MongoDB models
│   │   ├── middleware/     # Custom middleware
│   │   └── utils/          # Helper utilities
│   └── node_modules/       # Dependencies
└── (Frontend files served separately or via proxy)
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

## 📦 Deployment to GoDaddy VPS

### Initial Server Setup

1. **Connect to Your VPS:**
   ```bash
   ssh username@your-server-ip
   ```

2. **Install Node.js (if not already installed):**
   ```bash
   # Install Node.js 18.x or 20.x
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Verify installation
   node --version
   npm --version
   ```

3. **Install PM2 (Process Manager):**
   ```bash
   sudo npm install -g pm2
   ```

4. **Upload Your Application:**
   - Upload the `bigebucket-api` folder to your server (e.g., to `/home/parag/public_html/bigebucket-api`)
   - You can use FTP, SCP, or Git to transfer files

### Application Deployment

1. **Navigate to Application Directory:**
   ```bash
   cd /home/parag/public_html/bigebucket-api
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the `bigebucket-api` directory:
   ```env
   PORT=8080
   MONGODB_URI=your_mongodb_connection_string
   FRONTEND_URL=https://bigebucket.com
   SECRET_KEY_ACCESS_TOKEN=your_access_token_secret
   SECRET_KEY_REFRESH_TOKEN=your_refresh_token_secret
   ```

4. **Start Application with PM2:**
   ```bash
   pm2 start server/index.js --name "bigebucket-api"
   ```

5. **Save PM2 Process List:**
   ```bash
   pm2 save
   ```

6. **Setup PM2 to Start on Boot:**
   ```bash
   pm2 startup
   # Follow the instructions shown in the output
   ```

### Server Management Commands

```bash
# Check application status
pm2 list

# View real-time logs
pm2 logs bigebucket-api

# Monitor CPU/Memory usage
pm2 monit

# Restart application
pm2 restart bigebucket-api

# Stop application
pm2 stop bigebucket-api

# Delete from PM2 list
pm2 delete bigebucket-api
```

### Domain & SSL Setup

1. **Point Domain to VPS:**
   - In GoDaddy DNS settings, create an A record pointing `bigebucket.com` to your VPS IP address
   - Wait 24-48 hours for DNS propagation

2. **Install SSL Certificate:**
   ```bash
   # Install Certbot
   sudo apt-get update
   sudo apt-get install certbot python3-certbot-nginx
   
   # Get SSL certificate
   sudo certbot --nginx -d bigebucket.com -d www.bigebucket.com
   ```

3. **Setup Nginx Reverse Proxy (if needed):**
   Create `/etc/nginx/sites-available/bigebucket.com`:
   ```nginx
   server {
       listen 80;
       server_name bigebucket.com www.bigebucket.com;
       
       location / {
           proxy_pass http://localhost:8080;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```
   
   Enable the site:
   ```bash
   sudo ln -s /etc/nginx/sites-available/bigebucket.com /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

## 🔧 Troubleshooting

### MongoDB Connection Issues

If you see "Loading categories..." and no products:

1. **Check MongoDB Atlas IP Whitelist:**
   - Go to MongoDB Atlas → Network Access
   - Add your VPS server IP address
   - Or use `0.0.0.0/0` for development (allows all IPs)

2. **Verify MongoDB URI:**
   - Ensure `MONGODB_URI` is set in `bigebucket-api/.env`
   - Check format: `mongodb+srv://username:password@cluster.mongodb.net/?appName=bigebucket`
   - Special characters in password must be URL-encoded

3. **Test Connection:**
   - Check `/api/health` endpoint: should show `mongoConnected: true`
   - Check server logs: `pm2 logs bigebucket-api`

### Server Performance Issues

**CPU Overload:**
- Check current usage: `htop` or `top`
- View PM2 resource usage: `pm2 monit`
- Upgrade to 2 CPU plan if consistently above 80%
- Check for inefficient database queries in logs

**Memory Issues:**
- Check memory: `free -h`
- Restart application: `pm2 restart bigebucket-api`
- Consider upgrading to High Memory plan if needed

**Application Crashed:**
```bash
# Check PM2 status
pm2 list

# View error logs
pm2 logs bigebucket-api --err

# Restart application
pm2 restart bigebucket-api
```

### Port & Firewall Issues

**Port 2224 (Monitoring):**
```bash
# Check if port is open
sudo ufw status
sudo ufw allow 2224
```

**Application Port (8080):**
```bash
# Check if application is listening
netstat -tuln | grep 8080

# If using Nginx, ensure port 80/443 are open
sudo ufw allow 80
sudo ufw allow 443
```

### Products Not Loading

- Verify MongoDB is connected: `curl http://localhost:8080/api/health`
- Check PM2 logs: `pm2 logs bigebucket-api`
- Verify API endpoints are accessible
- Check browser console for CORS or network errors

### DNS Not Resolving

- Verify A record in GoDaddy DNS points to correct VPS IP
- Check DNS propagation: `nslookup bigebucket.com`
- Wait 24-48 hours for full propagation
- Clear browser cache and DNS cache

## 🔄 Updating Your Application

```bash
# Navigate to app directory
cd /home/parag/public_html/bigebucket-api

# Pull latest changes (if using Git)
git pull origin main

# Install any new dependencies
npm install

# Restart application
pm2 restart bigebucket-api

# Check logs for errors
pm2 logs bigebucket-api
```

## 📊 Monitoring & Maintenance

**Regular Health Checks:**
```bash
# Check application status
pm2 list

# View resource usage
pm2 monit

# Check system resources
htop
free -h
df -h
```

**Log Management:**
```bash
# View recent logs
pm2 logs bigebucket-api --lines 100

# Clear old logs
pm2 flush
```

**Recommended VPS Plan:**
- **Current:** Gen4 VPS Linux 1 CPU (₹2,453/mo)
- **Recommended:** Gen4 VPS Linux 2 CPU (₹3,773/mo) - for better performance under load
- Upgrade if CPU usage consistently exceeds 70-80%


## 📝 License

This project is licensed under the MIT License.
