/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  darkMode: false,
  content: {
    relative: true,
    files: ["./src/components/**/*.{js,ts,jsx,tsx}"]
  },  
  theme: {
    extend: {
    },
  },
  corePlugins: {
    preflight: false,
  },
  prefix: 'dateslotpicker-'
}