/**
 * Shared utilities for the Bun Svelte PWA monorepo
 */

/**
 * Format a date to a readable string
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

/**
 * Generate a random ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15)
}

/**
 * Delay execution for a specified time
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Check if code is running in a browser environment
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined'
}

/**
 * Get environment name
 */
export function getEnvironment(): 'development' | 'production' | 'test' {
  // Check if running in Node.js environment
  const hasProcess = typeof globalThis !== 'undefined' && 
                     'process' in globalThis && 
                     globalThis.process !== null &&
                     typeof globalThis.process === 'object' &&
                     'env' in globalThis.process;
  
  if (hasProcess) {
    const env = (globalThis.process as { env?: { NODE_ENV?: string } }).env?.NODE_ENV;
    if (env === 'development' || env === 'production' || env === 'test') {
      return env;
    }
  }
  return 'development'
}
