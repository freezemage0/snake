import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/history.ts'],
          theme: {
    container: {
      padding: '2rem',
              center: true
    },
    fontFamily: {
      'body': ['Open Sans']
    },
    extend: {},
  },
  plugins: [],
} satisfies Config

