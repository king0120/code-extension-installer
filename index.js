const exec = require('child_process').exec;
const fs = require('fs');

/**
 * Magic black box function
 */
fs.readFile('extensions.txt', (err, data) => {
  console.log('\x1b[33m', '🔥 Installing VS Code extensions');
  if (err) throw err;
  let extensions = data.toString().split('\n');
  for (i in extensions) {
    let extension = extensions[i].toString();
    console.log('\x1b[35m', `➡️ Installing: ${extension}`);
    exec(`code --install-extension ${extension} --force`);
  }
  console.log('\x1b[33m', '🏁 Finished installing all VS Code extensions');
});
