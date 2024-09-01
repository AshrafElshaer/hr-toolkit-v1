export function formatCurrency(amount: string, currency = "USD") {
  return `$${amount.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}
