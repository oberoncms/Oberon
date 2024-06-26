// @ts-check
// vite.config.js
import { writeFile, mkdir } from "fs/promises"
import { exec } from "child_process"
import { createLogger, defineConfig, type Plugin as VitePlugin } from "vite"
import preserveDirectives from "rollup-preserve-directives"
import fg from "fast-glob"
import { externalizeDeps } from "vite-plugin-externalize-deps"

function dts(): VitePlugin {
  return {
    name: "dts-generator",
    enforce: "pre" as const,
    buildEnd: (error?: Error) => {
      if (!error) {
        return new Promise((resolve, _reject) => {
          exec(
            "tsc --noEmit false --emitDeclarationOnly true --declaration true --declarationMap true --pretty",
            (_error, stdout, stderr) => {
              if (stdout) {
                console.log(stdout)
              }
              if (stderr) {
                console.error(stderr)
              }
              // Swallow errors
              return resolve()
            },
          )
        })
      }
    },
  }
}

// Tells turbo in dev mode that the first build has finished
function watchFile(): VitePlugin {
  return {
    name: "watch-version",
    enforce: "post" as const,
    closeBundle: {
      order: "post" as const,
      async handler() {
        await mkdir("./dist", { recursive: true })
        await writeFile("./dist/version", `0.0.0`)
      },
    },
  }
}

function parseEntryPoints(entryPoints: string[] = ["src/*.ts"]) {
  // Searches for files that match the patterns defined in the array of input points.
  // Returns an array of absolute file paths.
  const files = fg.sync(entryPoints, { absolute: true })

  // Maps the file paths in the "files" array to an array of key-value pair.
  const entities = files.map((file) => {
    // Extract the part of the file path after the "src" folder and before the file extension.
    const [key] = file.match(/(?<=src\/).*$/) || []

    // Remove the file extension from the key.
    const keyWithoutExt = key?.substring(0, key.lastIndexOf(".")) || key

    return [keyWithoutExt, file]
  })

  // Convert the array of key-value pairs to an object using the Object.fromEntries() method.
  // Returns an object where each key is the file name without the extension and the value is the absolute file path.
  return Object.fromEntries(entities)
}

export function initConfig(entryPoints: string[] = ["src/*.ts", "src/*.tsx"]) {
  const logger = createLogger()

  return defineConfig({
    logLevel: "info",
    customLogger: {
      ...logger,
      info: (msg, options) => {
        // Clean gzip output
        if (msg.includes("dist/") && msg.includes(" gzip: ")) {
          return
        }
        logger.info(msg, options)
      },
    },
    plugins: [
      externalizeDeps(),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error
      // @ts-ignore sometimes fails so can't use expect error
      preserveDirectives(),
      dts(),
      watchFile(),
    ],
    build: {
      minify: false,
      lib: {
        entry: parseEntryPoints(entryPoints),
        name: "MyLib",
        formats: ["es"],
      },
      emptyOutDir: false,
      rollupOptions: {
        output: {
          preserveModules: true,
          preserveModulesRoot: "src",
        },
      },
    },
  })
}
