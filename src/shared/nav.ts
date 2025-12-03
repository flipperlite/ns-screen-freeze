import { Application, Frame } from "@nativescript/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";

export class Nav {
  static readonly DELAY_MS: number = 0 // setTimeout on navigation to avoid app crashing "Exception Type: EXC_BAD_ACCESS (SIGSEGV)"

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
   * Tappable event to show the RadSideDrawer
   */
  static showDrawer(): void {
    Nav.getDrawer().showDrawer()
  }

  /**
   * Tappable event to close the RadSideDrawer
   */
  static closeDrawer(): void {
    Nav.getDrawer().closeDrawer()
  }

  /**
   * Reload the Nav.currentPageRoute and Nav.currentContext with ability to override one or the other
   * @param pageRoute The full path of the page to navigate to. E.g. "view/home/home-page". NS calls it "moduleName".
   * @param context The optional NavigationEntry.context to send to the next page or pageRoute
   */
  static reload(pageRoute?: string, context?: Record<string, any>): void {
    // NOTE: If used from XML like: tap="{{ reload }}", you'll get EventData as pageRoute
    if (pageRoute && typeof pageRoute !== 'string') pageRoute = null // DO NOT REMOVE!
    Nav.go(pageRoute || Nav.currentPageRoute, context || Nav.currentContext)
  }

  /**
   * Reload the Nav.currentPageRoute passing in required new context NavigationEntry
   * @param context The required NavigationEntry.context to send to the next page or pageRoute
   */
  static reloadContext(context: Record<string, any>): void {
    if (!context || typeof context !== 'object') throw new Error(`Arg context must be object, typeof = ${typeof context}`)
    Nav.go(Nav.currentPageRoute, context)
  }

  /**
   * Validate the pageRoute value before attempting to process it
   * @param pageRoute The full path of the page to navigate to. E.g. "view/_example/home/home-page". NS calls it "moduleName".
   * @param label A text label to know where it came from
   */
  static readonly validatePageRoute = (pageRoute?: string, label?: string): void => {
    label = label || 'Nav.validatePageRoute'

    if (typeof pageRoute !== 'string') throw new ReferenceError(`${label}: Arg pageRoute must be a string (typeof ${typeof pageRoute}): ${JSON.stringify(pageRoute)}`)
    if (!pageRoute.trim()) throw new ReferenceError(`${label}: Arg pageRoute cannot be empty: ${pageRoute}`)
  }

  /**
   * The native NS OOTB call to Frame.topmost().navigate()
   * @param pageRoute The full path of the page to navigate to. E.g. "view/_example/home/home-page". NS calls it "moduleName".
   * @param context The optional NavigationEntry.context to send to the next page or pageRoute
   * @param fns An optional spread array of no arg function to run once navigation is complete. E.g. Nav.closeDrawer (without the parentheses)
   */
  static readonly navigate = (pageRoute: string, context?: Record<string, any>, ...fns: Array<() => void>): void => {
    const label = 'Nav.navigate'
    Nav.validatePageRoute(pageRoute, label)

    Frame.topmost().navigate({
      moduleName: pageRoute,
      transition: {
        name: 'fade',
      },
      context,
    })

    for (const fn of fns) {
      fn()
    }
  }

  /**
   * Navigate to a fully qualified page route like "view/home/home-page".
   * NOTE: It will not auto Nav.closeDrawer() here. Want flexibility to load side drawer on unresponsive or infinite loop page.
   * Usage: Nav.go(pageRoute, context, Nav.closeDrawer)
   * @param pageRoute The full path of the page to navigate to. E.g. "view/home/home-page". NS calls it "moduleName".
   * @param context The optional NavigationEntry.context to send to the next page or pageRoute
   * @param fns An optional spread array of no arg function to run once navigation is complete. E.g. Nav.closeDrawer (without the parentheses)
   */
  static go (pageRoute: string, context?: Record<string, any>, ...fns: Array<() => void>): void {
    // setTimeout on navigation to avoid app crashing "Exception Type: EXC_BAD_ACCESS (SIGSEGV)"
    setTimeout(() => {
      Nav.navigate(pageRoute, context, ...fns)
      Nav.currentPageRoute = pageRoute
      Nav.currentContext = context
    }, Nav.DELAY_MS)
  }
}