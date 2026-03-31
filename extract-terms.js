const fs = require('fs');
const path = require('path');

function walkDir(dir, fileCallback) {
  const files = fs.readdirSync(dir);
  for (let file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (!fullPath.includes('.git') && !fullPath.includes('node_modules')) {
        walkDir(fullPath, fileCallback);
      }
    } else if (fullPath.endsWith('.html')) {
      fileCallback(fullPath);
    }
  }
}

const terms = new Set();

walkDir('.', (filePath) => {
  const content = fs.readFileSync(filePath, 'utf8');
  // split by vocab-list
  const parts = content.split(/class="vocab-list[^>]*>/);
  for (let i = 1; i < parts.length; i++) {
    // get content until </ul>
    const ulContent = parts[i].split('</ul>')[0];
    
    // find all <strong> in this ul
    const strongMatches = ulContent.match(/<strong>(.*?)<\/strong>/g);
    if (strongMatches) {
      for (const m of strongMatches) {
        const text = m.replace(/<\/?strong>/g, '').trim();
        // clean up html entities if any, or just add
        terms.add(text);
      }
    }
  }
});

fs.writeFileSync('terms.json', JSON.stringify(Array.from(terms), null, 2));
console.log(`Found ${terms.size} unique terms`);
