import { getArgs } from './get-args'
import { curry } from './curry'
import { reduce, reduceRight } from './reduce'

const composePass = (obj, fx) => fx(obj)

export const composeDown = getArgs(function (funcs) {
  return input => reduce(funcs, composePass, input)
})

export const compose = getArgs(function (funcs) {
  return input => reduceRight(funcs, composePass, input)
})
