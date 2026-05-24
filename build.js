const fs = require('fs');
const path = require('path');

const srcDir = __dirname;
const destDir = path.join(__dirname, 'www');

const excludeList = [
    'node_modules',
    'android',
    'ios',
    'www',
    '.git',
    '.vscode',
    '.github',
    'build.js',
    'capacitor.config.json',
    'capacitor.config.ts',
    'package.json',
    'package-lock.json',
    '.gitignore',
    'README.md',
    'LICENSE',
    'netlify.toml'
];

function isExcluded(itemName) {
    return excludeList.includes(itemName);
}

// Remove old www contents
if (fs.existsSync(destDir)) {
    fs.rmSync(destDir, { recursive: true, force: true });
}
fs.mkdirSync(destDir);

const items = fs.readdirSync(srcDir);

for (const item of items) {
    if (!isExcluded(item)) {
        const srcPath = path.join(srcDir, item);
        const destPath = path.join(destDir, item);
        
        fs.cpSync(srcPath, destPath, { recursive: true });
    }
}

console.log('Build completed. Files copied to www/');
