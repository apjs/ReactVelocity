const generateReduxIndexJS = () => {
  let code = `import React from 'react';\n`;
  code += `import { render } from 'react-dom';\n`;
  code += `import { Provider } from 'react-redux';\n`;
  code += `import { createStore } from 'redux';\n`;
  code += `import * as rootReducer from './reducers/reducers';\n`;
  code += `import App from './components/App';\n\n`;
  code += `const store = createStore(rootReducer);\n\n`;
  code += `render(\n`;
  code += `  <Provider store={store}>\n`;
  code += `    <App />\n`;
  code += `  </Provider>,\n`;
  code += `  document.getElementById('app')\n`;
  code += `)`;
  return code;
}

export default generateReduxIndexJS;
