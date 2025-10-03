// Simple server startup script
const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting Zubad-port with Chat Bot...\n');

// Start the server
const server = spawn('node', ['server-setup.js'], {
    stdio: 'inherit',
    cwd: path.join(__dirname)
});

server.on('error', (error) => {
    console.error('❌ Server error:', error);
});

server.on('close', (code) => {
    console.log(`\n📊 Server exited with code ${code}`);
});

// Handle process termination
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down server...');
    server.kill('SIGINT');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\n🛑 Shutting down server...');
    server.kill('SIGTERM');
    process.exit(0);
});
