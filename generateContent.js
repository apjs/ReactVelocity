// export function generateCode(data) {
//   let code = '';
//   for (let i = 0; i < data.length; i++) {
//     code += "import React, { Component } from 'react';\n\n"
//     code += `class extends ${data[i].title} {\n`;
//     code += '  render() {\n';
//     code += '    return (\n';
//     code += '      <div>\n';
//     if (data[i].children) {
//       for (let j=0; j < data[i].children.length; j++) {
//         code += `        <${data[i].children[j].title} />\n`;
//       }
//     }
//     code += '      </div>\n';
//     code += '    );\n';
//     code += '  };\n';
//     code += '}\n\n';
//     code += `export default ${data[0].title};`;
//   }
//   return code;
// }

export function generateCode(data) {
  let filesToZip = {};
  let keys = Object.keys(data);
  let code = '';
  for (let i = 0; i < keys.length; i++) {
    code += "import React, { Component } from 'react';\n\n"
    code += `class ${keys[i]} extends Component {\n`;
    code += '  render() {\n';
    code += '    return (\n';
    code += '      <div>\n';
    if (data[keys[i]]) {
      for (let j=0; j < data[keys[i]].length; j++) {
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
  return filesToZip;
}

// export const treeData = [{title: 'App', children: [{title: 'Bengt', children: [{title: 'Einar'}]}, {title: 'Daniel'}]}];
// export const version2 = {"App":["Scott"],"Scott":["Justin"],"Justin":null,"Alex":null}
