/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors:{
      black:'#18181b',
      white:'#eff6ff',
      stone: {
        '50': '#f9fafb',
        '100': '#f4f5f7',
        '200': '#e5e7eb',
        '300': '#d2d6dc',
        '400': '#9fa6b2',
        '500': '#6b7280',
        '600': '#4b5563',
        '700': '#374151',
        '800': '#1f2937',
        '900': '#111827',
        '950': '#0d1016',
      },
    }
  },
  plugins: [],
}

