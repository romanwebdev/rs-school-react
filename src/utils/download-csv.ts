export function downloadCSV<T extends object>(
  selectedItems: T[],
  entityType: string
): void {
  if (!selectedItems.length) return;

  const headers = Object.keys(selectedItems[0]);
  const csvRows = [
    headers.join(','),
    ...selectedItems.map((item) =>
      headers.map((h) => JSON.stringify(item[h as keyof T] ?? '')).join(',')
    ),
  ];
  const csvString = csvRows.join('\n');

  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const fileName = `${selectedItems.length}_${entityType}.csv`;
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = fileName;
  link.click();
}
