import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import gj from './gj'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/sweepline-intersections/debug/dist/',
    plugins: [
        vue(), gj()
    ]
})
