const generateReducers = (data) => {
  let code = '';
  console.log('DATA: ', data);
  for (let i = 0; i < data.length; i++) {
    if (data[i].node.componentType) {
      if (data[i].node.componentType === "Reducer") {
        code += `export function ${data[i].node.name}(state = {}, action) {\n`;
        code += `  switch (action.type) {\n`;
        code += `    case ${data[i].node.case}:\n`;
        code += `      return Object.assign({}, state, {\n`;
        code += `        item: 'new item'\n`;
        code += `      });\n`;
        code += `    default:\n`;
        code += `      return state;\n`
        code += `  }\n`;
        code += `}\n\n`;
      }
    }
  }
  return code;
}

export default generateReducers;
