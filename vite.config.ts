import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import checker from 'vite-plugin-checker';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
	plugins: [vue(), checker({typescript: true})],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src")
		}
	},
	test: {
		environment: "jsdom",
		globals: true,
		coverage: {
			provider: "v8",
			reporter: ["text", "html"]
		}
	}
})
