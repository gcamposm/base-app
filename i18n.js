const NextI18Next = require('next-i18next/dist/commonjs').default;

// TODO: otherLanguages must be 'en' when translation is active

module.exports = new NextI18Next({
  defaultLanguage: 'es',
  otherLanguages: ['es']
});
