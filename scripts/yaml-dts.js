const YAML = require('yaml');
const path = require('path');
const glob = require('glob');
const fs = require('fs');

const VARIABLES_REGEX = /\{([^}]+)\}/g;

const I18N_DIR = path.join(__dirname, '..', 'i18n');

const englishMessagesPath = path.join(I18N_DIR, 'en.yml');
const englishMessages = YAML.parse(
  fs.readFileSync(englishMessagesPath, 'utf8')
);

const langPaths = glob.sync(path.join(I18N_DIR, '*.yml'));

const WARNING = [
  '// !!! DO NOT EDIT: This file has been automatically generated',
  '// !!! To update it, use `npm run dts-gen`'
];

function templateTypescriptDeclaration(messages) {
  const declaration = WARNING.slice();

  declaration.push('export interface InternationalizedStrings {');

  for (const name in messages) {
    if (name.endsWith('Template')) {
      let variableNames = Array.from(messages[name].matchAll(VARIABLES_REGEX));

      if (!variableNames.length)
        throw new Error('name should contain at least a variable!');

      variableNames = Array.from(new Set(variableNames.map(m => m[1])));

      declaration.push(
        `  ${name}: (params: {${variableNames
          .map(v => v + ':' + 'string | number')
          .join(',')}}) => string`
      );
    } else {
      declaration.push(`  ${name}: string`);
    }
  }

  declaration.push('}');
  declaration.push('');

  return declaration.join('\n');
}

function templateSubTypescriptDeclaration() {
  const declaration = WARNING.slice();

  declaration.push(`import type {InternationalizedStrings} from './types';`);
  declaration.push(`declare const strings: InternationalizedStrings;`);
  declaration.push(`export default strings;`);

  return declaration.join('\n');
}

fs.writeFileSync(
  path.join(I18N_DIR, 'types.d.ts'),
  templateTypescriptDeclaration(englishMessages)
);

langPaths.forEach(p => {
  fs.writeFileSync(p + '.d.ts', templateSubTypescriptDeclaration());
});
