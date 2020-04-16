// pages

const glob = require('glob');

const path = require('path');

let pages = [];
glob.sync('./cfg/*.txt').forEach((filePath) => {
  pages.push({...path.parse(filePath), filePath});
});

console.log(pages)