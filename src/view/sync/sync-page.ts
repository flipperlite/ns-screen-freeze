import { EventData, NavigatedData, Page } from '@nativescript/core'
import { SyncViewModel } from './sync-view-model'
import { Nav } from '~/shared/nav'
import { Util } from '~/shared/util'
import { PAGE_RELOAD_TIME_RANDOM_MAX, PAGE_RELOAD_TIME_RANDOM_MIN } from '~/_const'

//=======================================
// Variables
//=======================================

// page variables
let _HANDLE = null
let _VM: SyncViewModel

//=======================================
// Init Page events
//=======================================

/**
 * Page event navigatedTo.
 * ID10T - Put Nav.go or Nav.reloadContext in this event, not navigatingTo.
 * @param data The data passed in from the Page
 */
export function navigatedTo(data: NavigatedData) {
  console.log(`${_VM.id} (${_VM.reloadTime} ms) ${Nav.currentPageRoute} navigatedTo`)

  _HANDLE = setTimeout(() => {
    console.info('go', Nav.currentPageRoute, new Date().toISOString())
    Nav.reloadContext({ id: _VM.id })
  }, _VM.reloadTime)
}

/**
 * Page event navigatingTo.
 * ID10T - Never Nav.go or Nav.reloadContext from this event else you can crash the app GC or memory "Exception Type: EXC_BAD_ACCESS (SIGSEGV)". Put Nav.go or Nav.reloadContext in _navigatedTo.
 * @param data The data passed in from the Page
 */
export function navigatingTo(data: NavigatedData) {
  const page = <Page>data.object
  const context = data.context

  _VM = new SyncViewModel(data.context)
  _VM.id = Util.getNextLetter(_VM.id)
  _VM.message = new Date().toISOString()
  
  // will eventually freeze the screen with reload button off the screen as it's not loading the CSS correctly
  _VM.reloadTime = Util.randomInt(PAGE_RELOAD_TIME_RANDOM_MAX, PAGE_RELOAD_TIME_RANDOM_MIN)
  page.bindingContext = _VM

  console.log(`${_VM.id} (${_VM.reloadTime} ms) ${Nav.currentPageRoute} navigatingTo`)
}

//=======================================
// Other Page events
//=======================================

/**
 * Page event loaded
 * @param data The data passed in from the Page
 */
export function loaded(data: EventData) {
  console.log(`${_VM.id} (${_VM.reloadTime} ms) ${Nav.currentPageRoute} loaded`)
}

/**
 * Page event unloaded
 * @param data The data passed in from the Page
 */
export function unloaded(data: EventData) {
  if (_HANDLE !== null) clearTimeout(_HANDLE)
  _HANDLE = null
  console.log(`${_VM.id} (${_VM.reloadTime} ms) ${Nav.currentPageRoute} unloaded`)
}

/**
 * Page event navigatingFrom
 * @param data The data passed in from the Page
 */
export function navigatingFrom(data: NavigatedData) {
  console.log(`${_VM.id} (${_VM.reloadTime} ms) ${Nav.currentPageRoute} navigatingFrom`)
}

/**
 * Page event navigatedFrom
 * @param data The data passed in from the Page
 */
export function navigatedFrom(data: NavigatedData) {
  console.log(`${_VM.id} (${_VM.reloadTime} ms) ${Nav.currentPageRoute} navigatedFrom`)
}

/**
 * Page event layoutChanged
 * @param data The data passed in from the Page
 */
export function layoutChanged(data: EventData) {
  console.log(`${_VM.id} (${_VM.reloadTime} ms) ${Nav.currentPageRoute} layoutChanged`)
}
