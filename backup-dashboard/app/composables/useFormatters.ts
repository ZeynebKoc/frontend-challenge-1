export function useFormatters() {
  // Full precision — used in tooltips and row stats
  const formatSize = (bytes: number): string => {
    if (bytes >= 1_048_576) return (bytes / 1_048_576).toFixed(2) + ' MB'
    if (bytes >= 1_024) return (bytes / 1_024).toFixed(0) + ' KB'
    return bytes + ' B'
  }

  // Compact — used in footer where space is limited
  const formatSizeShort = (bytes: number): string => {
    if (bytes >= 1_048_576) return (bytes / 1_048_576).toFixed(0) + ' MB'
    if (bytes >= 1_024) return (bytes / 1_024).toFixed(0) + ' KB'
    return bytes + ' B'
  }

  // Abbreviates large numbers: 1200 → 1.2K, 1500000 → 1.5M
  const formatCount = (n: number): string => {
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M'
    if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K'
    return n.toString()
  }

  return { formatSize, formatSizeShort, formatCount }
}