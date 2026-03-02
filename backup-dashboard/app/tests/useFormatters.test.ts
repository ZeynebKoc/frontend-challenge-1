import { describe, it, expect } from 'vitest'
import { useFormatters } from '~/composables/useFormatters'

describe('useFormatters', () => {
  const { formatSize, formatCount } = useFormatters()

  describe('formatSize', () => {
    it('formats bytes correctly', () => {
      expect(formatSize(500)).toBe('500 B')
    })

    it('formats kilobytes correctly', () => {
      expect(formatSize(2048)).toBe('2 KB')
    })

    it('formats megabytes correctly', () => {
      expect(formatSize(1_048_576)).toBe('1.00 MB')
    })
  })

  describe('formatCount', () => {
    it('returns raw number for small values', () => {
      expect(formatCount(500)).toBe('500')
    })

    it('abbreviates thousands', () => {
      expect(formatCount(1500)).toBe('1.5K')
    })

    it('abbreviates millions', () => {
      expect(formatCount(2_000_000)).toBe('2.0M')
    })
  })
})