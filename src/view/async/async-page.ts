import { EventData, NavigatedData, Page } from '@nativescript/core'
import { AsyncViewModel } from './async-view-model'
import { Nav } from '~/shared/nav'
import { Util } from '~/shared/util'
import { PAGE_RELOAD_TIME, RESPONSE_TIME_DECREMENT, RESPONSE_TIME_START } from '~/_const'

//=======================================
// Variables
//=======================================

// page variables
let _VM: AsyncViewModel

// don't change these values unless you know what you're doing
const _RESPONSE_TIME_MIN: number = 50
let _HANDLE = null // clear the timeout on Page.unloaded
let _STOP: boolean = false

// validation
if (_RESPONSE_TIME_MIN <= 0) throw new Error(`_RESPONSE_TIME_MIN "${_RESPONSE_TIME_MIN}" must be greater than zero`)
if (RESPONSE_TIME_START <= _RESPONSE_TIME_MIN) throw new Error(`RESPONSE_TIME_START "${RESPONSE_TIME_START}" must be greater than _RESPONSE_TIME_MIN`)

//=======================================
// Init Page events
//=======================================

export async function navigatedTo(data: NavigatedData) {
  console.log(`${_VM.id} (${_VM.responseTime} ms): ${Nav.currentPageRoute} async navigatedTo`)

  // Mock an API reponse with minimum vm.responseTime
  _VM.message = await Util.mock(
    new Date().toISOString(),
    _VM.responseTime,
    () => { _VM.isWaiting = false; console.info(`${_VM.id} (${_VM.responseTime} ms): ${Nav.currentPageRoute} mock complete`) }
  )

  // will eventually freeze the screen with reload button off the screen as it's not loading the CSS correctly
  if (_VM.responseTime > 0) {
    if (!_STOP) {
      _HANDLE = setTimeout(() => {
        console.warn(`${_VM.id} (${_VM.responseTime} ms): reload`, Nav.currentPageRoute, new Date().toISOString())
        Nav.reloadContext({ id: _VM.id, responseTime: Math.max(_VM.responseTime - RESPONSE_TIME_DECREMENT, 0) })
      }, PAGE_RELOAD_TIME)
    }
  } else {
    _VM.loopStatus = ''
    _VM.message = `SUCCESS: Test of API mock with RESPONSE_TIME_START = ${RESPONSE_TIME_START} ms, RESPONSE_TIME_DECREMENT = ${RESPONSE_TIME_DECREMENT} ms, PAGE_RELOAD_TIME = ${PAGE_RELOAD_TIME} ms`
  }
}

export async function navigatingTo(data: NavigatedData) {
  // Setup ViewModel and page global variables
  const page = <Page>data.object
  _VM = new AsyncViewModel(data.context)
  _VM.responseTime = _VM.responseTime === undefined || _VM.responseTime === null || _VM.responseTime < 0 ? RESPONSE_TIME_START : _VM.responseTime // allow _VM.responseTime = 0
  _VM.id = Util.getNextLetter(_VM.id)
  page.bindingContext = _VM

  console.log(`${_VM.id} (${_VM.responseTime} ms): ${Nav.currentPageRoute} async navigatingTo`)
}

//=======================================
// Functions
//=======================================

export function stopLoop () {
  _STOP = true
  clearHandle()
  _VM.loopStatus = 'Stopped. Click Reload icon to continue.'
}

function clearHandle() {
  if (_HANDLE !== null) clearTimeout(_HANDLE)
  _HANDLE = null
}

//=======================================
// Other Page events
//=======================================

/**
 * Page event loaded
 * @param data The data passed in from the Page
 */
export async function loaded(data: EventData) {
  console.log(`${_VM.id} (${_VM.responseTime} ms): ${Nav.currentPageRoute} async loaded`)
}

/**
 * Page event unloaded
 * @param data The data passed in from the Page
 */
export async function unloaded(data: EventData) {
  // reset
  clearHandle()
  _STOP = false
  console.log(`${_VM.id} (${_VM.responseTime} ms): ${Nav.currentPageRoute} async unloaded`)
}

/**
 * Page event navigatingFrom
 * @param data The data passed in from the Page
 */
export async function navigatingFrom(data: NavigatedData) {
  console.log(`${_VM.id} (${_VM.responseTime} ms): ${Nav.currentPageRoute} async navigatingFrom`)
}

/**
 * Page event navigatedFrom
 * @param data The data passed in from the Page
 */
export async function navigatedFrom(data: NavigatedData) {
  console.log(`${_VM.id} (${_VM.responseTime} ms): ${Nav.currentPageRoute} async navigatedFrom`)
}

/**
 * Page event layoutChanged
 * @param data The data passed in from the Page
 */
export async function layoutChanged(data: EventData) {
  console.log(`${_VM.id} (${_VM.responseTime} ms): ${Nav.currentPageRoute} async layoutChanged`)
}
