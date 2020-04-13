const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');


// Get document, or throw exception on error
try {
  const doc = yaml.safeLoad(fs.readFileSync(path.resolve(__dirname, './schema.yml'), 'utf8'));
  console.log(doc);
} catch (e) {
  console.log(e);
}
