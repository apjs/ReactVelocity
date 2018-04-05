/*
  I am copying all functions defined inside react-tree.js into this file to test.
  For our future selves..... if you decide to change functionality on any of
  these methods, you will have to then copy the code into the function definition
  of this file.
  It's not an ideal workflow, but at least you won't have to rewrite any of the tests:)

  Only the formatName() function is clear to test for me at this point.
  All of the others use this.setState() and pieces of RST.

  Be aware that our formatName() is in react-tree.js AND redux-tree.js
  So, if changes need to be made, they need to be made in 3 places.
  1- formatName() in react-tree.js
  2- formatName() in redux-tree.js
  3- formatName() in reactTreeFunctions.test.js
*/

let formatName = (textField)  => {
   let scrubbedResult = textField
   // Capitalize first letter of string.
   //| ^ = beginning of output | . = 1st char of str |
   .replace(/^./g, x => x.toUpperCase())
   // Capitalize first letter of each word and removes spaces.
   //| \ = matches | \w = any alphanumeric | \S = single char except white space
   //| * = preceeding expression 0 or more times | + = preceeding expression 1 or more times |
   .replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1);})
   .replace(/\ +/g, x => '')
   // Remove appending file extensions like .js or .json.
   //| \. = . in file extensions | $ = end of input |
   .replace(/\..+$/, '');
   return scrubbedResult;
 }

 test('formatName Function', () => {
   //must capitalize first string
    expect(formatName('barney')).toBe('Barney');
    //must remove spaces
    expect(formatName('Bar Bar')).toBe('BarBar');
   //must capitalize first letter of each word
    expect(formatName('barney barry')).toBe('BarneyBarry');
   //must remove file extensions like .js or .json
    expect(formatName('barney.js')).toBe('Barney');
    //last wild test.
     expect(formatName('barny.js')).toBe('Barny');
 });




/*
  Now for a test on our Export Button's function...

*/

 function generateCode(data) {
   let filesToZip = {};
   let keys = Object.keys(data);
   let code = '';
   for (let i = 0; i < keys.length; i++) {
     code += "import React, { Component } from 'react';\n"
     if (data[keys[i]]) {
       for (let k=0; k < data[keys[i]].length; k++) {
         code += `import ${data[keys[i]][k]} from './${data[keys[i]][k]}';\n`;
       }
     }
     code += '\n';
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
//sampleData...
const treeData = [{title: 'App', children: [{title: 'Bengt', children: [{title: 'Einar'}]}, {title: 'Daniel'}]}];
const version2 = {"App":["Scott"],"Scott":["Justin"],"Justin":null,"Alex":null}
test('Does the generateCode() function export anything at all', () => {
  expect(generateCode(treeData)).toBeDefined();
 });
