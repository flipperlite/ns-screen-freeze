import { ObservableProperty } from "~/shared/observable-property-decorator";
import { ViewModel } from "~/shared/view-model";

export class AsyncViewModel extends ViewModel {
  @ObservableProperty() id: string = null
  @ObservableProperty() responseTime: number = null

  constructor (context?: Record<string, any>) {
    super(context)
    Object.assign(this, context)
  }
}
