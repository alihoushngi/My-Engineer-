# PWA Icon Asset Plan

The repository already contains production-sized PWA icons derived from the
existing Mohandes Man brand mark. This document is the replacement contract if a
future final brand master is supplied.

| File             | Exact path                           | Dimensions | Transparency/background                        |
| ---------------- | ------------------------------------ | ---------: | ---------------------------------------------- |
| Standard icon    | `public/icons/icon-192.png`          |    192×192 | RGBA allowed; Navy background recommended      |
| Standard icon    | `public/icons/icon-512.png`          |    512×512 | RGBA allowed; Navy background recommended      |
| Maskable icon    | `public/icons/icon-maskable-192.png` |    192×192 | Opaque Navy edge-to-edge background            |
| Maskable icon    | `public/icons/icon-maskable-512.png` |    512×512 | Opaque Navy edge-to-edge background            |
| Apple touch icon | `public/icons/apple-touch-icon.png`  |    180×180 | Opaque background; do not rely on transparency |

Editable source references are `public/icons/icon-source.svg` and
`public/icons/icon-maskable-source.svg`. Export PNGs in sRGB without stretching or
changing the mark’s aspect ratio.

For standard icons, retain comfortable optical padding and avoid placing critical
details near the rounded corners. For maskable icons, use an edge-to-edge brand
Navy (`#24313E`) background and keep the complete logo inside the central safe
zone (a circle approximately 80% of the canvas diameter); the current source uses
additional padding. Do not bake rounded corners into maskable exports.

Before replacing assets, test circular, rounded-square, and squircle masks in
Chrome DevTools. Keep filenames unchanged because the manifest and root metadata
already reference these exact paths.
