const fs = require('fs');
const JavaScriptObfuscator = require('javascript-obfuscator');

const src = fs.readFileSync('career_slam_game.html', 'utf8');

const scriptRegex = /<script>\n\/\/ Results logging([\s\S]*?)<\/script>/;
const match = src.match(scriptRegex);

if (!match) {
  console.error('Could not find main game script block');
  process.exit(1);
}

const originalJS = '// Results logging' + match[1];

const result = JavaScriptObfuscator.obfuscate(originalJS, {
  compact: true,
  controlFlowFlattening: false,
  deadCodeInjection: false,
  debugProtection: false,
  disableConsoleOutput: false,
  identifierNamesGenerator: 'hexadecimal',
  renameGlobals: false,
  rotateStringArray: true,
  selfDefending: false,
  shuffleStringArray: true,
  splitStrings: false,
  stringArray: true,
  stringArrayEncoding: ['base64'],
  stringArrayThreshold: 0.75,
  unicodeEscapeSequence: false
});

const obfuscatedJS = result.getObfuscatedCode();
const output = src.replace(match[0], () => '<script>' + obfuscatedJS + '</script>');

fs.writeFileSync('index.html', output);
console.log('index.html built and obfuscated successfully');
