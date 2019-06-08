# FINAL FANTASY XIV: STORMBLOOD - CUSTOM LAUNCHER

A custom built launcher for FFXIV written in Javascript on Nodejs via Electron. Needs a lot of love to make it look good and be useful

> This is a Javascript implementation of: https://github.com/goaaats/FFXIVQuickLauncher

> Note: DO NOT run npm commands in this project, it will install different versions of packages and break stuff.

## Source files

- Styles: `src/css/**.scss`
- Javascript: `src/js/**.js`
- HTML: `public/index.html`

For images, you must host them somewhere, eg Github, Imgur or I can put them on XIVAPI.com

## Getting started

- Download repo
- cd `/repo/`
- `yarn`
- Start it: `electron .`

Electron is basically a chrome browser without a head (no address bar, buttons etc).

You can do modifications to the html, css or js and reload the app via: `CTRL+SHIFT+R`.

## Compiling the JS and SCSS

Make sure your IDE is set to: EMCAScript 6

(If you need SASS installed: `yarn add sass-loader node-sass --dev`)

- `yarn run encore dev --watch`

## Compile

- `yarn dist` - This also compiles the CSS.

This will build an installation to: `/dist/FFXIV-Launcher Setup <version>.exe` which you can share and install.

## Dev Tools

Open with `CTRL+Shift+I`

# Preview

![preview](./github/preview.png)

# Todo

- Save expansion per character rather than app wide
- Re-write the settings system to split Default Settings and User Settings, simplify it all
- Add maintenance check (parse: http://frontier.ffxiv.com/worldStatus/gate_status.json)
- Allow non-lodestone characters (eg accounts with many characters), right now it spams XIVAPI
  - Allow "Named" entries rather than just character/server
