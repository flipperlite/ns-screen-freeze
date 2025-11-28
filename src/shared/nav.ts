import { Application, Frame } from "@nativescript/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";

export class Nav {
  static currentPageRoute: string
  
  static currentContext: any

  //=======================================
  // Static methods
  //=======================================

  /**
   * Get the current RadSideDrawer.
   * IMPORTANT - You can get one-way, read-only data from the RadSideDrawer.bindingContext. However, any changes you make even to ObservableProperty props, will not be saved permanently (two-way write) or retrievable at a later time.
   * @returns The RadSideDrawer
   */
  static getDrawer(): RadSideDrawer {
    return <RadSideDrawer>Application.getRootView()
  }

  /**
   * Tapplable event to show the RadSideDrawer
   */
  static showDrawer(): void {
    Nav.getDrawer().showDrawer()
  }

  /**
   * Tapplable event to close the RadSideDrawer
   */
  static closeDrawer(): void {
    Nav.getDrawer().closeDrawer()
  }

  /**
   * Reload the Nav.currentPageRoute and Nav.currentContext with ability to override one or the other
   * @param pageRoute The full path of the page to navigate to. E.g. "view/home/home-page". NS calls it "moduleName".
   * @param context The optional NavigationEntry.context to send to the next page or pageRoute
   */
  static reload(pageRoute?: string, context?: Record<string, any>) {
    Nav.go(pageRoute || Nav.currentPageRoute, context || Nav.currentContext)
  }

  /**
   * Reload the Nav.currentPageRoute passing in required new context NavigationEntry
   * @param context The required NavigationEntry.context to send to the next page or pageRoute
   */
  static reloadContext(context: Record<string, any>) {
    if (!context || typeof context !== 'object') throw new Error(`Arg context must be object, typeof = ${typeof context}`)
    Nav.go(Nav.currentPageRoute, context)
  }

  /**
   * Navigate to a fully qualified page route like "view/home/home-page".
   * NOTE: It will not auto Nav.closeDrawer() here. Want flexibility to load side drawer on unresponsive or infinite loop page.
   * Usage: Nav.go(pageRoute, context, Nav.closeDrawer)
   * @param pageRoute The full path of the page to navigate to. E.g. "view/home/home-page". NS calls it "moduleName".
   * @param context The optional NavigationEntry.context to send to the next page or pageRoute
   * @param fn An optional no arg function to run once navigation is complete. E.g. Nav.closeDrawer (without the parentheses)
   */
  static go (pageRoute: string, context?: Record<string, any>, fn?: () => void): void {
    Frame.topmost().navigate({
      moduleName: pageRoute,
      transition: {
        name: 'fade',
      },
      context,
    })
    Nav.currentPageRoute = pageRoute
    Nav.currentContext = context

    if (fn instanceof Function) fn()
  }
}