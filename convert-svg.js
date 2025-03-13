const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function convertSvgToPng() {
  try {
    // Create icons directory if it doesn't exist
    const iconsDir = path.join(__dirname, 'public', 'icons');
    if (!fs.existsSync(iconsDir)) {
      fs.mkdirSync(iconsDir, { recursive: true });
    }

    // Convert 192x192 icon
    const svg192 = fs.readFileSync(path.join(iconsDir, 'icon-192x192.svg'));
    await sharp(svg192)
      .resize(192, 192)
      .png()
      .toFile(path.join(iconsDir, 'icon-192x192.png'));
    console.log('Created 192x192 PNG icon');

    // Convert 512x512 icon
    const svg512 = fs.readFileSync(path.join(iconsDir, 'icon-512x512.svg'));
    await sharp(svg512)
      .resize(512, 512)
      .png()
      .toFile(path.join(iconsDir, 'icon-512x512.png'));
    console.log('Created 512x512 PNG icon');

    console.log('Conversion completed successfully');
  } catch (error) {
    console.error('Error converting SVG to PNG:', error);
  }
}

convertSvgToPng(); 