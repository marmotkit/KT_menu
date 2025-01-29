const sharp = require('sharp');

async function convertIcons() {
    const sizes = [192, 512];
    
    for (const size of sizes) {
        await sharp('images/icon.svg')
            .resize(size, size)
            .png()
            .toFile(`images/icon-${size}x${size}.png`);
    }
}

convertIcons(); 