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

  static reload(pageRoute?: string, context?: Record<string, any>) {
    Nav.go(pageRoute || Nav.currentPageRoute, context || Nav.currentContext)
  }

  static reloadContext(context: Record<string, any>) {
    if (!context || typeof context !== 'object') throw new Error(`Arg context must be object, typeof = ${typeof context}`)
    Nav.go(Nav.currentPageRoute, context)
  }

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