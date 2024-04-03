export default function formatDate(dateString: string) {
    const dateParts = dateString.split("T");
    const date = dateParts[0];
    return date;
  }  