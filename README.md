# ns-screen-freeze

Use this app to troubleshoot random screen freezes, page load, NativeScript (NS) garbage collection, [navigation transitions](https://github.com/flipperlite/ns-screen-freeze/blob/main/src/shared/nav.ts#L62), etc. issues in your NS application. It can be run using an emulator or real device. It currently has branches for [NS 8.9](https://github.com/flipperlite/ns-screen-freeze) and [NS 9.0](https://github.com/flipperlite/ns-screen-freeze/tree/example/ns9.0).

## To use the app:

1) Clone the repo locally
1) `cd` to the repo directory
1) Switch to the NS version branch of your choosing
1) Run `ns install`
1) Run `ns run ios` or `ns run android`
1) With the app open on device, click the hamburger side drawer menu, choose "Run Async Test" or "Run Sync Test".
1) When switching branches with different `package.json` and `package-lock.json` files, you need to run `rm -rf hooks && rm -rf platforms && rm -rf node_modules` and rerun steps 4, 5, 6.


## Things to know:

1) It uses the old [RadSideDrawer](https://old.docs.nativescript.org/ui/components/sidedrawer/overview) for ActiveBar navigation using an [official NS template](https://docs.nativescript.org/guide/creating-a-project#drawer-template). It was [advised via Discord](https://discord.com/channels/603595811204366337/1441458450822336625/1443680979918258227) to use the ["community-based alternative"](https://www.npmjs.com/package/@nativescript-community/ui-drawer) but it currently doesn't have an [NS Core example](https://github.com/nativescript-community/ui-drawer/issues/36). I may update it with an example or template for Core TS. The RadSideDrawer shouldn't affect the page rendering.

1) The original code used page event `navigatingTo` to render its ViewModel components and a `setTimeout` to reload the page with new parameters. It was changed to page event `navigatedTo` and package.json to `"@nativescript/core": "^9.0.4"` which did fix the screen freeze issue. A mock API [async example](https://github.com/flipperlite/ns-screen-freeze/tree/main/src/view/async) and a standard redirect [sync example](https://github.com/flipperlite/ns-screen-freeze/tree/main/src/view/sync) are provided.

1) Some constants can be eaily modified in the `~/_const.ts` file to alter the timing behavior and delays on the page.
