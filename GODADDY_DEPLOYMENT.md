# 🚀 Node.js Deployment on GoDaddy VPS (cPanel)

**Exact step-by-step guide based on actual deployment workflow**

---

## 🎯 Prerequisites

- GoDaddy VPS with cPanel access
- cPanel login credentials
- Project files on your local machine
- MongoDB Atlas account with connection string

---

## PART 1: BUILD LOCALLY

### Step 1: Build Backend (API)

**📍 Run on: Your Local Machine (PowerShell/Terminal)**

```bash
# Navigate to your project root directory
cd C:\Users\kuber\Downloads\public_html\public_html

# Create deployment zip (if you have a build script)
# OR manually zip the 'server' folder
```

**What happens:** Prepares your backend code for upload

**What to include in zip:**
- `server/` folder with all code
- `package.json`
- **DO NOT include:** `node_modules`, `.git`, `.env`

---

### Step 2: Build Frontend (Client)

**📍 Run on: Your Local Machine**

```bash
# Navigate to client folder
cd client

# Build the React app
npm run build
```

**What happens:** 
- Creates optimized production build
- Generates `dist/` folder with all frontend files
- Takes 1-2 minutes

**Expected output:**
```
✓ built in 45s
dist/index.html
dist/assets/...
```

---

## PART 2: UPLOAD TO CPANEL

### Step 3: Upload Backend Files

**📍 Do in: cPanel File Manager (Browser)**

1. **Login to cPanel** (https://your-server-ip:2083)
2. **Open File Manager**
3. **Navigate to** `public_html/`
4. **Create folder** named `api` (or `bigebucket-api`)
5. **Click Upload**
6. **Upload your backend zip file**
7. **Right-click the zip** → **Extract**
8. **Delete the zip file** after extraction

**What happens:** Your backend code is now on the server in `public_html/api/`

---

### Step 4: Upload Frontend Files

**📍 Do in: cPanel File Manager (Browser)**

1. **Still in File Manager**
2. **Navigate to** `public_html/`
3. **Select all files** from your local `client/dist/` folder
4. **Upload them** directly to `public_html/`
   - `index.html`
   - `assets/` folder
   - All other files from `dist/`

**What happens:** Your frontend is now accessible at your domain root

---

### Step 5: Upload .env File

**📍 Do in: cPanel File Manager (Browser)**

1. **Create `.env` file** on your local machine with:

```env
PORT=8080
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
FRONTEND_URL=https://yourdomain.com
SECRET_KEY_ACCESS_TOKEN=your_secret_here
SECRET_KEY_REFRESH_TOKEN=your_secret_here
```

2. **In File Manager**, navigate to `public_html/api/server/`
3. **Click Upload**
4. **Upload your `.env` file**

**What happens:** Environment variables are configured on the server

---

## PART 3: SETUP IN CPANEL TERMINAL

### Step 6: Open cPanel Terminal

**📍 Do in: cPanel (Browser)**

1. **In cPanel**, scroll down to **Advanced** section
2. **Click "Terminal"**
3. **A terminal window opens** - this is where you'll run ALL server commands

**⚠️ IMPORTANT:** All the following commands run in **cPanel Terminal**, NOT on your local machine!

---

### Step 7: Install NVM & Node.js v20

**📍 Run in: cPanel Terminal**

```bash
# Download and install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

**What happens:** NVM installer downloads and sets up Node Version Manager

```bash
# Activate NVM in current session
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

```bash
# Install Node.js version 20
nvm install 20

# Set as default
nvm use 20
nvm alias default 20
```

**What happens:** Node.js v20 is installed on the server

```bash
# Verify
node --version
npm --version
```

**Expected output:**
```
v20.11.0
10.2.4
```

---

### Step 8: Navigate to API Folder & Install Dependencies

**📍 Run in: cPanel Terminal**

```bash
# Go to your API folder
cd public_html/api/server
```

**Or if your structure is different:**
```bash
cd public_html/bigebucket-api/server
```

**What happens:** You're now in the folder with `package.json`

```bash
# Install all dependencies
npm install
```

**What happens:** 
- Downloads all packages from npm
- Creates `node_modules` folder
- Takes 2-5 minutes

**Expected output:**
```
added 245 packages in 2m
```

---

### Step 9: Install PM2

**📍 Run in: cPanel Terminal**

```bash
# Install PM2 globally
npm install -g pm2
```

**What happens:** PM2 is installed to manage your app

```bash
# Verify
pm2 --version
```

**Expected output:** `5.3.0`

---

### Step 10: Start Your Application

**📍 Run in: cPanel Terminal**

```bash
# Make sure you're in the right directory
cd ~/public_html/api/server

# Start with PM2
pm2 start index.js --name "bigebucket-api"
```

**What happens:** Your Node.js app starts running

```bash
# Check status
pm2 list
```

**Expected output:**
```
┌─────┬──────────────────┬─────────┬──────────┐
│ id  │ name             │ status  │ uptime   │
├─────┼──────────────────┼─────────┼──────────┤
│ 0   │ bigebucket-api   │ online  │ 5s       │
└─────┴──────────────────┴─────────┴──────────┘
```

**✅ Status should be "online"**

---

### Step 11: Configure Auto-Restart

**📍 Run in: cPanel Terminal**

```bash
# Save PM2 list
pm2 save
```

```bash
# Setup startup
pm2 startup
```

**Copy and run the command it shows, then:**

```bash
pm2 save
```

**What happens:** App will auto-start on server reboot

---

### Step 12: Fix MongoDB Connection (If Needed)

**📍 Do in: Your Browser (MongoDB Atlas)**

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Click **Network Access**
3. Click **Add IP Address**
4. Click **Allow Access from Anywhere** (0.0.0.0/0)
5. Wait 1-2 minutes

**Then in cPanel Terminal:**
```bash
pm2 restart bigebucket-api
```

---

## ✅ VERIFY DEPLOYMENT

**📍 Run in: cPanel Terminal**

```bash
# Check status
pm2 list
```

**Should show:** `status: online`

```bash
# View logs
pm2 logs bigebucket-api
```

**Should show:**
```
✅ MongoDB connected successfully!
🚀 Server is running on port 8080
```

**Test in browser:**
- Frontend: `https://yourdomain.com`
- API: `https://yourdomain.com/api/health`

---

## 🔄 UPDATING YOUR APP (FUTURE DEPLOYMENTS)

### Update Backend:

**📍 Local Machine:**
1. Make code changes
2. Zip the `server/` folder

**📍 cPanel File Manager:**
1. Delete old files in `public_html/api/`
2. Upload new zip
3. Extract

**📍 cPanel Terminal:**
```bash
cd ~/public_html/api/server
npm install
pm2 restart bigebucket-api
```

### Update Frontend:

**📍 Local Machine:**
```bash
cd client
npm run build
```

**📍 cPanel File Manager:**
1. Delete old files in `public_html/` (except `api/` folder)
2. Upload new files from `client/dist/`

---

## 🔧 ESSENTIAL PM2 COMMANDS

**📍 Run in: cPanel Terminal**

```bash
# View all apps
pm2 list

# View logs
pm2 logs bigebucket-api

# View errors only
pm2 logs bigebucket-api --err

# Monitor CPU/Memory
pm2 monit

# Restart app
pm2 restart bigebucket-api

# Stop app
pm2 stop bigebucket-api

# Delete app
pm2 delete bigebucket-api
```

---

## 🚨 TROUBLESHOOTING

### App shows "errored" status

**📍 cPanel Terminal:**
```bash
pm2 logs bigebucket-api --err
```

**Common issues:**
- Missing dependencies → Run `npm install` again
- MongoDB connection failed → Check IP whitelist
- Wrong PORT in `.env`

### Frontend not loading

- Check if files are in `public_html/` (not in subfolder)
- Check `.htaccess` file exists
- Clear browser cache

### API not responding

**📍 cPanel Terminal:**
```bash
pm2 list  # Check if online
pm2 logs bigebucket-api  # Check errors
```

---

## 📋 COMPLETE DEPLOYMENT CHECKLIST

### Local Machine:
- [ ] `cd` to project root
- [ ] Zip backend `server/` folder (exclude node_modules, .env)
- [ ] `cd client` → `npm run build`
- [ ] Create `.env` file with your config

### cPanel File Manager:
- [ ] Login to cPanel
- [ ] Open File Manager
- [ ] Create `public_html/api/` folder
- [ ] Upload backend zip to `api/`
- [ ] Extract zip, delete zip file
- [ ] Upload `client/dist/` contents to `public_html/`
- [ ] Upload `.env` to `public_html/api/server/`

### cPanel Terminal:
- [ ] Open Terminal in cPanel
- [ ] Install NVM: `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash`
- [ ] Load NVM: `export NVM_DIR="$HOME/.nvm"` + source
- [ ] Install Node: `nvm install 20` → `nvm use 20` → `nvm alias default 20`
- [ ] `cd ~/public_html/api/server`
- [ ] `npm install`
- [ ] `npm install -g pm2`
- [ ] `pm2 start index.js --name "bigebucket-api"`
- [ ] `pm2 list` (check status is "online")
- [ ] `pm2 save` → `pm2 startup` → run command → `pm2 save`

### MongoDB Atlas:
- [ ] Whitelist IP (0.0.0.0/0)
- [ ] Verify connection in logs

---

## 💡 IMPORTANT NOTES

- **cPanel Terminal** - ALL server commands run here, NOT on your local machine
- **File Manager** - Use this to upload files, NOT FTP/FileZilla
- **Build Locally** - Always run `npm run build` on your machine first
- **No node_modules** - Don't upload node_modules, run `npm install` on server
- **.env Security** - Upload directly, never commit to Git
- **Recommended VPS** - 2 CPU + High Memory (₹4,598/mo)

---

**🎉 Deployment Complete!**

Your app is now live with backend at `/api` and frontend at root!
