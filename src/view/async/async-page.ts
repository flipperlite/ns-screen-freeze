import { EventData, NavigatedData, Page } from '@nativescript/core'
import { AsyncViewModel } from './async-view-model'
import { Nav } from '~/shared/nav'
import { Util } from '~/shared/util'
import { PAGE_RELOAD_TIME, RESPONSE_TIME_DECREMENT, RESPONSE_TIME_START } from '~/_const'

//=======================================
// Variables
//=======================================

// don't change these values unless you know what you're doing
const _RESPONSE_TIME_MIN: number = 50
let _HANDLE = null // clear the timeout on Page.unloaded

// validation
if (_RESPONSE_TIME_MIN <= 0) throw new Error(`_RESPONSE_TIME_MIN "${_RESPONSE_TIME_MIN}" must be greater than zero`)
if (RESPONSE_TIME_START <= _RESPONSE_TIME_MIN) throw new Error(`RESPONSE_TIME_START "${RESPONSE_TIME_START}" must be greater than _RESPONSE_TIME_MIN`)

// page variables
let _VM: AsyncViewModel

//=======================================
// Page events
//=======================================

export async function _navigatedTo(data: NavigatedData) {
  console.log(`${_VM.id} (${_VM.responseTime} ms): ${Nav.currentPageRoute} async _navigatedTo`)

  // Mock an API reponse with minimum vm.responseTime
  _VM.message = await Util.mock(
    new Date().toISOString(),
    _VM.responseTime,
    () => { _VM.isWaiting = false; console.info(`${_VM.id} (${_VM.responseTime} ms): ${Nav.currentPageRoute} mock complete`) }
  )

  // will eventually freeze the screen with reload button off the screen as it's not loading the CSS correctly
  if (_VM.responseTime > 0) {
    _HANDLE = setTimeout(() => {
      console.warn(`${_VM.id} (${_VM.responseTime} ms): reload`, Nav.currentPageRoute, new Date().toISOString())
      Nav.reloadContext({ id: _VM.id, responseTime: Math.max(_VM.responseTime - RESPONSE_TIME_DECREMENT, 0) })
    }, PAGE_RELOAD_TIME)
  } else {
    _VM.message = `SUCCESS: Test of API mock with RESPONSE_TIME_START = ${RESPONSE_TIME_START} ms, RESPONSE_TIME_DECREMENT = ${RESPONSE_TIME_DECREMENT} ms, PAGE_RELOAD_TIME = ${PAGE_RELOAD_TIME} ms`
  }
}

export async function _navigatingTo(data: NavigatedData) {
  // Setup ViewModel and page global variables
  const page = <Page>data.object
  _VM = new AsyncViewModel(data.context)
  _VM.responseTime = _VM.responseTime === undefined || _VM.responseTime === null || _VM.responseTime < 0 ? RESPONSE_TIME_START : _VM.responseTime // allow _VM.responseTime = 0
  _VM.id = Util.getNextLetter(_VM.id)
  page.bindingContext = _VM

  console.log(`${_VM.id} (${_VM.responseTime} ms): ${Nav.currentPageRoute} async _navigatingTo`)
}

export async function _loaded(data: EventData) {
  console.log(`${_VM.id} (${_VM.responseTime} ms): ${Nav.currentPageRoute} async _loaded`)
}

export async function _unloaded(data: EventData) {
  if (_HANDLE !== null) clearTimeout(_HANDLE)
  _HANDLE = null
  console.log(`${_VM.id} (${_VM.responseTime} ms): ${Nav.currentPageRoute} async _unloaded`)
}

export async function _navigatingFrom(data: NavigatedData) {
  console.log(`${_VM.id} (${_VM.responseTime} ms): ${Nav.currentPageRoute} async _navigatingFrom`)
}

export async function _navigatedFrom(data: NavigatedData) {
  console.log(`${_VM.id} (${_VM.responseTime} ms): ${Nav.currentPageRoute} async _navigatedFrom`)
}

export async function _layoutChanged(data: EventData) {
  console.log(`${_VM.id} (${_VM.responseTime} ms): ${Nav.currentPageRoute} async _layoutChanged`)
}
