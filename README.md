# Typed Route Generator for Frontend Frameworks

This Node.js package provides a route generation tool designed for Front-end meta frameworks that use file-based routing projects. It simplifies the process of creating typed route structures by automatically converting file system-based routing into a JavaScript object, enhancing type safety and improving developer experience.

## Features

- Automated Route Generation: Converts the routes (ex. `/routes` in SvelteKit) directory into a JavaScript object, mirroring the file system structure
- Dynamic Route Support: Handles dynamic, optional, and rest route parameters
- Multiple Module System Support: Compatible with both CommonJS and ES6 module systems
- Command-Line Interface: Easy-to-use CLI for quick and seamless route generation

## Supported Frameworks

- [x] SvelteKit
- [ ] Next.js
- [ ] Nuxt.js
- [ ] Astro
- [ ] Other frameworks (coming soon)

## Installation

Install the package using npm:

```bash
npm install @dabrowskif/typed-routes
```

Or using yarn:

```bash
yarn add @dabrowskif/typed-routes
```

## Usage

### Options

Here are the available options you can use with the Typed Route Generator:

- `--directory <path>`: Specify the path of your routes directory.
- `--framework <type>`: Choose the framework. Available options:
  - `SvelteKit`
  - `Nextjs`
- `--output-dir <path>`: Define the output directory for the generated file.
- `--file-name <name>`: Set the name for the generated file.
- `--function-name <name>`: Customize the function name used in the route object.
- `--module-system <type>`: Select the module system. Available options:

  - `es6`

  - `commonjs`

#### Example

```bash
npx @dabrowskif/typed-routes -fr SvelteKit -d src/routes -od src -of generated-typed-routes.ts -fn _getRoute
```

### CLI Usage

To use this tool via the command line, you can run it directly with npx:

```bash
npx @dabrowskif/typed-routes -fr SvelteKit -d src/routes
```

Alternatively, if you have installed it as a dependency in your project, you can add a script to your `package.json`:

```
scripts": {
  "generate-routes": "typed-routes -fr SvelteKit -d src/routes"
}
```

Then, you can generate routes with:

```bash
npm run generate-routes
```

For a more integrated development experience, consider running this script concurrently with your framework's development server. Tools like `concurrently` or `npm-run-all` can be used to run multiple npm scripts simultaneously. For instance:

```
"scripts": {
  "dev": "concurrently "npm run generate-routes -- --watch" "npm run start-framework-dev""
}
```

This setup will regenerate routes on-the-fly as your file structure changes, alongside your normal development server.

## TODO

### A LOT :)

The following features are planned (and many, many more ):

1. **More Frameworks Support**

2. **CLI Enhancements**

   - Current CLI usage experience is not be the most satisfying thing I can dream of. Improving it will ensure easiness and well documented integrations for upcoming features.

3. **Type-Only Route Definitions**

   - Evolve the current route functions to support type-only definitions that significantly reduce or eliminate runtime overhead. The focus will be on enhancing the developer experience by leveraging TypeScript's advanced type system to provide:
     - Simple functions with typed parameters for general use.
     - Framework-specific enhancements, such as type-safe wrappers for SvelteKit's goto function or Next.js's config hook, ensuring a seamless integration with the respective frameworks' native routing capabilities.

4. **SvelteKit Segments Enhancement**

   - Incorporate support for SvelteKit's advanced routing features, including segment sorting and parameter encoding. This will align the Typed Route Generator with SvelteKit's latest routing capabilities, allowing for more sophisticated route structures.

5. **Custom Strategy Provider**

   - Implement functionality to allow defining custom strategies for route generation. This feature aims to provide greater flexibility and adaptability to specific project requirements.

6. **Support for object-based arguments, instead of multiple arguments inside one function**

   - Passing many arguments into heavily nested dynamic routes one by one is some kind of anti-pattern, so creating an option to make getter function a one-argument based with multiple properties is a good alternative.

7. **Support for passing a query string**
   - Add a simple option to pass a query string into the function invocation in order to produce full and final route for usage.
   - This actually can be even typed, after creating specific file to look for, or scanning a main route file.

## Current Implementation vs. Future Plans

### Current Implementation

Currently, the Typed Route Generator creates routes using a runtime object. This means that the tool generates an actual JavaScript object during runtime to represent the structure of your routes based on your file system. This approach is practical and intuitive, allowing for easy integration and usage in your projects.

```
// Auto-generated by library
export const routes = {
  home: {
    _get: () => `/home`,
    "[profileId]": { _get: (profileId: string) => `/home/${profileId}` },
  },
};

// Actuall usage inside your app
routes.home["[profileId]"]._get("id-123");
```

### Future Plans - Type-Only Implementation

Looking ahead, there are plans to also develop a type-only version of the Typed Route Generator. This implementation will focus on creating TypeScript types instead of runtime objects. The key advantage of this approach is the elimination of runtime overhead, as the route definitions will purely be type annotations without any impact on the runtime bundle size.

This type-only implementation will be particularly beneficial for projects where bundle size is a critical concern and where the primary goal is to leverage TypeScript's type-checking capabilities without adding extra runtime code.

## Contributing

Contributions are welcome! If you have a suggestion or enhancement, feel free to fork the repo and create a pull request, or open an issue with the tag "enhancement".

## License

This project is licensed under the MIT License.
