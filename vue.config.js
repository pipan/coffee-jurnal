module.exports = {
    pwa: {
        manifestPath: 'site.webmanifest',
        name: "Coffee Journal",
        themeColor: "#f0ad2b",
        msTileColor: "#f0ad2b",
        manifestOptions: {
            display: "standalone",
            background_color: "#f0ad2b",
            start_url: "/",
            shortcuts: [
                {
                    name: "New",
                    url: "/create",
                    icons: [
                        {
                            src: "/img/icons/add_x96.png?v=2",
                            sizes: "96x96",
                            type: "image/png"
                        }
                    ]
                }
            ],
            icons: [
                {
                    src: "/img/icons/favicon-16x16.png?v=1",
                    sizes: "16x16",
                    type: "image/png"
                },
                {
                    src: "/img/icons/favicon-32x32.png?v=1",
                    sizes: "32x32",
                    type: "image/png"
                },
                {
                    src: "/img/icons/maskable_icon_x48.png?v=1",
                    sizes: "48x48",
                    type: "image/png",
                    purpose: "maskable"
                },
                {
                    src: "/img/icons/maskable_icon_x72.png?v=1",
                    sizes: "72x72",
                    type: "image/png",
                    purpose: "maskable"
                },
                {
                    src: "/img/icons/maskable_icon_x96.png?v=1",
                    sizes: "96x96",
                    type: "image/png",
                    purpose: "maskable"
                },
                {
                    src: "/img/icons/maskable_icon_x144.png?v=1",
                    sizes: "144x144",
                    type: "image/png",
                    purpose: "maskable"
                },
                {
                    src: "/img/icons/maskable_icon_x192.png?v=1",
                    sizes: "192x192",
                    type: "image/png",
                    purpose: "maskable"
                },
                {
                    src: "/img/icons/maskable_icon_x384.png?v=1",
                    sizes: "384x384",
                    type: "image/png",
                    purpose: "maskable"
                },
                {
                    src: "/img/icons/maskable_icon_x512.png?v=1",
                    sizes: "512x512",
                    type: "image/png",
                    purpose: "maskable"
                },
                {
                    src: "/img/icons/icon_x512.png?v=1",
                    sizes: "512x512",
                    type: "image/png",
                    purpose: "any"
                }
            ]
        },
        iconPaths: {
            faviconSVG: null,
            favicon32: null,
            favicon16: null,
            appleTouchIcon: null,
            maskIcon: null,
            msTileImage: null
          }
          
    }
}