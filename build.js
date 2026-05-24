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

function isExcluded(srcPath) {
    const relativePath = path.relative(srcDir, srcPath);
    for (const exclude of excludeList) {
        if (relativePath === exclude || relativePath.startsWith(exclude + path.sep)) {
            return true;
        }
    }
    return false;
}

// Remove old www contents
fs.rmSync(destDir, { recursive: true, force: true });
fs.mkdirSync(destDir);

fs.cpSync(srcDir, destDir, {
    recursive: true,
    filter: (src, dest) => {
        if (src === srcDir) return true;
        return !isExcluded(src);
    }
});

console.log('Build completed. Files copied to www/');
