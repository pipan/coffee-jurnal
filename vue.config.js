module.exports = {
    pwa: {
        name: "Coffee Journal",
        themeColor: "#f0ad2b",
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',
        iconPaths: {
            favicon32: 'favicon-32x32.png',
            favicon16: 'favicon-16x16.png',
            appleTouchIcon: 'apple-touch-icon.png',
            maskIcon: 'safari-pinned-tab.svg',
            msTileImage: 'mstile-150x150.png'
        },
        manifestOptions: {
            background_color: "#171117",
            start_url: "/",
            icons: [
                {
                    "src": "favicon-16x16.png",
                    "sizes": "16x16",
                    "type": "image/png"
                },
                {
                    "src": "favicon-32x32.png",
                    "sizes": "32x32",
                    "type": "image/png"
                },
                {
                    "src": "android-chrome-36x36.png",
                    "sizes": "36x36",
                    "type": "image/png"
                },
                {
                    "src": "android-chrome-48x48.png",
                    "sizes": "48x48",
                    "type": "image/png"
                },
                {
                    "src": "android-chrome-72x72.png",
                    "sizes": "72x72",
                    "type": "image/png"
                },
                {
                    "src": "android-chrome-96x96.png",
                    "sizes": "96x96",
                    "type": "image/png"
                },
                {
                    "src": "android-chrome-144x144.png",
                    "sizes": "144x144",
                    "type": "image/png"
                },
                {
                    "src": "android-chrome-192x192.png",
                    "sizes": "192x192",
                    "type": "image/png"
                },
                {
                    "src": "android-chrome-256x256.png",
                    "sizes": "256x256",
                    "type": "image/png"
                },
                {
                    "src": "android-chrome-384x384.png",
                    "sizes": "384x384",
                    "type": "image/png"
                },
                {
                    "src": "android-chrome-512x512.png",
                    "sizes": "512x512",
                    "type": "image/png"
                }
            ]
        }
    }
}