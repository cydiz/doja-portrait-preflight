# Portrait Preflight

Check a portrait locally before opening [Talk to Me Doja](https://talktomedoja.app/). Open index.html in a modern browser, select a JPEG, PNG or WebP, then download the JSON report. A 300 × 300 PNG passes the dimension threshold. A 299 × 300 PNG falls short. Maximum file size is 10 MiB (10,485,760 bytes). The accompanying CLI only plans credits.

## Install and plan

With Node.js 18 or later, install a local release tarball with `npm install --prefix ./local ./doja-portrait-preflight-1.0.0.tgz`. Run `./local/node_modules/.bin/doja-portrait-preflight 45 1 1`. The arguments are balance, Fast 480p count, and Match 720p count. This plan spends 37 credits and leaves 8. Pipe `{"balance":45,"fast":0,"match":3}` to the command with `--stdin` to see a 21-credit shortfall. Exit codes are 0 for a plan within budget, 2 for a shortfall and 1 for invalid input.

## Extension and privacy

Extract the extension ZIP. In Chrome Extensions, enable Developer mode and choose Load unpacked, then select the extracted folder. Click the toolbar action to open the checker. No site permissions, analytics, uploads, cookies, or persistent storage. The downloaded report contains measurements and validation results. It omits the picture and filename. The studio link opens an external website only when clicked.

## Limits and license

Planning and checking are free and run on your device. Generation in the separate studio uses credits. A passing check says nothing about consent, face visibility, identity or resulting motion. Use images you own or have permission to animate. MIT covers only this original helper and its synthetic examples.
