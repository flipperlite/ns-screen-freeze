import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { EventData, GridLayout } from '@nativescript/core'
import { AppRootViewModel } from './app-root-view-model'
import { DEFAULT_PAGE_ROUTE } from '~/_const'
import { Nav } from '~/shared/nav'

export function onLoaded(args: EventData): void {
  // must be in the Page.loaded event, not navigatingTo
  Nav.currentPageRoute = Nav.currentPageRoute || DEFAULT_PAGE_ROUTE // first run must match app-root/app-root.xml Frame defaultPage
  const sd = <RadSideDrawer>args.object
  sd.bindingContext = new AppRootViewModel()
}

export function onNavigationItemTap(args: EventData): void {
  const component = <GridLayout>args.object
  const componentRoute = component.get('route')
  const componentTitle = component.get('title')
  const bindingContext = <AppRootViewModel>component.bindingContext

  bindingContext.selectedPage = componentTitle

  Nav.go(componentRoute, null, Nav.closeDrawer)
}
