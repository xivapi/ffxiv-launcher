# Deprecated

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

```sh
git clone 'git@github.com:xivapi/ffxiv-launcher.git' # Clone the repo!
cd ffxiv-launcher
yarn install        # Snag the dependencies!
yarn start          # Build and run it locally in dev mode!
```

Electron is basically a chrome browser without a head (no address bar, buttons etc).

You can do modifications to the html, css or js and reload the app via: `CTRL+SHIFT+R`.

## Compiling the JS and SCSS

Make sure your IDE is set to: EMCAScript 6

(If you need SASS installed: `yarn add sass-loader node-sass --dev`)

- `yarn build` or `yarn build-dev` or `yarn build-dev --watch`

## Compile

- `yarn dist` - This also compiles the CSS and builds the electron app installer.

This will build the installer to: `/dist/FFXIV-Launcher Setup <version>.exe` which you can share and install.

## Dev Tools

Open with `CTRL+Shift+I`

# Preview

![preview](./github/preview.png)

# Todo

- Save expansion per character rather than app wide
- Add an "Auto-Login" option, if character has OTP it will just auto-prompt, if game is already running it won't auto-login (assumes you're selecting another character)
- Re-write the settings system to split Default Settings and User Settings, simplify it all
- Add maintenance check (parse: http://frontier.ffxiv.com/worldStatus/gate_status.json)
- Allow non-lodestone characters (eg accounts with many characters), right now it spams XIVAPI
  - Allow "Named" entries rather than just character/server
