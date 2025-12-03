import { ObservableProperty } from "~/shared/observable-property-decorator";
import { ViewModel } from "~/shared/view-model";

export class AsyncViewModel extends ViewModel {
  @ObservableProperty() id: string = null
  @ObservableProperty() responseTime: number = null
  @ObservableProperty() loopStatus: string = 'Tap on screen to stop the loop.'

  constructor (context?: Record<string, any>) {
    super(context)
    Object.assign(this, context) // must exist in sub class and not super class due to new props in sub class get defaulted/initialized/overwritten after the super(context) line
  }
}
