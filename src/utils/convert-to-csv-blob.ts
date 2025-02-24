export function convertToCsvBlob<T extends object>(selectedItems: T[]): Blob {
  const headers = Object.keys(selectedItems[0]);
  const csvRows = [
    headers.join(','),
    ...selectedItems.map((item) =>
      headers.map((h) => JSON.stringify(item[h as keyof T] ?? '')).join(',')
    ),
  ];
  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });

  return blob;
}
