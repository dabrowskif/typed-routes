# Typed Route Generator for Frontend Frameworks

Typed Routes provides a route generation tool for Frontend meta frameworks that use file-based routing projects, such as SvelteKit or NextJS. It simplifies the process of creating typed route structures by automatically converting file system-based routing into a JavaScript object, enhancing type safety and improving developer experience.

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

### Options

Here are the available options you can use with the Typed Route Generator:

- `-r, --root-directory <string>`: Path of your routes directory.
- `-f, --framework <Framework>`: Choose the framework. Available options:
  - `SvelteKit`
  - `Nextjs`
- `-od, --output-directory <string>`: Output directory for the generated file.
- `-of, --output-file-name <string>`: Name for the generated routes file.
- `-fn, --function-name <name>`: Customize the function name used in the route object.
- `-m, --module-system <ModuleSystem>`: Select the module system. Available options:
  - `es6`
  - `commonjs`
- `-v, --verbose <boolean>`: Enable verbose logging

### Options

| Option                          | Description                                            | Required | Default     | Possible Values         |
|---------------------------------|--------------------------------------------------------|----------|-------------|-------------------------|
| `-r, --root-directory <string>` | Path of your routes directory.                         | **Yes**  | None        | Any valid path          |
| `-f, --framework <Framework>`   | Choose the framework.                                  | **Yes**  | None        | `SvelteKit`, `Nextjs`   |
| `-od, --output-directory <string>` | Output directory for the generated file.            | No       | Current dir | Any valid path          |
| `-of, --output-file-name <string>` | Name for the generated routes file.                | No       | `routes.js` | Any valid file name     |
| `-fn, --function-name <name>`   | Customize the function name used in the route object.  | No       | `getRoute`  | Any valid function name |
| `-m, --module-system <ModuleSystem>` | Select the module system.                         | No       | `es6`       | `es6`, `commonjs`       |
| `-v, --verbose <boolean>`       | Enable verbose logging.                                | No       | `false`     | `true`, `false`         |

### CLI Usage

To use this tool via the command line, you can run it directly with npx:

```bash
npx @dabrowskif/typed-routes -fr SvelteKit -r src/routes
```

Alternatively, if you have installed it as a dependency in your project, you can add a script to your `package.json`:

```
scripts": {
    ...
    "generate-typesafe-routes": "typed-routes -f SvelteKit -r src/routes"
    ...
}
```

Then, you can generate routes runnint this script:

```bash
npm run generate-routes
```

For a more integrated development experience, consider running this script concurrently with your framework's development server. Tools like `nodemon` or `concurrently` can be used to run multiple npm scripts simultaneously.

#### Example with nodemon

(keep in mind you have to have nodemon installed)

```
scripts": {
    ...
    "generate-typesafe-routes": "typed-routes -f SvelteKit -r src/routes",
    "generate-typesafe-routes:watch": "nodemon --exec npm run generate-typesafe-routes --watch src/routes"
    ...
}
```

## TODO

The following features are planned:

1. **More Frameworks Support**

2. **Type-Only Route Definitions**

   - Evolve the current route functions to support type-only definitions that adds minimal runtime overhead.
     - Simple functions with typed parameters for general use.
     - Framework-specific enhancements, such as type-safe wrappers for SvelteKit's goto function or Next.js's config hook

3. **SvelteKit Segments Enhancement**

   - Incorporate support for SvelteKit's advanced routing features, including segment sorting and parameter encoding. This will align the Typed Route Generator with SvelteKit's latest routing capabilities, allowing for more sophisticated route structures.

4. **Custom Strategy Provider**

   - Implement functionality to allow defining custom strategies for route generation. This feature aims to provide greater flexibility and adaptability to specific project requirements.

5. **Support for object-based arguments, instead of multiple arguments inside one function**

   - Passing many arguments into heavily nested dynamic routes one by one is more or less an anti-pattern, so creating an option to make getter function a one-argument based with multiple properties is a good alternative.

6. **Support for passing a query string**
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

Looking ahead, I have plans to also develop a type-only version of. This implementation will focus on creating TypeScript types instead of runtime objects. The key advantage of this approach is the elimination of runtime overhead, as the route definitions will purely be type annotations without any impact on the runtime bundle size.

This type-only implementation will be particularly beneficial for projects where bundle size is a critical concern and where the primary goal is to leverage TypeScript's type-checking capabilities without adding extra runtime code.

## Contributing

Contributions are welcome! If you have a suggestion or enhancement, feel free to fork the repo and create a pull request, or open an issue with the tag "enhancement".

## License

This project is licensed under the MIT License.
