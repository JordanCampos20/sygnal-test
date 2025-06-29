export function formatDateToBR(isoDate: string): string {
  if (!isoDate) return "";

  try {
    const date = new Date(isoDate);
    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  } catch (error) {
    console.error("Erro ao formatar data para BR:", error);
    return "";
  }
}
