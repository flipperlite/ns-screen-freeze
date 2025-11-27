export interface ISideDrawerItem {
  /**
   * The text to display on the side drawer item. Use the prop "icon" for the Font Awesome icon.
   */
  text: string // Home

  /**
   * The fully qualified pageRoute to Nav.go when item is tapped. E.g. "view/home/home-page"
   */
  pageRoute: string // view/home/home-page

  /**
   * An overrideable function that runs when the side drawer item is tapped
   * @returns an overrideable tap function to handle the side drawer item tap event
   */
  tap?: () => void
}

export const SD_CSS_ALWAYS = 'nt-drawer__list-item'
export const SD_CSS_SELECTED = ' -selected'
export const DEFAULT_PAGE_ROUTE = 'view/home/home-page'