const { exec } = require('child_process');
const fs = require('fs');

class CodeExtensionInstaller {
  constructor() {
    this.extensions = [];
  }

  cl(style, text) {
    console.log(style + text + '\x1b[0m');
  }

  cleanArray() {
    this.extensions = this.extensions.filter(
      extension => extension.trim() !== '',
    );
  }

  getExtensions() {
    this.cl('\x1b[36m', '👀 Reading extensions from extensions.txt');

    fs.readFile('extensions.txt', (err, data) => {
      if (err) throw err;
      this.extensions = data.toString().split('\n');
      this.cleanArray();
      this.installExtensions();
    });
  }

  installExtensions() {
    this.cl('\x1b[36m', '✔️ Ready to install extensions');

    for (let extension of this.extensions) {
      this.cl('\x1b[35m', `☕ Installing ${extension}`);

      exec(`code --install-extension ${extension}`, (error, stdout, stderr) => {
        if (error || stderr)
          this.cl('\x1b[31m', `⚠️ Please check ${extension}`);
      });
    }
  }

  main() {
    this.cl('\x1b[36m', '🔥 Started CodeExtensionInstaller');

    this.getExtensions();
  }
}

new CodeExtensionInstaller().main();
