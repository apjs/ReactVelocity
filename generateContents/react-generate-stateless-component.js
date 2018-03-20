export default function generatePresentationalComponent(data) {
  let filesToZip = {};
  let keys = Object.keys(data);
  let code = '';
  for (let i = 0; i < keys.length; i++) {
    if (keys[i] === 'action' || keys[i] === 'container/component' || keys[i] === 'reducer') {
      continue;
    }
      let state = data[keys[i]][data[keys[i]].length - 1][0];
      if (state === 'stateless') {
        code += "import React, { Component } from 'react';\n"
        if (data[keys[i]]) {
          for (let k=0; k < data[keys[i]].length-1; k++) {
            code += `import ${data[keys[i]][k]} from './${data[keys[i]][k]}';\n`;
          }
        }
        code += '\n';
        code += `const ${keys[i]} = props => {\n`;
        code += '    return (\n';
        code += '      <div>\n';
        if (data[keys[i]]) {
          for (let j=0; j < data[keys[i]].length - 1; j++) {
            code += `        <${data[keys[i]][j]} />\n`;
          }
        }
        code += '      </div>\n';
        code += '    );\n';
        code += '  };\n\n';
        code += `export default ${keys[i]};`;
        filesToZip[keys[i]] = code;
        code = '';
      }
  }
  return filesToZip;
}
