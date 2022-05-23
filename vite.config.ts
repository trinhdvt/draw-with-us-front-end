import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import compress from "vite-plugin-compress";
// @ts-ignore
import svgrPlugin from "vite-plugin-svgr";

export default defineConfig({
    build: {
        outDir: "build",
    },
    plugins: [
        react(),
        tsconfigPaths(),
        compress(),
        svgrPlugin({
            svgrOptions: {
                icon: true,
            },
        }),
    ],
});
