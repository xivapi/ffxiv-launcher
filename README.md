# ffxiv-launcher

A custom built launcher for FFXIV written in Javascript on Nodejs via Electron.

This is a Javascript implementation of: https://github.com/IrealiTY/FFXIVQuickLauncher

Needs a lot of love to make it look good and be useful

# Getting started

- Download repo
- cd `/repo/`
- `npm install`
- Start it: `electron .`

Electron is basically a chrome browser without a head (no address bar, buttons etc). The project will open dev tools and load the basic FFXIV Login form.

You can do modifications to the html, css or js and reload the app via: `CTRL+SHIFT+R`.


# Preview

![preview](./preview.png)

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
