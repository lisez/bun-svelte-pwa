const { compile } = require('svelte/compiler');

const sourceWithoutTS = `
<script>
  let count = 0
  const increment = () => {
    count += 1
  }
</script>

<button on:click={increment}>
  count is {count}
</button>
`;

const result = compile(sourceWithoutTS, {
  filename: 'Counter.svelte',
  generate: 'dom',
  hydratable: false,
  css: 'injected',
});

console.log('Compilation successful!');
console.log('First 600 characters of compiled output:');
console.log(result.js.code.substring(0, 600));
