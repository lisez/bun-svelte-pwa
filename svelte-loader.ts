import { plugin } from 'bun';
import { compile, preprocess } from 'svelte/compiler';
import { readFileSync } from 'fs';
import sveltePreprocess from 'svelte-preprocess';

// Create preprocessor once for reuse
const preprocessor = sveltePreprocess();

plugin({
  name: 'svelte-loader',
  setup(build) {
    build.onLoad({ filter: /\.svelte$/ }, async ({ path }) => {
      try {
        const source = readFileSync(path, 'utf-8');
        
        // Preprocess TypeScript and other features
        let preprocessed;
        try {
          preprocessed = await preprocess(source, preprocessor, {
            filename: path,
          });
        } catch (error) {
          throw new Error(`Failed to preprocess Svelte component at ${path}: ${error instanceof Error ? error.message : String(error)}`);
        }
        
        // Compile the preprocessed code
        let js;
        try {
          const result = compile(preprocessed.code, {
            filename: path,
            generate: 'dom',
            hydratable: false,
            css: 'injected',
          });
          js = result.js;
        } catch (error) {
          throw new Error(`Failed to compile Svelte component at ${path}: ${error instanceof Error ? error.message : String(error)}`);
        }

        return {
          contents: js.code,
          loader: 'js',
        };
      } catch (error) {
        // Re-throw if it's already our formatted error
        if (error instanceof Error && (error.message.includes('Failed to preprocess') || error.message.includes('Failed to compile'))) {
          throw error;
        }
        // Otherwise, wrap in a generic error
        throw new Error(`Failed to process Svelte component at ${path}: ${error instanceof Error ? error.message : String(error)}`);
      }
    });
  },
});
