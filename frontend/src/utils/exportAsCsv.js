export const exportAsCsv = (data) => {
  if (!data.length) return;

  const headers = Object.keys(data[0]);

  const rows = data.map(obj =>
    headers.map(header => {
      const value = obj[header] ?? "";

      // If value looks like long number (phone etc)
      if (typeof value === "number" || /^\+?\d{8,}$/.test(value)) {
        return `="${value}"`; // Force Excel to treat as text
      }

      return JSON.stringify(value);
    }).join(",")
  );

  const csvContent = [headers.join(","), ...rows].join("\n");

  const BOM = "\uFEFF";
  const blob = new Blob([BOM + csvContent], { type: "text/csv;charset=utf-8;" });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "data.csv";
  a.click();

  URL.revokeObjectURL(url);
};