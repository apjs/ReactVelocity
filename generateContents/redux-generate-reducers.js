const generateReducers = (data) => {
  let code = '';
  for (let i = 0; i < data.length; i++) {
    if (data[i].node.componentType) {
      if (data[i].node.componentType === "Reducer") {
        code += `export function ${data[i].node.name}(state = {}, action) {\n`;
        code += `  switch (action.type) {\n`;
        if (data[i].node.case) {
          for (let j=0; j < data[i].node.case.length;j++) {
            code += `    case '${data[i].node.case[j]}':\n`;
            code += `      return Object.assign({}, state, {\n`;
            code += `        item: 'new item'\n`;
            code += `      });\n`;
          }
        }
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
