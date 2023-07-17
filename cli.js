#!/usr/bin/env node
const { program } = require("commander");
const fs = require("fs");
const path = require("path");

program.version("1.1.0").description("React CLI to generate components");

program
  .command("generate <name>")
  .alias("g")
  .description("Generate a React component")
  .option("-c, --class", "Generate a class component")
  .option("-n, --no-css", "Do not generate CSS file")
  .action((name, options) => {
    const rootDir = findRootDirectory(process.cwd());
    const isTypeScript = checkTypeScript(rootDir);

    const srcDir = path.join(rootDir, "src");
    const componentsDir = path.join(srcDir, "components");
    const componentDir = path.join(componentsDir, name);
    const componentFile = path.join(
      componentDir,
      `${capitalize(name)}.${isTypeScript ? "tsx" : "jsx"}`
    );
    const cssModuleFile = path.join(
      componentDir,
      `${capitalize(name)}.module.css`
    );

    if (fs.existsSync(componentDir)) {
      console.log(`Component '${name}' already exists.`);
      process.exit(1);
    }

    createDirectory(srcDir);
    createDirectory(componentsDir);
    createDirectory(componentDir);

    const componentTemplate = options.class
      ? isTypeScript
        ? classComponentTemplateTSX(name)
        : classComponentTemplateJSX(name)
      : isTypeScript
      ? functionalComponentTemplateTSX(name, options.noCss)
      : functionalComponentTemplateJSX(name, options.noCss);

    fs.writeFileSync(componentFile, componentTemplate);

    if (!options.noCss) {
      const cssTemplate = cssModuleTemplate(name);
      fs.writeFileSync(cssModuleFile, cssTemplate);
    }

    console.log(`Component '${name}' generated successfully.`);
  });

program.parse(process.argv);

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function findRootDirectory(currentDir) {
  let dir = currentDir;
  while (!fs.existsSync(path.join(dir, "package.json"))) {
    const parentDir = path.dirname(dir);
    if (dir === parentDir) {
      console.error("Could not find the root directory of the project.");
      process.exit(1);
    }
    dir = parentDir;
  }
  return dir;
}

function checkTypeScript(rootDir) {
  const tsConfigPath = path.join(rootDir, "tsconfig.json");
  return fs.existsSync(tsConfigPath);
}

function createDirectory(directoryPath) {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath);
  }
}

function classComponentTemplateJSX(name) {
  return `import React from 'react';
import styles from './${name}.module.css';

class ${capitalize(name)} extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <h1>${capitalize(name)}</h1>
      </div>
    );
  }
}

export default ${capitalize(name)};
`;
}

function classComponentTemplateTSX(name) {
  return `import React from 'react';
import styles from './${name}.module.css';

interface ${capitalize(name)}Props {}

class ${capitalize(name)} extends React.Component<${capitalize(name)}Props> {
  render() {
    return (
      <div className={styles.container}>
        <h1>${capitalize(name)}</h1>
      </div>
    );
  }
}

export default ${capitalize(name)};
`;
}

function functionalComponentTemplateJSX(name, noCss) {
  return `import React from 'react';
${noCss ? "" : `import styles from './${name}.module.css';`}

const ${capitalize(name)} = () => {
  return (
    <div ${noCss ? "" : `className={styles.container}`} >
      <h1>${capitalize(name)}</h1>
    </div>
  );
};

export default ${capitalize(name)};
`;
}

function functionalComponentTemplateTSX(name, noCss) {
  return `import React from 'react';
${noCss ? "" : `import styles from './${name}.module.css';`}

interface ${capitalize(name)}Props {}

const ${capitalize(name)}: React.FC<${capitalize(name)}Props> = () => {
  return (
    <div ${noCss ? "" : `className={styles.container}`} >
      <h1>${capitalize(name)}</h1>
    </div>
  );
};

export default ${capitalize(name)};
`;
}

function cssModuleTemplate(name) {
  return `/* Styles for ${capitalize(name)} component */
.container {
  margin: 10px;
  padding: 10px;
}
`;
}
