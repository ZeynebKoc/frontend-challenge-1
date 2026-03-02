import { describe, it, expect } from 'vitest'
import { useColorMap } from '~/composables/useColorMap'

describe('useColorMap', () => {
  const { getColorLevel } = useColorMap()

  it('returns 0 for zero dataCount', () => {
    expect(getColorLevel(0, 0, 100)).toBe(0)
  })

  it('returns middle level when min equals max', () => {
    expect(getColorLevel(50, 50, 50)).toBe(4)
  })

  it('returns level 1 for minimum value', () => {
    expect(getColorLevel(0, 0, 100)).toBe(0)
  })

  it('returns level 8 for maximum value', () => {
    expect(getColorLevel(100, 0, 100)).toBe(8)
  })
})