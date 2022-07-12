import {defineConfig, splitVendorChunkPlugin} from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import svgrPlugin from "vite-plugin-svgr";

import {dependencies} from "./package.json";

const renderChunks = (deps: Record<string, string>) => {
    const chunks: Record<string, string[]> = {};
    Object.keys(deps).forEach(key => {
        if (["react", "react-router-dom", "react-dom"].includes(key)) return;
        chunks[key] = [key];
    });
    return chunks;
};

export default defineConfig({
    build: {
        outDir: "build",
        sourcemap: false,
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ["react", "react-router-dom", "react-dom"],
                    ...renderChunks(dependencies),
                },
            },
        },
    },
    plugins: [
        react(),
        tsconfigPaths(),
        svgrPlugin({
            svgrOptions: {
                icon: true,
            },
        }),
        splitVendorChunkPlugin(),
    ],
    server: {
        host: true,
        port: 3000,
    },
    preview: {
        port: 3000,
    },
});
