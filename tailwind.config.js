module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#06b6d4", // cyan-400
        secondary: "#9333ea", // purple-600
      },
      dropShadow: {
        glow: "0 0 15px rgba(72, 229, 247, 0.8)",
      },
      animation: {
        'spin-dna': 'spin-dna 6s linear infinite',
      },
    },
  },
  plugins: [],
  
};

