const generateIndexHTML = () => {
  let code = `<!DOCTYPE html>\n`;
  code += `<html lang="en">\n`;
  code += `<head>\n`;
  code += `  <meta charset="UTF-8">\n`;
  code += `  <title>React/Redux App</title>\n`;
  code += `</head>\n`;
  code += `<body>\n`;
  code += `  <div id='app'>React/Redux App</div>\n`;
  code += `</body>\n`;
  code += `</html>`;
  return code;
}

export default generateIndexHTML;
