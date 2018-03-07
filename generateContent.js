import React from 'react';

function paul() {
  return (
    <div>
      <ul>
        <li><p>Scott Bengtson: CEO</p></li>
        <li><p>Paul Dubovsky: CTO</p></li>
        <li><p>Justin Yip: COO</p></li>
        <li><p>Alex Clifton: Janitor</p></li>
      </ul>
    </div>
  )
}

function generateCode() {
  let contents = '';
  contents += 'function paul() {\n';
  contents += '  return (\n';
  contents += '    <div>\n';
  contents += '      <ul>\n';
  contents += '        <li><p>Scott Bengtson: CEO</p></li>\n';
  contents += '        <li><p>Paul Dubovsky: CTO</p></li>\n';
  contents += '        <li><p>Justin Yip: COO</p></li>\n';
  contents += '        <li><p>Alex Clifton: Janitor</p></li>\n';
  contents += '      </ul>\n';
  contents += '    </div>\n';
  contents += '  )\n';
  contents += '}';
  return contents;
}

module.exports = generateCode;
