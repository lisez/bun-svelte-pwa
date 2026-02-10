import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/svelte'
import Counter from './Counter.svelte'

describe('Counter Component (Unit Tests)', () => {
  it('renders with initial count of 0', () => {
    render(Counter)
    const button = screen.getByRole('button')
    expect(button).toHaveTextContent('count is 0')
  })

  it('increments count when clicked', async () => {
    render(Counter)
    const button = screen.getByRole('button')
    
    expect(button).toHaveTextContent('count is 0')
    
    await fireEvent.click(button)
    expect(button).toHaveTextContent('count is 1')
    
    await fireEvent.click(button)
    expect(button).toHaveTextContent('count is 2')
  })

  it('increments count multiple times', async () => {
    render(Counter)
    const button = screen.getByRole('button')
    
    for (let i = 0; i < 5; i++) {
      await fireEvent.click(button)
    }
    
    expect(button).toHaveTextContent('count is 5')
  })
})
