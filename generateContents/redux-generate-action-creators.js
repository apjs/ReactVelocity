const generateActionCreators = (data) => {
  let code = '';
  for (let i = 0; i < data.length; i++) {
    if (data[i].parentNode) {
      if (data[i].parentNode.name === "action") {
        code += `export const ${data[i].node.name} = replace_payload => {\n`;
        code += `  return {\n`;
        code += `    type: '${data[i].node.type}',\n`;
        code += `    replace_payload\n`;
        code += `  }\n`;
        code += `}\n\n`;
      }
    }
  }
  return code;
}

export default generateActionCreators;
