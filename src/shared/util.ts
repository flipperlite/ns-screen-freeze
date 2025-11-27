/**
 * A helper utility abstract class
 */
export abstract class Util {
  // ==================================
  // Static methods
  // ==================================

  /**
   * Gets the next letter in the alphabet with loop around from "Z" to "A"
   * @param current The current letter in the alphabet
   * @returns The next letter in the alphabet. If "Z", will loop around to "A"
   */
  static getNextLetter (current: string): string {
    if (!current) return 'A'
    
    // validate
    if (typeof current !== 'string') throw new Error(`Arg current must be a string (typeof ${typeof current})`)
    if (current.length !== 1) throw new Error(`Arg current must a single character string: ${current}`)
    
    const alphas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
    current = current.toUpperCase()
    let index = alphas.indexOf(current)
    if (index === -1) throw new Error(`Arg current must be a letter from A to Z: ${current}`)
    index++
    if (index > 25) index = 0
    return alphas[index]
  }

  /**
   * Async function to mock or simulate an API fetch and return data of any generic type T value
   * USAGE: vm.text = await mock('whatever', 500)
   * USAGE: vm.message = await Util.mock(new Date().toISOString(), responseTime, () => { vm.isWaiting = false; console.info(responseTime + ' ms: vm.isWaiting = false') })
   * @param value The generic type T value you want to return after the timeoutMs
   * @param timeoutMs The timeout in units of milliseconds
   * @param fn An optional no argument function to run when setTimeout expires
   * @returns A Promise of type T to get using the "await" keyword
   */
  static async mock <T> (value: T, timeoutMs: number, fn?: () => void): Promise<T> {
    return new Promise<T>(resolve => setTimeout(() => {
      if (fn instanceof Function) fn()
      resolve(value)
    }
    , timeoutMs))
  }

  /**
   * A random integer generator (From AI)
   * @param max The inclusive maximum number to return
   * @param min The inclusive minimum number to return
   * @returns An random integer between min and max inclusive both
   */
  static randomInt (max: number, min: number = 0): number {
    min = Math.ceil(min) // Ensure min is an integer (rounds up)
    max = Math.floor(max) // Ensure max is an integer (rounds down)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  /**
   * A random float generator (From AI)
   * @param max The exclusive maximum number to return
   * @param min The inclusive minimum number to return
   * @returns An random float between inclusive min and exclusive max
   */
  static randomFloat (max: number, min: number = 0): number {
    return Math.random() * (max - min) + min
  }
}
