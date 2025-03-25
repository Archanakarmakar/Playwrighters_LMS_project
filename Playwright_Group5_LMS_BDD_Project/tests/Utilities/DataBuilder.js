const fs = require('fs');
const path = require('path');

class DataBuilder {
  constructor() {
    this.characterSets = {
      'numbers': '0123456789',
      'special': '!@#$%^&*()_+-=[]{}|;:,.<>?',
      'mixed': 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
      'numbers_with_space': '0123456789 '
    };

    this.currentStringFilePath = './currentString.txt';
    this.programNameFilePath = './currentPrgmName.txt';
    this.namePrefix = 'PlaywrightTeams';
    this.currentString = this.loadCurrentString(this.currentStringFilePath) || 'aaaaa';
  }

  buildString(type, length) {
    const characters = this.characterSets[type.toLowerCase()];

    if (!characters) {
      throw new Error("Invalid type specified. Use 'numbers', 'special', 'mixed', or 'numbers_with_space'.");
    }

    let result = '';
    for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * characters.length);
      result += characters.charAt(index);
    }

    return result;
  }

  loadCurrentString(filename) {
    try {
      if (fs.existsSync(filename)) {
        return fs.readFileSync(filename, 'utf8').trim();
      }
    } catch (e) {
      console.error(e);
    }
    return null;
  }

  saveCurrentString(filename, str) {
    try {
      fs.writeFileSync(filename, str);
    } catch (e) {
      console.error(e);
    }
  }

  getProgramName() {
    const newStr = this.namePrefix;
    this.currentString = this.incrementString(this.currentString);
    this.saveCurrentString(this.currentStringFilePath, this.currentString);
    const currrentPrgmName = (newStr + this.currentString).trim();
    this.saveCurrentString(this.programNameFilePath,currrentPrgmName);
    return (newStr + this.currentString).trim();
  }

  loadCurrentProgramName(){
    try {
        if (fs.existsSync(this.programNameFilePath)) {
          return fs.readFileSync(this.programNameFilePath, 'utf8').trim();
        }
      } catch (e) {
        console.error(e);
      }
      return null;
  }
  incrementString(str) {
    let chars = str.split('');
    let index = chars.length - 1;

    while (index >= 0) {
      if (chars[index] === 'z') {
        chars[index] = 'a';
        index--;
      } else {
        chars[index] = String.fromCharCode(chars[index].charCodeAt(0) + 1);
        break;
      }
    }

    if (index < 0) {
      return 'a' + chars.join('');
    }

    return chars.join('');
  }
}

module.exports = DataBuilder;