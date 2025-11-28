const DEFAULT_PAGE_ROUTE = 'view/home/home-page'

// all units of time are milliseconds
const PAGE_RELOAD_TIME_RANDOM_MAX: number = 500 // max time between each page reload
const RESPONSE_TIME_START: number = 1000 // the first run time. E.g. 1000
const RESPONSE_TIME_DECREMENT: number = 50 // amount of time to decrement on each reload, set to zero for no decrement
const PAGE_RELOAD_TIME: number = 1000 // time between each page reload

// validadtion
if (PAGE_RELOAD_TIME_RANDOM_MAX <= 0) throw new Error(`PAGE_RELOAD_TIME_RANDOM_MAX "${PAGE_RELOAD_TIME_RANDOM_MAX}" must be greater than zero`)
if (RESPONSE_TIME_DECREMENT < 0 || RESPONSE_TIME_DECREMENT > RESPONSE_TIME_START) throw new Error(`RESPONSE_TIME_DECREMENT "${RESPONSE_TIME_DECREMENT}" must be greater than or equal to zero and less than RESPONSE_TIME_START`)
if (PAGE_RELOAD_TIME <= 0) throw new Error(`PAGE_RELOAD_TIME "${PAGE_RELOAD_TIME}" must be greater than zero`)

// final export
export {
  DEFAULT_PAGE_ROUTE,
  PAGE_RELOAD_TIME_RANDOM_MAX,
  RESPONSE_TIME_START,
  RESPONSE_TIME_DECREMENT,
  PAGE_RELOAD_TIME,
}