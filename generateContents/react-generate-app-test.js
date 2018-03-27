const generateAppTestJS = () => {
  let code = `import React from 'react';\n`;
  code += `import ReactDOM from 'react-dom';\n`;
  code += `import App from './App';\n\n`;
  code += `it('renders without crashing', () => {\n`;
  code += `  const div = document.createElement('div');\n`;
  code += `  ReactDOM.render(<App />, div);\n`;
  code += `  ReactDOM.unmountComponentAtNode(div);\n`;
  code += `});`;
  return code;
}

export default generateAppTestJS;
