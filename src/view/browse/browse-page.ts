import { EventData, NavigatedData, Page } from '@nativescript/core'
import { BrowseViewModel } from './browse-view-model'
import { Nav } from '~/shared/nav'

//=======================================
// Page events
//=======================================

export async function _navigatingTo(data: NavigatedData) {
  console.log(`${Nav.currentPageRoute} _navigatingTo`)

  const page = <Page>data.object
  const vm = new BrowseViewModel(data.context)
  vm.message = new Date().toISOString()
  page.bindingContext = vm
}

export async function _loaded(data: EventData) {
  console.log(`${Nav.currentPageRoute} _loaded`)
}

export async function _unloaded(data: EventData) {
  console.log(`${Nav.currentPageRoute} _unloaded`)
}

export async function _navigatingFrom(data: NavigatedData) {
  console.log(`${Nav.currentPageRoute} _navigatingFrom`)
}

export async function _navigatedFrom(data: NavigatedData) {
  console.log(`${Nav.currentPageRoute} _navigatedFrom`)
}

export async function _layoutChanged(data: EventData) {
  console.log(`${Nav.currentPageRoute} _layoutChanged`)
}