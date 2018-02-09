# ffxiv-launcher

A custom built launcher for FFXIV written in Javascript on Nodejs via Electron.

This is a Javascript implementation of: 
https://github.com/goaaats/FFXIVQuickLauncher

Needs a lot of love to make it look good and be useful

# Getting started

- Download repo
- cd `/repo/`
- `npm install`
- Start it: `electron .`

Electron is basically a chrome browser without a head (no address bar, buttons etc). The project will open dev tools and load the basic FFXIV Login form.

You can do modifications to the html, css or js and reload the app via: `CTRL+SHIFT+R`.

# Compiling the JS and SCSS

(If you need SASS installed: `yarn add sass-loader node-sass --dev`)

- ./node_modules/.bin/encore dev --watch
- yarn run encore dev --watch

# Preview

![preview](./github/preview.png)

# Todo

- A lot.
- Add maintenance check (parse: http://frontier.ffxiv.com/worldStatus/gate_status.json)

# Ideas

- A much improved visual appearance over the current design
- Automatic login
- Multi-Account support
- Maintenance and Patch checking
- Show more useful information (Dev Blog posts, Dev Forum Posts, etc)
- Show friends who are online
- Global chat
- *(Hook into XIVDB character data)*

The idea would be to build a really good launcher with improvements over the current one we have and provide more social features such as what Blizzard Battle.net offer (friends list, chatting, etc)

# Updating the User-Agent

Whenever a patch is release the user-agent for the client will need updating. The latest ID can be obtained by using wireshark.

- Download: [WireShark](https://www.wireshark.org/)

Process:

- Open Wireshark and begin capturing network data
- Open the FFXIV Launcher Window
- Tab back to Wireshark and stop recording
- In the Wireshark filter bar, enter: `http contains SQEXAuthor`
- Select any of the `.html` requests
- Open up the data for `Hypertext Transfer Protocol`
- Look for: `User-Agent`

A valid user agent looks like this:

- `SQEXAuthor/2.0.0(Windows 6.2; ja-jp; 9e75ab3012)`

The important part is the end ID `9e75ab3012`, enter this in the `src/Settings.js` file, replacing what is currently there.
