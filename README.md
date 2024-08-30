# Typed Route Generator for Frontend Frameworks

Typed Routes provides a route generation tool for Frontend meta frameworks that use file-based routing projects, such as SvelteKit or NextJS. It simplifies the process of creating typed route structures by automatically converting filesystem-based routing into a JavaScript object, enhancing type safety and improving developer experience.

## Features

- Automated Route Generation: Converts the routes (ex. `/routes` in SvelteKit) directory into a JavaScript object, mirroring the file system structure
- Dynamic Route Support: Handles dynamic, optional and rest route parameters
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
npm install --save-dev @dabrowskif/typed-routes
```

Or using yarn:

```bash
yarn add --dev @dabrowskif/typed-routes
```

## Usage

Here are the available options you can use with the Typed Route Generator:

### Options

| Option                          | Description                                            | Required | Default     | Possible Values         |
|---------------------------------|--------------------------------------------------------|----------|-------------|-------------------------|
| `-r, --root-directory <string>` | Directory where all routes all stored                | **Yes**  | None        | Any valid path          |
| `-f, --framework <Framework>`   | Framework for which to generate routes                | **Yes**  | None        | `sveltekit`, `nextjs`   |
| `-od, --output-directory <string>` | Directory where the generated routes file is saved | No       | Current dir | Any valid path          |
| `-of, --output-file-name <string>` | Name of the file with generated routes             | No       | `routes.js` | Any valid file name     |
| `-fn, --function-name <name>`   | Function name that will be used to get url path for given file | No       | `_get`  | Any valid function name |
| `-m, --module-system <ModuleSystem>` | Module system to use (commonjs or es6)            | No       | `es6`       | `es6`, `commonjs`       |
| `-v, --verbose <boolean>`       | Enable verbose logging                                | No       | `false`     | `true`, `false`         |

### CLI Usage

To use this tool via the command line, you can run it directly with npx:

```bash
npx @dabrowskif/typed-routes -f SvelteKit -r src/routes
```

Alternatively, if you have installed it as a dependency in your project, you can add a script to your `package.json`:

```
scripts": {
    ...
    "generate-routes": "typed-routes -f sveltekit -r src/routes"
    ...
}
```

Then, you can generate routes running this script:

```bash
npm run generate-routes
```

### Sample output

```
export const routes = {
  home: {
    _get: () => `/home`,
    "[profileId]": { _get: (profileId: string) => `/home/${profileId}` },
  },
};
```

### Actual usage in your app

```
routes.home["[profileId]"]._get("id-123");
```

For a more integrated development experience, consider running this script concurrently with your framework's development server. Tools like `nodemon` or `concurrently` can be used to run multiple npm scripts simultaneously.

#### Example with nodemon

(keep in mind you have to have nodemon installed)

```
scripts": {
    ...
    "generate-routes": "typed-routes -f sveltekit -r src/routes",
    "generate-routes:watch": "nodemon --exec npm run generate-routes --watch src/routes"
    ...
}
```

## TODO

The following features are planned:

1. **More Frameworks Support**

2. **Native watch**

3. **Type-Only Route Definitions**

   - Evolve the current route functions to support type-only definitions that adds minimal runtime overhead.
     - Simple functions with typed parameters for general use.
     - Framework-specific enhancements, such as type-safe wrappers for SvelteKit's goto function or Next.js's config hook

4. **SvelteKit Segments Enhancement**

   - Incorporate support for SvelteKit's advanced routing features, including segment sorting and parameter encoding. This will align the Typed Route Generator with SvelteKit's latest routing capabilities, allowing for more sophisticated route structures.

5. **Custom Strategy Provider**

   - Implement functionality to allow defining custom strategies for route generation. This feature aims to provide greater flexibility and adaptability to specific project requirements.

6. **Support for object-based arguments, instead of multiple arguments inside one function**

   - Passing many arguments into heavily nested dynamic routes one by one is more or less an anti-pattern, so creating an option to make getter function a one-argument based with multiple properties is a good alternative.

7. **Support for passing a query string**
   - Add a simple option to pass a query string into the function invocation in order to produce full and final route for usage.
   - This actually can be even typed, after creating specific file to look for, or scanning a main route file.

## Contributing

Contributions are welcome! If you have a suggestion or enhancement, feel free to fork the repo and create a pull request.

## License

This project is licensed under the MIT License.
