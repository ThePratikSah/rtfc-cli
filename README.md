# Rtfc CLI

A command-line interface (CLI) tool for generating React components with ease.

[![npm version](https://img.shields.io/npm/v/rtfc-cli.svg)](https://www.npmjs.com/package/rtfc-cli)
[![GitHub stars](https://img.shields.io/github/stars/ThePratikSah/rtfc-cli.svg?style=social)](https://github.com/ThePratikSah/rtfc-cli/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/ThePratikSah/rtfc-cli.svg?style=social)](https://github.com/ThePratikSah/rtfc-cli/network/members)

## Installation

To use the Rtfc CLI, you can either install it globally or use it with `npx` without global installation.

### Global Installation

```shell
npm install -g rtfc-cli
```

### Usage with npx

```shell
npx rtfc-cli generate <componentName>
```

Replace `<componentName>` with the desired name of your React component.

## Commands

### Generate

Generate a new React component.

```shell
rtfc-cli g <componentName>
```

Alias: `generate`

## Features

- Automatic detection of project structure (root directory and TypeScript).
- Generates React components with associated CSS modules.
- Consistent naming conventions for components.
- Easily customizable and extensible.

## Contributing

Contributions are welcome! Feel free to open issues and submit pull requests on the GitHub repository.

## Roadmap

The React CLI is actively maintained and will continue to be improved with new features and enhancements. Here are some planned updates:

- Support for additional component templates.
- Advanced customization options.
- Support for different CSS-in-JS libraries.

## License

This project is licensed under the [MIT License](LICENSE).

---

**Note:** If you prefer not to install the React CLI globally, you can use it with `npx` by running `npx rtfc-cli generate <componentName>` or `npx rtfc-cli g <componentName>` without the need for global installation.

For more information and detailed usage instructions, please refer to the [GitHub repository](https://github.com/ThePratikSah/rtfc-cli).