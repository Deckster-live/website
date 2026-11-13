export const PHONE_NUMBER = "+91 96503 61888";
export const PHONE_HREF = "tel:+919650361888";

export const EMAIL_ADDRESS = "hello@deckster.live";
export const EMAIL_HREF = "mailto:hello@deckster.live";

export const WHATSAPP_HREF = "https://wa.me/919650361888";

/** Registered office of Talk Native Marketing Private Limited (Deckster's parent). */
export const LEGAL_NAME = "Talk Native Marketing Private Limited";
export const ADDRESS = {
  street: "P3C121, Princeton Estate, DLF City Phase V",
  locality: "Gurugram",
  region: "Haryana",
  postalCode: "122002",
  country: "IN",
} as const;
export const ADDRESS_LINE = `${ADDRESS.street}, ${ADDRESS.locality}, ${ADDRESS.region} ${ADDRESS.postalCode}`;
