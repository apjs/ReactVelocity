export function generateCode(data) {
  let filesToZip = {};
  // let keys = Object.keys(data);
  let code = '';
  for (let i = 0; i < data.length; i++) {
    code += "import React, { Component } from 'react';\n"
    if (data[i].node.children) {
      for(let j = 0; j < data[i].node.children.length; j++) {
        code += `import ${data[i].node.children[j]} from './${data[i].node.children[j]}';\n`;
      }
    }
    code += '\n';
    code += `class ${data[i].node.name} extends Component {\n`;
    code += '  render() {\n';
    code += '    return (\n';
    code += '      <div>\n';
  if (data[i].node.name) {
    for (let k=0; k < data[i].node.children.length; k++) {
      code += `        <${data[i].node.children[k]} />\n`;
    }
  }
    code += '      </div>\n';
    code += '    );\n';
    code += '  };\n';
    code += '}\n\n';
    code += `export default ${data[i].node.name};`;
    filesToZip[data[i].node.name] = code;
    code = '';
   }
   return filesToZip;
  }
