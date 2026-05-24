export const WHATSAPP_NUMERO = "5598987207175"; // (98) 98720-7175
export const INSTAGRAM_HANDLE = "decoturismobhs";
export const INSTAGRAM_URL = `https://instagram.com/${INSTAGRAM_HANDLE}`;
export const FACEBOOK_URL = "https://facebook.com/"; // atualize quando tiver a página

export function whatsappLink(mensagem: string): string {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`;
}