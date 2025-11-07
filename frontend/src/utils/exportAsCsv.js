export const exportAsCsv = (data) => {
  if (!data.length) return;

  const headers = Object.keys(data[0]);
  const rows = data.map(obj =>
    headers.map(header => JSON.stringify(obj[header] ?? "")).join(",")
  );

  const csvContent = [headers.join(","), ...rows].join("\n");

  // ✅ Add UTF-8 BOM for Arabic / special characters
  const BOM = "\uFEFF";
  const blob = new Blob([BOM + csvContent], { type: "text/csv;charset=utf-8;" });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "data.csv";
  a.click();

  URL.revokeObjectURL(url);
};
