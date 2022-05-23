import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
// @ts-ignore
import svgrPlugin from "vite-plugin-svgr";

export default defineConfig({
    build: {
        outDir: "build",
    },
    plugins: [
        react(),
        tsconfigPaths(),
        svgrPlugin({
            svgrOptions: {
                icon: true,
            },
        }),
    ],
});
