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

  const text = 'Open Side Drawer and choose Crash Async or Crash Sync. Then wait for screen to freeze by watching the console output stop. The following have crashed:'
  const platforms = new ObservableArray([
    'Simulator iPhone 17 Pro (iOS 26.1)',
    'Simulator iPhone 15 Pro (iOS 17.2)',
    'Real iPhone 13 Pro (iOS 26.1)',
    'Real Essential PH-1 (Android 10)',
    'Emulator Pixel 3a (Android 14)',
  ])

  vm.message = text
  vm.platforms = platforms
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
