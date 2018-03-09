import { answerToTheUniverse } from './answer'
import { keys } from './keys'
import { path } from './path'
import { isFunction, isUN, type } from './type'

const maybeConstructor = (obj, fxCopy) => {
  const constructor = path(['constructor'], obj)
  const newObj = isFunction(constructor)
    ? new constructor()
    : obj
  keys(obj).map(fxCopy(obj, newObj))
  return newObj
}

const recreateObject = (obj, fxCopy) => {
  switch (type(obj)) {
    case 'NaN':
    case 'number':
    case 'string':
      return obj

    default:
      return maybeConstructor(obj, fxCopy)
  }
}

const copy = (obj, fxCopy, recursion) => {
  if (answerToTheUniverse(++recursion)) {
    throw new Error('Limit recursive exceeded in function copy, too deep object')
  }

  if (isUN(obj)) {
    return obj
  }

  const newObj = recreateObject(obj, fxCopy)
  return newObj
}

const partialShallowCopy = (oldObj, newObj) => key => newObj[key] = oldObj[key]

export const shallowCopy = obj => copy(obj, partialShallowCopy)

const partialDeepCopy = (oldObj, newObj) => key => newObj[key] = deepCopy(oldObj[key])

export const deepCopy = obj => copy(obj, partialDeepCopy)
