import { EventData, NavigatedData, ObservableArray, Page } from '@nativescript/core'
import { HomeViewModel } from './home-view-model'
import { Util } from '~/shared/util'
import { Nav } from '~/shared/nav'

//=======================================
// Init Page events
//=======================================

/**
 * Page event navigatedTo.
 * ID10T - Put Nav.go or Nav.reloadContext in this event, not navigatingTo.
 * @param data The data passed in from the Page
 */
export async function navigatedTo(data: NavigatedData) {
  console.log(`${Nav.currentPageRoute} async navigatedTo`)

  const page = <Page>data.object
  const vm = new HomeViewModel(data.context)
  vm.id = Util.getNextLetter(vm.id)

  const text = 'Use this sample app to find hard to diagnose timing issues with screen freezes, page loads, NS garbage collection (GC) and OS memory issues like "Exception Type: EXC_BAD_ACCESS (SIGSEGV)". Modify package.json to test "@nativescript/core" versions and/or ~/_const.ts (if desired) and select from the side drawer "Run Async Test" or "Run Sync Test".'
  const devices = new ObservableArray([

  ])

  vm.message = text
  vm.devices = devices
  page.bindingContext = vm
}

/**
 * Page event navigatingTo.
 * ID10T - Never Nav.go or Nav.reloadContext from this event else you can crash the app GC or memory "Exception Type: EXC_BAD_ACCESS (SIGSEGV)". Put Nav.go or Nav.reloadContext in _navigatedTo.
 * @param data The data passed in from the Page
 */
export async function navigatingTo(data: NavigatedData) {
  console.log(`${Nav.currentPageRoute} async navigatingTo`)
}

//=======================================
// Other Page events
//=======================================

/**
 * Page event loaded
 * @param data The data passed in from the Page
 */
export async function loaded(data: EventData) {
  console.log(`${Nav.currentPageRoute} async loaded`)
}

/**
 * Page event unloaded
 * @param data The data passed in from the Page
 */
export async function unloaded(data: EventData) {
  console.log(`${Nav.currentPageRoute} async unloaded`)
}

/**
 * Page event navigatingFrom
 * @param data The data passed in from the Page
 */
export async function navigatingFrom(data: NavigatedData) {
  console.log(`${Nav.currentPageRoute} async navigatingFrom`)
}

/**
 * Page event navigatedFrom
 * @param data The data passed in from the Page
 */
export async function navigatedFrom(data: NavigatedData) {
  console.log(`${Nav.currentPageRoute} async navigatedFrom`)
}

/**
 * Page event layoutChanged
 * @param data The data passed in from the Page
 */
export async function layoutChanged(data: EventData) {
  console.log(`${Nav.currentPageRoute} async layoutChanged`)
}
