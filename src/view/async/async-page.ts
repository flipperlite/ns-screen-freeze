import { EventData, NavigatedData, Page } from '@nativescript/core'
import { AsyncViewModel } from './async-view-model'
import { Nav } from '~/shared/nav'
import { Util } from '~/shared/util'

//=======================================
// Page events
//=======================================

// all units of time are milliseconds
const RESPONSE_TIME_DEFAULT: number = 1000 // the first run time. E.g. 1000
const RESPONSE_TIME_DECREMENT: number = 50 // amount of time to decrement on each reload, set to zero for no decrement
const RELOAD_TIME: number = 1000 // time between each page reload

// don't change these values unless you know what you're doing
const _RESPONSE_TIME_MIN: number = 50
let _HANDLE = null // clear the timeout on Page.unloaded

// validation
if (RESPONSE_TIME_DECREMENT < 0 || RESPONSE_TIME_DECREMENT > RESPONSE_TIME_DEFAULT) throw new Error(`RESPONSE_TIME_DECREMENT "${RESPONSE_TIME_DECREMENT}" must be greater than or equal to zero and less than RESPONSE_TIME_DEFAULT`)
if (RESPONSE_TIME_DEFAULT <= _RESPONSE_TIME_MIN) throw new Error(`RESPONSE_TIME_DEFAULT "${RESPONSE_TIME_DEFAULT}" must be greater than _RESPONSE_TIME_MIN`)
if (RELOAD_TIME <= 0) throw new Error(`RELOAD_TIME "${RELOAD_TIME}" must be greater than zero`)
if (_RESPONSE_TIME_MIN <= 0) throw new Error(`_RESPONSE_TIME_MIN "${_RESPONSE_TIME_MIN}" must be greater than zero`)

// page variables
let vm: AsyncViewModel

export async function _navigatedTo(data: NavigatedData) {
  console.log(`${vm.id} (${vm.responseTime} ms): ${Nav.currentPageRoute} async _navigatedTo`)

  // Mock an API reponse with minimum vm.responseTime
  vm.message = await Util.mock(
    new Date().toISOString(),
    vm.responseTime,
    () => { vm.isWaiting = false; console.info(`${vm.id} (${vm.responseTime} ms): ${Nav.currentPageRoute} mock complete`) }
  )

  // will eventually freeze the screen with reload button off the screen as it's not loading the CSS correctly
  _HANDLE = setTimeout(() => {
    console.warn(`${vm.id} (${vm.responseTime} ms): reload`, Nav.currentPageRoute, new Date().toISOString())
    Nav.reloadContext({ id: vm.id, responseTime: Math.max(vm.responseTime - RESPONSE_TIME_DECREMENT, 50) })
  }, RELOAD_TIME)
}

export async function _navigatingTo(data: NavigatedData) {
  // Setup ViewModel and page global variables
  const page = <Page>data.object
  vm = new AsyncViewModel(data.context)
  vm.responseTime = vm.responseTime || RESPONSE_TIME_DEFAULT
  vm.id = Util.getNextLetter(vm.id)
  page.bindingContext = vm

  console.log(`${vm.id} (${vm.responseTime} ms): ${Nav.currentPageRoute} async _navigatingTo`)
}

export async function _loaded(data: EventData) {
  console.log(`${vm.id} (${vm.responseTime} ms): ${Nav.currentPageRoute} async _loaded`)
}

export async function _unloaded(data: EventData) {
  if (_HANDLE !== null) clearTimeout(_HANDLE)
  _HANDLE = null
  console.log(`${vm.id} (${vm.responseTime} ms): ${Nav.currentPageRoute} async _unloaded`)
}

export async function _navigatingFrom(data: NavigatedData) {
  console.log(`${vm.id} (${vm.responseTime} ms): ${Nav.currentPageRoute} async _navigatingFrom`)
}

export async function _navigatedFrom(data: NavigatedData) {
  console.log(`${vm.id} (${vm.responseTime} ms): ${Nav.currentPageRoute} async _navigatedFrom`)
}

export async function _layoutChanged(data: EventData) {
  console.log(`${vm.id} (${vm.responseTime} ms): ${Nav.currentPageRoute} async _layoutChanged`)
}
