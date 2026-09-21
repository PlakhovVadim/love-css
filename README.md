# Love.css

A minimalist CSS framework for fast interface assembly. Design, not animations. Zero bloat, full customization through tokens.

Love.css is built for people who do not want to write CSS. You write HTML, add a few classes, and get a clean, modern interface with light and dark themes out of the box. If you need to change something, you change a token — not a component.

## Philosophy

- Zero bloat. Only the modules you install end up in your project. If there are no tables, there is no table CSS.
- Full customization through tokens. Every visual parameter is a CSS custom property. Change one token and the entire framework adapts.
- Simple animations only. Love.css provides simple CSS transitions and keyframes for states and entrance effects. Complex animations — scroll-driven, orchestrated, physics-based — are outside the scope. Use GSAP, Motion One, or write your own.
- State lives on disk. Installed modules are files in your css directory. Theme, density, and RTL are HTML attributes. No hidden config, no manifest files.

## Two ways to use Love.css

### Option 1: Installer (recommended)

Clone the love-install repository, run the installer for your OS, and use the love command to set up modules in any project.

Unix, macOS, Git Bash on Windows:

    git clone https://github.com/PlakhovVadim/love-install.git
    cd love-install
    ./install.sh

Windows PowerShell:

    git clone https://github.com/PlakhovVadim/love-install.git
    cd love-install
    .\install.ps1

After the installer finishes, restart your terminal and verify the command works:

    love version

Then, in any project directory, install a preset or individual modules:

    love install admin
    love add button
    love status
    love check

The installer copies only the CSS files you need into your project's css directory. Nothing else. No build step, no dependencies, no configuration files.

### Option 2: Direct clone

If you do not want to install the CLI, clone this repository into your project and link the CSS files you need.

    git clone https://github.com/PlakhovVadim/love-css.git vendor/love

Then add links in your HTML:

    <link rel="stylesheet" href="vendor/love/css/love.reset.css">
    <link rel="stylesheet" href="vendor/love/css/love.tokens.css">
    <link rel="stylesheet" href="vendor/love/css/love.base.css">
    <link rel="stylesheet" href="vendor/love/css/love.button.css">

Important: delete or rename vendor/love/index.html. That file is the framework's kitchen sink — a test page with every element. If you leave it as is, it may override your own index.html when you open or build the project.

## Modules

Love.css is split into modules. Each module is a single CSS file. You install only what you need.

| Module | Description | Dependencies |
|---|---|---|
| reset | Browser normalization and margin reset | — |
| tokens | CSS custom properties: primitives, semantics, components | — |
| base | Typography and base styles on bare elements | reset, tokens |
| layout | Containers, grids, and alignment primitives | reset, tokens |
| utilities | Spacing, alignment, and visibility utilities | reset, tokens |
| animations | Simple CSS animations for states and appearance | tokens |
| themes | Light, dark, and high-contrast themes | tokens |
| button | Buttons with variants, sizes, and states | tokens, base |
| card | Cards with header, body, footer, and variants | tokens, base |
| form | Form fields, labels, validation, hints, input groups | tokens, base |
| table | Tables with stripes, hover, borders, and compact mode | tokens, base |
| alert | Alerts: success, danger, warning, info, neutral | tokens, base, animations |
| badge | Badges and labels: solid, soft, outline, dots, counters | tokens, base |
| spinner | Loading spinners: sizes, colors, dots | tokens, base, animations |
| skeleton | Loading skeletons: text, titles, avatars, cards, lists | tokens, base, animations |
| modal | Modals and drawers on the native dialog element | tokens, base, animations |
| tabs | Tabs and panels: underline, filled, vertical | tokens, base |
| dropdown | Dropdown menus with optional details-based markup | tokens, base, animations |
| toast | Toast notifications with position containers | tokens, base, animations |
| pagination | Pagination with numbers, ellipsis, prev/next, sizes | tokens, base |
| breadcrumbs | Breadcrumb navigation with separator variants | tokens, base |
| tooltip | Tooltips on hover and focus, four placements | tokens, base, animations |
| accordion | Accordions on details/summary with chevron indicator | tokens, base |
| avatar | Avatars: sizes, shapes, colors, status, groups | tokens, base |
| progress | Progress bars: linear, striped, indeterminate, stacked, circular | tokens, base |
| stat | Statistic blocks with value, label, trend, icon | tokens, base |
| empty-state | Empty state placeholders with icon, title, description, actions | tokens, base, animations |
| timeline | Timeline: vertical, horizontal, alternating, card-style | tokens, base |

To inspect any module in detail, use the CLI:

    love info -m button

It shows the file, dependencies, description, tags, classes, states, pseudo-elements, animations, and which presets the module belongs to.

## Presets

A preset is a ready-made set of modules for a specific kind of project. Install a preset and get everything you need in one command.

| Preset | Description |
|---|---|
| custom | Empty. You add modules one by one with love add. |
| admin | Admin panel: dense layout, tables, forms, modals, dark theme. |
| landing | Landing page: cards, alerts, entrance animations, no tables. |
| docs | Documentation: typography, code, sidebar navigation, no forms. |
| auth | Sign in and sign up: minimal set of forms, buttons, cards. |

To install a preset:

    love install admin

To see what a preset includes:

    love info -p admin

## Themes

Light theme is the default. To switch to dark or high-contrast, set a data attribute on the html element.

    <html data-love-theme="dark">

Supported values: light, dark, high-contrast. If you remove the attribute, the theme follows the operating system preference through prefers-color-scheme.

## Tokens

Every visual parameter is a CSS custom property. Tokens live at three levels:

- Primitives: raw values like --love-color-blue-500, --love-space-4, --love-radius-md.
- Semantics: roles like --love-bg, --love-text, --love-border, --love-primary.
- Components: --love-btn-radius, --love-card-padding, --love-input-border.

To customize, override any token in your own CSS after loading Love.css. Example:

    :root {
      --love-primary: oklch(0.55 0.20 300);
      --love-btn-radius: 0;
    }

To use a different font:

    :root {
      --love-font-sans: "Inter", system-ui, sans-serif;
    }

Component-level tokens are the safest place to make changes. If you want square buttons, change --love-btn-radius. If you want tighter cards, change --love-card-padding. The component CSS reads those values and adapts.

## Custom overrides

Every project installed through the CLI gets a file called love.overrides.css. This file loads after all other modules, so any rule you put there wins without needing !important or higher specificity. Use it for your own additions.

    love.overrides.css

If you cloned Love.css directly, create this file yourself and link it last in your HTML.

## Fonts

Love.css ships with Space Grotesk as its default sans-serif typeface.

- Designer: Florian Karsten
- License: SIL Open Font License 1.1
- Source: https://fonts.google.com/specimen/Space+Grotesk
- Location: assets/fonts/Space_Grotesk/

The font is loaded through css/love.fonts.css. It is a variable font, so a single file covers Light (300), Regular (400), Medium (500), SemiBold (600), and Bold (700). The license text OFL.txt is included in the font directory as required by the SIL Open Font License.

To replace Space Grotesk with your own font:

1. Place the font files in assets/fonts/YourFont/.
2. Add an @font-face block to css/love.fonts.css. See the comments inside the file for the template.
3. Update --love-font-sans in css/love.tokens.css to point at your family name.

To disable Space Grotesk entirely, remove or comment out its @font-face blocks in css/love.fonts.css. The fallback stack in love.tokens.css will take over automatically.

## Kitchen sink

The file index.html in this repository is the framework's kitchen sink. It contains every HTML element and every Love.css component, with a theme switcher at the top. Use it to:

- Preview what Love.css looks like with your own tokens.
- Test changes you make to a module before committing.
- Compare light, dark, and high-contrast themes side by side.

If you cloned Love.css into another project, delete or rename index.html so it does not interfere with your own pages.

## Accessibility

Love.css respects prefers-reduced-motion by default. All non-essential animations are disabled when the user requests reduced motion. Focus states are visible and use the --love-focus token, which you can customize.

## Browser support

Love.css targets modern browsers. It uses CSS custom properties, oklch color, cascade layers where applicable, and native HTML elements like dialog and details. Supported browsers include current versions of Chrome, Firefox, Safari, and Edge.

## License

MIT. See LICENSE for details.

## Contributing

Issues and pull requests are welcome. For larger changes, please open an issue first to discuss what you would like to change.
