#!/usr/bin/env node
const { program } = require("commander");
const fs = require("fs");
const path = require("path");

program.version("1.0.0").description("React CLI");

program
    .command("generate <name>")
    .alias("g")
    .description("Generate a React component")
    .action((name) => {
        const rootDir = findRootDirectory(process.cwd());
        const isTypeScript = checkTypeScript(rootDir);

        const srcDir = path.join(rootDir, "src");
        const componentsDir = path.join(srcDir, "components");
        const componentDir = path.join(componentsDir, name);
        const componentFile = path.join(
            componentDir,
            `${name}.${isTypeScript ? "tsx" : "jsx"}`
        );
        const cssModuleFile = path.join(componentDir, `${name}.module.css`);

        createDirectory(srcDir);
        createDirectory(componentsDir);
        createDirectory(componentDir);

        const componentCode = isTypeScript
            ? `import React from 'react';
import styles from './${name}.module.css';

interface ${capitalize(name)}Props {}

const ${capitalize(name)}: React.FC<${capitalize(name)}Props> = () => {
  return (
    <div className={styles.container}>
      <h1>${capitalize(name)}</h1>
    </div>
  );
};

export default ${capitalize(name)};
`
            : `import React from 'react';
import styles from './${name}.module.css';

const ${capitalize(name)} = () => {
  return (
    <div className={styles.container}>
      <h1>${capitalize(name)}</h1>
    </div>
  );
};

export default ${capitalize(name)};
`;

        fs.writeFileSync(componentFile, componentCode);
        fs.writeFileSync(
            cssModuleFile,
            `/* Styles for ${capitalize(name)} component */
.container {
  margin: 10px;
  padding: 10px;
}`
        );

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
