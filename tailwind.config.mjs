/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@uploadthing/react/dist/**",
  ],
  theme: {
    extend: {
      colors: {
        honey: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f5b800",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
          950: "#451a03",
        },
        hive: {
          50: "#fafaf7",
          100: "#f2f1ea",
          200: "#e5e3d8",
          300: "#c9c6b4",
          400: "#8a8878",
          500: "#5c5a4e",
          600: "#3d3c33",
          700: "#2a2922",
          800: "#1c1b16",
          900: "#12110d",
          950: "#0a0a07",
        },
      },
      spacing: {
        "icon-toggle": "1.2rem",
        "tab-list": "3px",
        "tab-line": "5px",
        "sheet-slide": "2.5rem",
      },
      minHeight: {
        "comment-box": "5rem",
        "post-box": "6.25rem",
      },
      width: {
        "mobile-menu": "18.75rem",
      },
      height: {
        "notification-feed": "calc(100vh - 12rem)",
        "tab-trigger": "calc(100% - 1px)",
      },
      maxWidth: {
        "dialog-mobile": "calc(100% - 2rem)",
      },
      borderRadius: {
        inherit: "inherit",
        "btn-xs": "min(var(--radius-md), 10px)",
        "btn-sm": "min(var(--radius-md), 12px)",
      },
      fontSize: {
        "2sm": "0.8rem",
      },
      transitionProperty: {
        "color-shadow": "color, box-shadow",
      },
      gridTemplateColumns: {
        "card-action": "1fr auto",
      },
      gridTemplateRows: {
        "card-description": "auto auto",
        "dialog-header": "auto 1fr",
        "dialog-header-media": "auto auto 1fr",
      },
      backgroundImage: {
        honeycomb:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23f5b800' fill-opacity='0.06'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        "honey-gradient":
          "linear-gradient(135deg, var(--honey-gradient-from), var(--honey-gradient-to))",
      },
    },
  },
  plugins: [],
};

export default config;
