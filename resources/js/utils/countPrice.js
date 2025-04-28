const countPrice = (
  type,
  basePrice = 0,
  addOnPrice = 0,
  startDate = '',
  endDate = ''
) => {
  if (type === 'orders') {
    const start = new Date(startDate)
    const end = new Date(endDate)

    if (isNaN(start) || isNaN(end) || end <= start) return 0

    const differenceTime = end - start
    const differenceDays = differenceTime / (1000 * 60 * 60 * 24)

    const totalPrice = basePrice * differenceDays

    return totalPrice || 0
  } else if (type === 'rooms') {
    return basePrice + addOnPrice
  }
}

export default countPrice
