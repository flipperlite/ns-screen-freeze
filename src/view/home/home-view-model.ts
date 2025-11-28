import { ObservableArray } from '@nativescript/core'
import { ViewModel } from '~/shared/view-model'
import { ObservableProperty } from '~/shared/observable-property-decorator'
import { Nav } from '~/shared/nav'

export class HomeViewModel extends ViewModel {
  @ObservableProperty() id: string = null
  @ObservableProperty() platforms: ObservableArray<string> = new ObservableArray()

  reload () {
    console.info('go', Nav.currentPageRoute, new Date().toISOString())
    super.reload()
  }

  constructor (context?: Record<string, any>) {
    super(context)
    Object.assign(this, context) // must exist in sub class and not super class due to new props in sub class get defaulted/initialized/overwritten after the super(context) line
  }
}