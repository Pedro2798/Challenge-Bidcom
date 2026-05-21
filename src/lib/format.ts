const priceFormatter = new Intl.NumberFormat("es-AR", {
  style: "decimal",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatPrice(price: number): string {
  return `$${priceFormatter.format(price)}`;
}
