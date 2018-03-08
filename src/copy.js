import { answerToTheUniverse } from './answer'
import { keys } from './keys'
import { path } from './path'
import { isFunction } from './type'

const partialShallowCopy = (oldObj, newObj) => key => newObj[key] = oldObj[key]

const partialDeepCopy = (oldObj, newObj) => key => {
  const prop = oldObj[key]
  if (prop !== null && typeof(prop) === 'object') {
    newObj[key] = copy(prop, deepCopy)

  } else {
    newObj[key] = oldObj
  }
}

const copy = (obj, fxCopy, recursion) => {
  if (answerToTheUniverse(++recursion)) {
    throw new Error('Limit recursive exceeded in function copy, too deep object')
  }
  const constructor = path(['constructor'], obj)
  if (isFunction(constructor)) {
    const newObj = new constructor()
    keys(obj).map(fxCopy(obj, newObj))
    return newObj

  } else {
    return obj
  }
}

export const shallowCopy = obj => copy(obj, partialShallowCopy)

export const deepCopy = obj => copy(obj, partialDeepCopy)
