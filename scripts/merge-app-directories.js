const fs = require('fs');
const path = require('path');

// Function to recursively copy files from source to destination
function copyRecursive(source, destination) {
  // Create destination directory if it doesn't exist
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  // Get all files and directories in the source
  const items = fs.readdirSync(source);

  for (const item of items) {
    const sourcePath = path.join(source, item);
    const destPath = path.join(destination, item);
    
    // Check if it's a directory
    if (fs.statSync(sourcePath).isDirectory()) {
      // Recursively copy the directory
      copyRecursive(sourcePath, destPath);
    } else {
      // Copy the file
      fs.copyFileSync(sourcePath, destPath);
      console.log(`Copied: ${sourcePath} -> ${destPath}`);
    }
  }
}

// Main function to merge app directories
function mergeAppDirectories() {
  const srcAppDir = path.join(__dirname, '..', 'src', 'app');
  const appDir = path.join(__dirname, '..', 'app');

  console.log('Starting merge of app directories...');
  
  try {
    // Copy files from src/app to app
    copyRecursive(srcAppDir, appDir);
    console.log('Successfully merged app directories!');
  } catch (error) {
    console.error('Error merging app directories:', error);
    process.exit(1);
  }
}

// Run the merge function
mergeAppDirectories(); 