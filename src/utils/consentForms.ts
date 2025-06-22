
// Mapping of treatment categories/names to consent form URLs
export const CONSENT_FORM_MAPPING = {
  // Skin treatments - general skin consent form
  'facial': 'https://forms.gle/VCjJYxR8bfPRqMcP8',
  'skin': 'https://forms.gle/VCjJYxR8bfPRqMcP8',
  'chemical peel': 'https://forms.gle/VCjJYxR8bfPRqMcP8',
  'microneedling': 'https://forms.gle/VCjJYxR8bfPRqMcP8',
  
  // Laser hair removal
  'laser hair removal': 'https://docs.google.com/forms/d/156975FgE83Ej2Q6NSAohg5kiKC5Ze64HC1fBeyOgYVY/edit',
  'laser': 'https://docs.google.com/forms/d/156975FgE83Ej2Q6NSAohg5kiKC5Ze64HC1fBeyOgYVY/edit',
  
  // Cryolipolysis (fat freezing)
  'cryolipolysis': 'https://docs.google.com/forms/d/13xEhxFcSjHG8y_HLdsLCHltOnPIuqAw8shAy4-r8ON4/edit',
  'fat freezing': 'https://docs.google.com/forms/d/13xEhxFcSjHG8y_HLdsLCHltOnPIuqAw8shAy4-r8ON4/edit',
  'coolsculpting': 'https://docs.google.com/forms/d/13xEhxFcSjHG8y_HLdsLCHltOnPIuqAw8shAy4-r8ON4/edit',
  
  // HIFU
  'hifu': 'https://docs.google.com/forms/d/1_eQ0FE_9hf2fssq46O0QCJvvuieeHMCT02aHfeGygME/edit',
  'ultrasound': 'https://docs.google.com/forms/d/1_eQ0FE_9hf2fssq46O0QCJvvuieeHMCT02aHfeGygME/edit',
};

export function getConsentFormUrl(treatmentName: string, treatmentCategory?: string): string | null {
  const searchTerms = [
    treatmentName.toLowerCase(),
    treatmentCategory?.toLowerCase() || ''
  ];

  // Check for exact matches first
  for (const term of searchTerms) {
    if (CONSENT_FORM_MAPPING[term as keyof typeof CONSENT_FORM_MAPPING]) {
      return CONSENT_FORM_MAPPING[term as keyof typeof CONSENT_FORM_MAPPING];
    }
  }

  // Check for partial matches
  for (const [key, url] of Object.entries(CONSENT_FORM_MAPPING)) {
    for (const term of searchTerms) {
      if (term.includes(key) || key.includes(term)) {
        return url;
      }
    }
  }

  // Default to skin treatment form if no match found
  return CONSENT_FORM_MAPPING['skin'];
}
