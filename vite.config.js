import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({

    plugins: [

        react(),

        VitePWA({

            registerType: "autoUpdate",

            includeAssets: [
                "favicon.ico",
                "apple-touch-icon.png",
                "masked-icon.svg"
            ],

            manifest: {

                name: "KJI Attendance",

                short_name: "KJI",

                description: "Aplikasi Absensi PT KJI",

                theme_color: "#d32f2f",

                background_color: "#ffffff",

                display: "standalone",

                orientation: "portrait",

                scope: "/",

                start_url: "/",

                icons: [

                    {
                        src: "pwa-192x192.png",
                        sizes: "192x192",
                        type: "image/png"
                    },

                    {
                        src: "pwa-512x512.png",
                        sizes: "512x512",
                        type: "image/png"
                    },

                    {
                        src: "pwa-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "any maskable"
                    }

                ]

            }

        })

    ]

});