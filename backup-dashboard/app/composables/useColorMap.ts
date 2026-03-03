export function useColorMap() {
  // index 0 = no data, 1-8 = low to high density
  const colorLevels: string[] = [
    'transparent',
    '#eafaea',
    '#c6f6c8',
    '#9be99f',
    '#6be573',
    '#39d353',
    '#26a641',
    '#006d32',
    '#0e4429',
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