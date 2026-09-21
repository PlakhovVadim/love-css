# Love.css
## It's Love.css - framework for you!


## Fonts

Love.css ships with [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) as its default sans-serif typeface.

- **Designer:** Florian Karsten
- **License:** SIL Open Font License 1.1
- **Source:** https://fonts.google.com/specimen/Space+Grotesk
- **Location:** `assets/fonts/Space_Grotesk/`

The font is loaded via `css/love.fonts.css`. It is a variable font, so a single file covers Light (300), Regular (400), Medium (500), SemiBold (600), and Bold (700). The license text (`OFL.txt`) is included in the font directory as required by the SIL Open Font License.

To replace Space Grotesk with your own font:

1. Place the font files in `assets/fonts/<YourFont>/`.
2. Add an `@font-face` block to `css/love.fonts.css`. See the comments inside the file for the template.
3. Update `--love-font-sans` in `css/love.tokens.css` to point at your family name.

To disable Space Grotesk entirely, remove or comment out its `@font-face` blocks in `css/love.fonts.css`. The fallback stack in `love.tokens.css` (`system-ui`, `-apple-system`, `Segoe UI`, etc.) will take over automatically.
