import { Observable } from "@nativescript/core";
import { ObservableProperty } from "./observable-property-decorator";
import { Nav } from "./nav";

export class ViewModel extends Observable {
  @ObservableProperty() message = '<!-- Page content goes here -->'
  @ObservableProperty() isWaiting: boolean = true

  /**
   * Tappable event to show the RadSideDrawer
   */
  showDrawer = Nav.showDrawer

  /**
   * Tappable event to close the RadSideDrawer
   */
  closeDrawer = Nav.closeDrawer

  /**
   * Reload the current page
   */
  reload = Nav.reload

  constructor (context?: Record<string, any>) {
    super()
    Nav.currentContext = context
  }
}