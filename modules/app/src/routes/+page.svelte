<script lang="ts">
  import svelteLogo from '$lib/assets/svelte.svg'
  import bunLogo from '$lib/assets/bun.svg'
  import Counter from '$lib/Counter.svelte'
  import { formatDate, getEnvironment } from '@bun-svelte-pwa/shared'
  import { getContext } from 'svelte'

  interface PWAContext {
    isPWAInstallable: boolean
    installPWA: () => Promise<void>
  }

  const pwa = getContext<PWAContext>('pwa')
  
  const currentDate = formatDate(new Date())
  const environment = getEnvironment()
</script>

<main class="max-w-5xl mx-auto px-8 py-16 text-center">
  <div class="flex justify-center gap-8 mb-8">
    <a href="https://bun.sh" target="_blank" rel="noreferrer" class="transition-transform hover:scale-110">
      <img src={bunLogo} class="h-24 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#fbf0dfaa]" alt="Bun Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer" class="transition-transform hover:scale-110">
      <img src={svelteLogo} class="h-24 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#ff3e00aa]" alt="Svelte Logo" />
    </a>
  </div>
  
  <h1 class="text-5xl font-bold leading-tight mb-2">Bun + Svelte PWA</h1>
  <p class="text-xl text-gray-400 mb-2">TypeScript Monorepo Template</p>
  <p class="text-sm text-gray-500 mb-8">Environment: {environment} | {currentDate}</p>

  <div class="py-8">
    <Counter />
  </div>

  {#if pwa.isPWAInstallable}
    <div class="my-8">
      <button 
        onclick={pwa.installPWA}
        class="text-lg px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-500 rounded-lg text-white cursor-pointer transition-transform hover:scale-105 border-none"
      >
        📱 Install as App
      </button>
    </div>
  {/if}

  <p class="text-gray-400 mt-8">
    Click on the Bun and Svelte logos to learn more
  </p>
</main>
