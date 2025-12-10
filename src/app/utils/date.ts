export default function formatDate(dateInput: any): string {

  const date = new Date(dateInput);
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return "Invalid date"; // or return ""
  }
  return Intl.DateTimeFormat
    ('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    })
    .format(date);
};