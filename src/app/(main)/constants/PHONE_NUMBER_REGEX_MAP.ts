export const PHONE_NUMBER_REGEX_MAP = {
  gb: /^(((\+44\d{4}|0\d{4})\d{3}\d{3})|((\+44\d{3}|0\d{3})\d{3}\d{4})|((\+44\d{2}|0\d{2})\d{4}\d{4}))(\#(\d{4}|\d{3}))?$/, // UK
  no: /^(\+47\d{8})$/, // Norway
  au: /^(\+61(2|4|3|7|8)\d{8})$/, // Australia
  nz: /^(\+64\d{8,12})$/, // New Zealand
  es: /^\+34[6-9][0-9]{8}$/, // Spain
  gi: /^(\+\d{1,3}\d{7,20})$/, // Gibraltar
  us: /^(((\+1\d{3}\d{3})\d{4}))?$/, // USA
  ca: /^(((\+1\d{3}\d{3})\d{4}))?$/, // Canada
  ie: /^(\+353)([124-9]\d{0,2})\d{7}$/, // Ireland
  cy: /^(\+357)([2-9][0-9]\d{6,7})$/, // Cyprus
  nl: /^(\+31)([0-9]{9})$/, // Netherlands
  fr: /^\+33[1-9][0-9]{8}$/, // France
}
