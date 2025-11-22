import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const serverDir = path.resolve(__dirname, '..');

console.log('🚀 Starting Deployment Preparation...');

try {
    // 1. Build Client
    console.log('\n📦 Building Client...');
    execSync('npm run build', { stdio: 'inherit', cwd: path.resolve(serverDir, '../client') });

    // 2. Prepare Server Public Dir
    console.log('\n📂 Preparing Server Public Directory...');
    const publicDir = path.resolve(serverDir, 'public');
    if (fs.existsSync(publicDir)) {
        fs.rmSync(publicDir, { recursive: true, force: true });
    }
    fs.mkdirSync(publicDir);

    // 3. Copy Build Files
    console.log('\n📋 Copying Build Files...');
    const srcDir = path.resolve(serverDir, '../client/dist');
    fs.cpSync(srcDir, publicDir, { recursive: true });

    console.log('\n✅ Client build copied to server/public');

    // 4. Zip Server (Windows only)
    console.log('\n🗜️ Zipping Server for Deployment...');
    const zipPath = path.resolve(serverDir, '../deployment.zip');
    if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);

    // PowerShell command to zip the server directory contents
    // We run this from the server directory
    const cmd = `powershell -Command "Get-ChildItem -Path '${serverDir}' -Exclude node_modules, .git, .env, .vscode, tmp, .gemini | Compress-Archive -DestinationPath '${zipPath}' -Force"`;
    execSync(cmd, { stdio: 'inherit' });

    console.log(`\n🎉 Deployment Bundle Created: ${zipPath}`);
    console.log('👉 Upload this zip file to your BigRock cPanel (public_html or subdomain folder).');

} catch (err) {
    console.error('\n❌ Error:', err.message);
}
