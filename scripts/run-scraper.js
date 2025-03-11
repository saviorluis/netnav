#!/usr/bin/env node

/**
 * Automated script to run the event scraper
 * 
 * This script can be scheduled to run periodically using cron or a similar scheduler.
 * Example cron entry to run daily at 2 AM:
 * 0 2 * * * cd /path/to/project && node scripts/run-scraper.js
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Get the project root directory
const projectRoot = path.resolve(__dirname, '..');

// Log file path
const logFile = path.join(projectRoot, 'logs', 'scraper.log');

// Ensure logs directory exists
if (!fs.existsSync(path.join(projectRoot, 'logs'))) {
  fs.mkdirSync(path.join(projectRoot, 'logs'), { recursive: true });
}

// Function to log messages
function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  
  // Log to console
  console.log(logMessage);
  
  // Append to log file
  fs.appendFileSync(logFile, logMessage);
}

// Main function to run the scraper
async function runScraper() {
  try {
    log('Starting event scraper...');
    
    // Run the scraper script
    execSync('npm run scrape', { 
      cwd: projectRoot,
      stdio: 'inherit'
    });
    
    log('Event scraper completed successfully.');
  } catch (error) {
    log(`Error running scraper: ${error.message}`);
    process.exit(1);
  }
}

// Run the scraper
runScraper(); 