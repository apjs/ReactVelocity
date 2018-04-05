const generateReactIndexJS = () => {
  let code = `import React from 'react';\n`;
  code += `import ReactDOM from 'react-dom';\n`;
  code += `import './index.css';\n`;
  code += `import App from './App';\n`;
  code += `import registerServiceWorker from './registerServiceWorker';\n\n`;
  code += `ReactDOM.render(<App />, document.getElementById('root'));\n`;
  code += `registerServiceWorker();`;
  return code;
}

export default generateReactIndexJS;
