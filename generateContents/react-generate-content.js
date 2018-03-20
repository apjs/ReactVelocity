const generateCode = data => {
  let filesToZip = {};
  // let keys = Object.keys(data);
  let code = '';
  for (let i = 0; i < keys.length; i++) {
    let state = data[keys[i]][data[keys[i]].length - 1][0];
    if (state === 'stateful') {
      code += "import React, { Component } from 'react';\n"
      if (data[keys[i]]) {
        for (let k=0; k < data[keys[i]].length - 1; k++) {
          code += `import ${data[keys[i]][k]} from './${data[keys[i]][k]}';\n`;
        }
      }
      code += '\n';
      code += `class ${keys[i]} extends Component {\n`;
      code += '  render() {\n';
      code += '    return (\n';
      code += '      <div>\n';
      if (data[keys[i]]) {
        for (let j=0; j < data[keys[i]].length - 1; j++) {
          code += `        <${data[keys[i]][j]} />\n`;
        }
      }
      code += '      </div>\n';
      code += '    );\n';
      code += '  };\n';
      code += '}\n\n';
      code += `export default ${keys[i]};`;
      filesToZip[keys[i]] = code;
      code = '';
    }
  }
  return filesToZip;
}

export default generateCode;
