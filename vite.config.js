import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import jsconfigPaths from "vite-jsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), jsconfigPaths],
  server: {
    port: 5000,
  },
  resolve: {
    alias: {
      "@pages": ["/src/pages"],
      "@components": ["/src/components"],
      "@routes": ["src/routes"],
      "@services": ["/src/services"],
      "@helpers": ["/src/helpers"],
      "@utils": ["/src/utils"],
      "@hooks": ["/src/hooks"],
      "@": ["/src"],
    },
  },
});
