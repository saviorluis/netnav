const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function convertSvgToJpg() {
  try {
    const imagesDir = path.join(__dirname, 'public', 'images');
    
    // Convert checklist.svg to checklist.jpg
    const svgFile = fs.readFileSync(path.join(imagesDir, 'checklist.svg'));
    await sharp(svgFile)
      .resize(800) // Resize to a reasonable width while maintaining aspect ratio
      .jpeg({ quality: 90 }) // High quality JPEG
      .toFile(path.join(imagesDir, 'checklist.jpg'));
    
    console.log('Successfully converted checklist.svg to checklist.jpg');
  } catch (error) {
    console.error('Error converting SVG to JPG:', error);
  }
}

convertSvgToJpg(); 