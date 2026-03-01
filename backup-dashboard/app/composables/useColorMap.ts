export function useColorMap() {
  // index 0 = no data, 1-8 = low to high density
  const colorLevels: string[] = [
    'transparent',
    '#064e3b',
    '#065f46',
    '#047857',
    '#059669',
    '#10b981',
    '#34d399',
    '#6ee7b7',
    '#a7f3d0',
  ]

  function getColorLevel(
    dataCount: number,
    minDataCount: number,
    maxDataCount: number
  ): number {
    if (dataCount === 0) return 0
    if (minDataCount === maxDataCount) return 4

    const normalized = (dataCount - minDataCount) / (maxDataCount - minDataCount)
    return Math.ceil(normalized * 7) + 1
  }

  function getColor(
    dataCount: number,
    minDataCount: number,
    maxDataCount: number
  ): string {
    const level = getColorLevel(dataCount, minDataCount, maxDataCount)
    return colorLevels[level] ?? 'transparent'
  }

  return { colorLevels, getColorLevel, getColor }
}