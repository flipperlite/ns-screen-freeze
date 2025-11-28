import { EventData, NavigatedData, ObservableArray, Page } from '@nativescript/core'
import { HomeViewModel } from './home-view-model'
import { Util } from '~/shared/util'
import { Nav } from '~/shared/nav'

//=======================================
// Page events
//=======================================

export async function _navigatedTo(data: NavigatedData) {
  console.log(`${Nav.currentPageRoute} async _navigatedTo`)

  const page = <Page>data.object
  const vm = new HomeViewModel(data.context)
  vm.id = Util.getNextLetter(vm.id)

  const text = 'Use this sample app to find hard to diagnose timing issues with screen freezes, page loads, and NS garbage collection (GC). Modify package.json and/or ~/_const.ts (if desired) and select from the side drawer "Run Async Test" or "Run Sync Test".'
  const devices = new ObservableArray([

  ])

  vm.message = text
  vm.devices = devices
  page.bindingContext = vm
}

export async function _navigatingTo(data: NavigatedData) {
  console.log(`${Nav.currentPageRoute} async _navigatingTo`)
}

export async function _loaded(data: EventData) {
  console.log(`${Nav.currentPageRoute} async _loaded`)
}

export async function _unloaded(data: EventData) {
  console.log(`${Nav.currentPageRoute} async _unloaded`)
}

export async function _navigatingFrom(data: NavigatedData) {
  console.log(`${Nav.currentPageRoute} async _navigatingFrom`)
}

export async function _navigatedFrom(data: NavigatedData) {
  console.log(`${Nav.currentPageRoute} async _navigatedFrom`)
}

export async function _layoutChanged(data: EventData) {
  console.log(`${Nav.currentPageRoute} async _layoutChanged`)
}
