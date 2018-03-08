import { getArgs } from './get-args'

const partialCurry = (fx, fixedsArgs = []) => getArgs(function (inputArgs) {
  const args = fixedsArgs.concat(inputArgs)
  if (fx.length >= args) {
    return fx.apply(this, args)

  } else {
    const bindedCurry = partialCurry.bind(this)
    return bindedCurry(fx, args)
  }
})

export const curry = function (fx) {
  const bindedCurry = partialCurry.bind(this)
  return partialCurry(fx)
}
