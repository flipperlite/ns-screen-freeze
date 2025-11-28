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
// Page events
//=======================================

export function _navigatedTo(data: NavigatedData) {
  console.log(`${_VM.id} (${_VM.reloadTime} ms) ${Nav.currentPageRoute} _navigatedTo`)

  _HANDLE = setTimeout(() => {
    console.info('go', Nav.currentPageRoute, new Date().toISOString())
    Nav.reloadContext({ id: _VM.id })
  }, _VM.reloadTime)
}

/**
 * The first page event so we need to setup page variables here
 * @param data The navigated data that contains previous run context like { id: "A" }
 */
export function _navigatingTo(data: NavigatedData) {
  const page = <Page>data.object
  const context = data.context

  _VM = new SyncViewModel(data.context)
  _VM.id = Util.getNextLetter(_VM.id)
  _VM.message = new Date().toISOString()
  
  // will eventually freeze the screen with reload button off the screen as it's not loading the CSS correctly
  _VM.reloadTime = Util.randomInt(PAGE_RELOAD_TIME_RANDOM_MAX, PAGE_RELOAD_TIME_RANDOM_MIN)
  page.bindingContext = _VM

  console.log(`${_VM.id} (${_VM.reloadTime} ms) ${Nav.currentPageRoute} _navigatingTo`)
}

export function _loaded(data: EventData) {
  console.log(`${_VM.id} (${_VM.reloadTime} ms) ${Nav.currentPageRoute} _loaded`)
}

export function _unloaded(data: EventData) {
  if (_HANDLE !== null) clearTimeout(_HANDLE)
  _HANDLE = null
  console.log(`${_VM.id} (${_VM.reloadTime} ms) ${Nav.currentPageRoute} _unloaded`)
}

export function _navigatingFrom(data: NavigatedData) {
  console.log(`${_VM.id} (${_VM.reloadTime} ms) ${Nav.currentPageRoute} _navigatingFrom`)
}

export function _navigatedFrom(data: NavigatedData) {
  console.log(`${_VM.id} (${_VM.reloadTime} ms) ${Nav.currentPageRoute} _navigatedFrom`)
}

export function _layoutChanged(data: EventData) {
  console.log(`${_VM.id} (${_VM.reloadTime} ms) ${Nav.currentPageRoute} _layoutChanged`)
}
