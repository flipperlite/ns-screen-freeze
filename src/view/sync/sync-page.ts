import { EventData, NavigatedData, Page } from '@nativescript/core'
import { SyncViewModel } from './sync-view-model'
import { Nav } from '~/shared/nav'
import { Util } from '~/shared/util'

//=======================================
// Page events
//=======================================

// all units of time are milliseconds
const RELOAD_TIME_RANDOM_MAX: number = 500 // max time between each page reload

// validadtion
if (RELOAD_TIME_RANDOM_MAX <= 0) throw new Error(`RELOAD_TIME_RANDOM_MAX "${RELOAD_TIME_RANDOM_MAX}" must be greater than zero`)

// global variables
let _HANDLE = null
let vm: SyncViewModel

export function _navigatingTo(data: NavigatedData) {
  const page = <Page>data.object
  const context = data.context

  vm = new SyncViewModel(data.context)
  vm.id = Util.getNextLetter(vm.id)
  console.log(`${vm.id} (${vm.reloadTime} ms) ${Nav.currentPageRoute} _navigatingTo`)
  vm.message = new Date().toISOString()
  page.bindingContext = vm

  // will eventually freeze the screen with reload button off the screen as it's not loading the CSS correctly
  const reloadTime = Util.randomInt(RELOAD_TIME_RANDOM_MAX)
  _HANDLE = setTimeout(() => {
    console.info('go', Nav.currentPageRoute, new Date().toISOString())
    Nav.reloadContext({ id: vm.id, reloadTime })
  }, reloadTime)
}

export function _loaded(data: EventData) {
  console.log(`${vm.id} (${vm.reloadTime} ms) ${Nav.currentPageRoute} _loaded`)
}

export function _unloaded(data: EventData) {
  if (_HANDLE !== null) clearTimeout(_HANDLE)
  _HANDLE = null
  console.log(`${vm.id} (${vm.reloadTime} ms) ${Nav.currentPageRoute} _unloaded`)
}

export function _navigatingFrom(data: NavigatedData) {
  console.log(`${vm.id} (${vm.reloadTime} ms) ${Nav.currentPageRoute} _navigatingFrom`)
}

export function _navigatedFrom(data: NavigatedData) {
  console.log(`${vm.id} (${vm.reloadTime} ms) ${Nav.currentPageRoute} _navigatedFrom`)
}

export function _layoutChanged(data: EventData) {
  console.log(`${vm.id} (${vm.reloadTime} ms) ${Nav.currentPageRoute} _layoutChanged`)
}
