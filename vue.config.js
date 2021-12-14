module.exports = {
    pwa: {
        manifestPath: 'site.webmanifest',
        name: "Coffee Journal",
        themeColor: "#f0ad2b",
        msTileColor: "#f0ad2b",
        manifestOptions: {
            display: "standalone",
            background_color: "#171117",
            start_url: "/",
            shortcuts: [
                {
                    name: "New",
                    url: "/create"
                }
            ],
            icons: [
                {
                    src: "/img/icons/favicon-16x16.png",
                    sizes: "16x16",
                    type: "image/png"
                },
                {
                    src: "/img/icons/favicon-32x32.png",
                    sizes: "32x32",
                    type: "image/png"
                },
                {
                    src: "/img/icons/maskable_icon_x48.png",
                    sizes: "48x48",
                    type: "image/png",
                    purpose: "maskable"
                },
                {
                    src: "/img/icons/maskable_icon_x72.png",
                    sizes: "72x72",
                    type: "image/png",
                    purpose: "maskable"
                },
                {
                    src: "/img/icons/maskable_icon_x96.png",
                    sizes: "96x96",
                    type: "image/png",
                    purpose: "maskable"
                },
                {
                    src: "/img/icons/maskable_icon_x144.png",
                    sizes: "144x144",
                    type: "image/png",
                    purpose: "maskable"
                },
                {
                    src: "/img/icons/icon_x144.png",
                    sizes: "144x144",
                    type: "image/png",
                    purpose: "any"
                },
                {
                    src: "/img/icons/maskable_icon_x192.png",
                    sizes: "192x192",
                    type: "image/png",
                    purpose: "maskable"
                },
                {
                    src: "/img/icons/icon_x192.png",
                    sizes: "192x192",
                    type: "image/png",
                    purpose: "any"
                },
                {
                    src: "/img/icons/icon_x256.png",
                    sizes: "256x256",
                    type: "image/png",
                    purpose: "any"
                },
                {
                    src: "/img/icons/maskable_icon_x384.png",
                    sizes: "384x384",
                    type: "image/png",
                    purpose: "maskable"
                },
                {
                    src: "/img/icons/maskable_icon_x512.png",
                    sizes: "512x512",
                    type: "image/png",
                    purpose: "maskable"
                },
                {
                    src: "/img/icons/icon_x512.png",
                    sizes: "512x512",
                    type: "image/png",
                    purpose: "any"
                }
            ]
        },
        iconPaths: null
    }
}