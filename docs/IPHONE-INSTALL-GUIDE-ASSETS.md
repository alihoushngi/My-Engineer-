# Optional iPhone Install Guide Screenshots

The `/install/iphone` page ships with original simplified diagrams and has no
external screenshot dependency. Real screenshots may improve familiarity after
the production origin and final iOS version are available.

Capture on a recent 390×844-point iPhone in portrait. Export WebP at approximately
780×1688 pixels (2×), remove personal tabs/history/notifications, keep the system
language consistent across the set, and crop to the full phone viewport. Do not
add device frames; the page supplies its own visual container.

| File                                                    | What must be visible                                           | Highlight/crop guidance                                                              |
| ------------------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `public/images/install/iphone/step-01-safari.webp`      | Mohandes Man loaded in Safari with the address/toolbar context | Keep the Safari chrome and site header; subtly highlight the browser identity        |
| `public/images/install/iphone/step-02-share.webp`       | Safari toolbar with the Share control                          | Keep enough page context; highlight only the Share icon                              |
| `public/images/install/iphone/step-03-add-to-home.webp` | Share sheet with **Add to Home Screen** visible                | Crop out unrelated personal share targets; highlight the complete option row         |
| `public/images/install/iphone/step-04-confirm.webp`     | Add-to-Home preview with app icon/name and **Add**             | Keep icon, editable name, and top Add control; highlight Add                         |
| `public/images/install/iphone/step-05-home-screen.webp` | Final Mohandes Man icon on Home Screen                         | Use a clean test Home Screen; highlight only the app icon and avoid personal widgets |

If these assets are added, preserve the existing diagrams as fallbacks and provide
meaningful Persian alt text. Re-capture when iOS materially changes the Share sheet
or Add to Home Screen flow.
