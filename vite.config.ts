import {defineConfig} from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import tsconfigPaths from 'vite-tsconfig-paths'
// @ts-ignore
import svgrPlugin from 'vite-plugin-svgr'

export default defineConfig({
    build: {
        outDir: 'build',
    },
    plugins: [
        reactRefresh(),
        tsconfigPaths(),
        svgrPlugin({
            svgrOptions: {
                icon: true,
            },
        }),
    ],
})