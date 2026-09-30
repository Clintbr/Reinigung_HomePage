/**
 * EmailJS Konfiguration
 * 
 * Liest die Secrets ausschließlich über import.meta.env aus.
 */

export const EMAILJS_CONFIG = {
    PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
    SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
    TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || ''
};

// Initialisiere EmailJS SDK falls vorhanden
if (typeof emailjs !== 'undefined' && EMAILJS_CONFIG.PUBLIC_KEY) {
    emailjs.init({
        publicKey: EMAILJS_CONFIG.PUBLIC_KEY
    });
}
