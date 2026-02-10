<script lang="ts">
  let count: number = 0
  const increment = () => {
    count += 1
  }
</script>

<button 
  on:click={increment}
  class="rounded-lg border border-transparent px-5 py-2.5 text-base font-medium bg-gray-800 dark:bg-gray-900 cursor-pointer transition-colors hover:border-blue-500 focus:outline-4 focus:outline-auto focus:outline-blue-500"
>
  count is {count}
</button>
