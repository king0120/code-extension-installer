'use strict';

const { exec } = require('child_process');
const fs = require('fs');

class CodeExtensionInstaller {
  constructor() {
    this.extensions = [];
  }

  /**
   * Over engineered command-line colors ;)
   *
   * @param {string} style
   * @param {string} text
   * @memberof CodeExtensionInstaller
   */
  cl(style, text) {
    console.log(style + text + '\x1b[0m');
  }

  /**
   * Remove (unnecessary) whitespaces from the array
   *
   * @returns {void}
   * @memberof CodeExtensionInstaller
   */
  cleanArray() {
    this.extensions = this.extensions.filter(
      extension => extension.trim() !== '',
    );
  }

  /**
   * Retrieve extensions from list and parse to array
   *
   * @returns {void}
   * @memberof CodeExtensionInstaller
   */
  getExtensions() {
    this.cl('\x1b[36m', '👀 Reading extensions from extensions.txt');

    fs.readFile('extensions.txt', (err, data) => {
      if (err) throw err;
      this.extensions = data.toString().split('\n');
      this.cleanArray();
      this.installExtensions();
    });
  }

  /**
   * Install each extension from the list
   *
   * @returns {void}
   * @memberof CodeExtensionInstaller
   */
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

  /**
   * Entry point
   *
   * @memberof CodeExtensionInstaller
   */
  main() {
    this.cl('\x1b[36m', '🔥 Started CodeExtensionInstaller');

    this.getExtensions();
  }
}

/**
 * Instance of CodeExtensionInstaller
 */
new CodeExtensionInstaller().main();
