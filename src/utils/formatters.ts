export const formatINR = (value: number): string =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)

export const formatHolding = (value: number): string => {
  const formatted = value.toFixed(8)
  return formatted.replace(/\.0+$|(?<=\.[0-9]*[1-9])0+$/g, '')
}

export const gainColor = (value: number): string => {
  if (value > 0) return 'text-green-500'
  if (value < 0) return 'text-red-500'
  return 'text-gray-400'
}
