import { getArgs } from './get-args'

const partialCurry = function (fx, fxLength, fixedsArgs = []) {
  return getArgs(function (inputArgs) {
    const args = fixedsArgs.concat(inputArgs)

    if (args.length >= fxLength) {
      return fx.apply(this, args)

    } else {
      return partialCurry(fx, fxLength, args)
    }
  })
}

export const curry = function (fx) {
  return partialCurry(fx, fx.length, [])
}
