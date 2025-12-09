export default function formatDate(dateInput: any): string {
  
  return Intl.DateTimeFormat
    ('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    })
    .format(new Date(dateInput));
};