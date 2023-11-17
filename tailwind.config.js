/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */

export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
