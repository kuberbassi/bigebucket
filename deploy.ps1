# ============================================
# DEPLOYMENT SCRIPT FOR CPANEL
# ============================================
# This script copies the built frontend files from client/dist to the root directory
# Run this after building the frontend with: npm run build

Write-Host "Starting deployment process..." -ForegroundColor Cyan

# Define paths
$clientDistPath = "client\dist"
$rootPath = "."

# Check if dist folder exists
if (-not (Test-Path $clientDistPath)) {
    Write-Host "ERROR: client/dist folder not found. Please run 'npm run build' in the client directory first." -ForegroundColor Red
    exit 1
}

Write-Host "Copying files from $clientDistPath to root..." -ForegroundColor Yellow

# Get all files and folders from dist
$items = Get-ChildItem -Path $clientDistPath -Recurse

foreach ($item in $items) {
    $relativePath = $item.FullName.Substring((Resolve-Path $clientDistPath).Path.Length + 1)
    $destinationPath = Join-Path $rootPath $relativePath
    
    if ($item.PSIsContainer) {
        # Create directory if it doesn't exist
        if (-not (Test-Path $destinationPath)) {
            New-Item -ItemType Directory -Path $destinationPath -Force | Out-Null
        }
    } else {
        # Skip if file is .htaccess, app.js, or package.json (we don't want to overwrite these)
        if ($item.Name -in @('.htaccess', 'app.js', 'package.json', 'package-lock.json')) {
            Write-Host "Skipping: $relativePath" -ForegroundColor Gray
            continue
        }
        
        # Copy file
        Copy-Item -Path $item.FullName -Destination $destinationPath -Force
        Write-Host "Copied: $relativePath" -ForegroundColor Green
    }
}

Write-Host "`nDeployment complete!" -ForegroundColor Green
Write-Host "Files have been copied from client/dist to the root directory." -ForegroundColor Cyan
Write-Host "`nNext steps:" -ForegroundColor Yellow
Write-Host "1. Upload all files to your cPanel public_html directory" -ForegroundColor White
Write-Host "2. Ensure the Node.js server is running on port 8080" -ForegroundColor White
Write-Host "3. Visit your domain to test the application" -ForegroundColor White
