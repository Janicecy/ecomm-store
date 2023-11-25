export function formatCurrency(amount) {
  const currencyFormatter = new Intl.NumberFormat(
    'en-US',
    {
      style: 'currency',
      currency: 'USD',
    },
  );
  return currencyFormatter.format(amount)
}