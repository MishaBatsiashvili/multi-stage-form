export const POST_CODE_REGEX_MAP = {
  gb: /^([A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}|GIR ?0A{2})$/, // UK
  no: /^([0-9]{4})$/, // Norway
  au: /^([0-9]{4})$/, // Australia
  nz: /^([0-9]{4})$/, // New Zealand
  es: /^([0-9]{5})$/, // Spain
  gi: /^([0-9a-zA-Z\- ]{1,23})$/, // Gibraltar
  us: /^[0-9]{5}(?:-[0-9]{4})?$/, // USA
  ca: /^[A-Z0-9]{3}([ -]{0,1}[A-Z0-9]{3})?$/, // Canada
  ie: /^([A-Z][0-9]{2}|D6W)([ -][0-9A-Z]{4})?$/, // Ireland
  cy: /^([0-9]{4})$/, // Cyprus
  nl: /^[1-9][0-9]{3}\s?[A-Z]{2}$/, // Netherlands
  fr: /^([0-9]{5})$/, // France
};