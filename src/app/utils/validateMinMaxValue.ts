export const validateMinMaxValue = (
  value: any,
  min: number | any,
  max: number | any,
): number | undefined => {
  if (typeof value === 'string' && !value.trim()) {
    return undefined // Return undefined for empty strings
  }

  const parsedValue = parseFloat(value)

  // Ensure parsedValue is a number
  if (isNaN(parsedValue)) {
    return undefined
  }

  // Ensure min and max are numbers
  const parsedMin = parseFloat(min)
  const parsedMax = parseFloat(max)

  if (isNaN(parsedMin) || isNaN(parsedMax)) {
    return parsedValue // Return the parsed value if min or max are not valid numbers
  }

  // Return the clamped value between min and max
  return Math.max(parsedMin, Math.min(parsedMax, parsedValue))
}
