import { ObservableProperty } from "~/shared/observable-property-decorator";
import { ViewModel } from "~/shared/view-model";

export class SyncViewModel extends ViewModel {
  @ObservableProperty() id: string = null
  @ObservableProperty() reloadTime: number = null

  constructor (context?: Record<string, any>) {
    super(context)
    Object.assign(this, context)
  }
}