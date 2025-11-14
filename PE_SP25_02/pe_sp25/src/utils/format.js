export function formatDateIsoToLocal(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleString();
}

// Format as dd/MM/yyyy hh:mm:ss AM/PM
export function formatDateForAssignment(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  const pad = n => String(n).padStart(2, '0');
  const day = pad(d.getDate());
  const month = pad(d.getMonth() + 1);
  const year = d.getFullYear();

  let hours = d.getHours();
  const minutes = pad(d.getMinutes());
  const seconds = pad(d.getSeconds());
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  if (hours === 0) hours = 12;
  const hh = pad(hours);

  return `${day}/${month}/${year} ${hh}:${minutes}:${seconds} ${ampm}`;
}
