const { compile } = require('svelte/compiler');

const source = `
<script lang="ts">
  let count: number = 0
  const increment = () => {
    count += 1
  }
</script>

<button on:click={increment}>
  count is {count}
</button>
`;

const result = compile(source, {
  filename: 'Counter.svelte',
  generate: 'dom',
  hydratable: false,
  css: 'injected',
});

console.log('First 1000 characters of compiled output:');
console.log(result.js.code.substring(0, 1000));
console.log('\n...\n');
console.log('Lines containing imports or export:');
const lines = result.js.code.split('\n');
lines.forEach((line, i) => {
  if (line.includes('import') || line.includes('export')) {
    console.log(`Line ${i+1}: ${line}`);
  }
});
