import { Observable } from "@nativescript/core";
import { ObservableProperty } from "./observable-property-decorator";
import { Nav } from "./nav";

export class ViewModel extends Observable {
  @ObservableProperty() message = '<!-- Page content goes here -->'
  @ObservableProperty() isWaiting: boolean = true

  /**
   * Tappable event to show the RadSideDrawer.
   * NOTE: Cannot assign the prop to the function to keep OOP class hierarchy/structure/inheritance.
   */
  showDrawer () {
    Nav.showDrawer()
  }
  
  /**
   * Tappable event to close the RadSideDrawer.
   * NOTE: Cannot assign the prop to the function to keep OOP class hierarchy/structure/inheritance.
   */
  closeDrawer () {
    Nav.closeDrawer()
  }

  /**
   * Tappable event to reload the page with current context.
   * NOTE: Cannot assign the prop to the function to keep OOP class hierarchy/structure/inheritance.
   */
  reload () {
    Nav.reload()
  }

  constructor (context?: Record<string, any>) {
    super()
    Nav.currentContext = context
  }
}