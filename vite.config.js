import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const manifestForPlugIn = {
	registerType: "prompt",
	includeAssests: ["favicon.ico"],
	manifest: {
		name: "Blith App",
		short_name: "blithapp",
		description: "App for Blithchron 2025",
		icons: [
			{
				src: "/android-chrome-192x192.png",
				sizes: "192x192",
				type: "image/png",
				purpose: "favicon",
			},
			{
				src: "/android-chrome-512x512.png",
				sizes: "512x512",
				type: "image/png",
				purpose: "favicon",
			},
			{
				src: "/apple-touch-icon.png",
				sizes: "180x180",
				type: "image/png",
				purpose: "apple touch icon",
			},
			{
				src: "/android-chrome-512x512.png",
				sizes: "512x512",
				type: "image/png",
				purpose: "any maskable",
			},
		],
		theme_color: "#171717",
		background_color: "#f0e7db",
		display: "standalone",
		scope: "/",
		start_url: "/",
		orientation: "portrait",
	},
};

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss(), VitePWA(manifestForPlugIn)],
	optimizeDeps: {
		include: ["firebase/app", "firebase/firestore", "firebase/auth", "firebase/analytics"],
	},
});
