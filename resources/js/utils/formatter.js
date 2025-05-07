export const formatPrice = (number) => {
  const price = parseFloat(number) || 0

  if (isNaN(price) || price <= 0) return '0'

  return new Intl.NumberFormat('id-ID', {
    style: 'decimal',
    maximumFractionDigits: 0
  }).format(price)
}

export const formatDate = (type, date) => {
  if (!date) return ''

  if (type === 'to-local') {
    const [year, month, day] = date.split('-')
    return `${day}-${month}-${year}`
  } else if (type === 'to-iso') {
    const [day, month, year] = date.split('-')

    return `${year}-${month}-${day}`
  }
}
