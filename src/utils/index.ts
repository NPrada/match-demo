export const formatDate = (d: Date) => d.toISOString().split("T")[0]!;

export const formatNumber = (num: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })
    .format(num)
    .replace("$", "") + " USD";
