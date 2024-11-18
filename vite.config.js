import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [   svgr({
    svgrOptions: { exportType: 'named', ref: true, svgo: false, titleProp: true },
    include: '**/*.svg',
  }), react()],
  base: "/ThreadAndThrottle",
  
  server: {
    host: '127.0.0.1',  // Set the host to 127.0.0.1
    port: 5173,         // Set the port to 5173
  },
})
