import { Observable } from '@nativescript/core'

import { ObservableProperty } from '../shared/observable-property-decorator'
import { SelectedPageService } from '../shared/selected-page-service'
import { DEFAULT_PAGE_ROUTE } from '~/shared/const'

export class AppRootViewModel extends Observable {
  @ObservableProperty() selectedPage: string

  @ObservableProperty() currentPageRoute: string
  DEFAULT_PAGE_ROUTE = DEFAULT_PAGE_ROUTE

  constructor() {
    super()

    SelectedPageService.getInstance().selectedPage$.subscribe(
      (selectedPage: string) => (this.selectedPage = selectedPage)
    )
  }
}
