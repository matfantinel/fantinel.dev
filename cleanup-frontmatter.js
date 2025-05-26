import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directory containing the markdown files
const articlesDir = path.join(__dirname, 'public', 'cms', 'articles');

// Function to clean up frontmatter in a markdown file
function cleanupFrontmatter(filePath) {
  try {
    // Read the file content
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check if the file has frontmatter (starts with ---)
    if (!content.startsWith('---')) {
      console.log(`Skipping ${filePath} - No frontmatter found`);
      return;
    }
    
    // Find the end of the frontmatter
    const endOfFrontmatter = content.indexOf('---', 3);
    if (endOfFrontmatter === -1) {
      console.log(`Skipping ${filePath} - Invalid frontmatter format`);
      return;
    }
    
    // Extract the frontmatter and the rest of the content
    const frontmatter = content.substring(0, endOfFrontmatter + 3);
    const restOfContent = content.substring(endOfFrontmatter + 3);
    
    // Process the frontmatter
    let cleanedFrontmatter = frontmatter
      .replace(/^tags:.*$/m, '') // Remove tags
      .replace(/^type:.*$/m, '') // Remove type
      .replace(/^socialImage:.*$/m, '') // Remove socialImage
      .replace(/^showImage:.*$/m, '') // Remove showImage
      .replace(/updated: 1970-01-01T00:00:00\.000Z/m, 'updated: null') // Replace specific updated date with null
      .replace(/\n\n+/g, '\n'); // Remove multiple consecutive newlines
    
    // Write the cleaned content back to the file
    fs.writeFileSync(filePath, cleanedFrontmatter + restOfContent);
    console.log(`Cleaned up frontmatter in ${path.basename(filePath)}`);
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

// Process all markdown files in the directory
function processDirectory() {
  try {
    // Get all markdown files
    const files = fs.readdirSync(articlesDir)
      .filter(file => file.endsWith('.md'))
      .map(file => path.join(articlesDir, file));
    
    console.log(`Found ${files.length} markdown files to process`);
    
    // Process each file
    let processedCount = 0;
    files.forEach(file => {
      cleanupFrontmatter(file);
      processedCount++;
    });
    
    console.log(`Processed ${processedCount} files successfully`);
  } catch (error) {
    console.error('Error processing directory:', error);
  }
}

// Run the script
processDirectory();
