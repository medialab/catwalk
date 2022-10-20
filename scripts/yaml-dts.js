const YAML = require('yaml');
const path = require('path');
const fs = require('fs');

const englishMessagesPath = path.join(__dirname, '..', 'i18n', 'en.yml');
const englishMessages = YAML.parse(
  fs.readFileSync(englishMessagesPath, 'utf8')
);

function templateTypescriptDeclaration(messages) {
  const declaration = [
    '// !!! DO NOT EDIT: This file has been automatically generated',
    '// !!! To update it, use `npm run dts-gen`',
    'interface InternationalizedStrings {'
  ];

  for (const name in messages) {
    declaration.push(`  ${name}: string`);
  }

  declaration.push('[name: string]: string;');
  declaration.push('}');
  declaration.push('');
  declaration.push("declare module '*.yml' {");
  declaration.push('  const strings: InternationalizedStrings;');
  declaration.push('  export default strings;');
  declaration.push('}');

  return declaration.join('\n');
}

console.log(templateTypescriptDeclaration(englishMessages));
