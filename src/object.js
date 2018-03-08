
import answerToTheUniverse from './answer'

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
    throw new Error('Limit recursive exceeded, too deep object')
  }
  const newObj = new obj.constructor()
  obj.keys().map(fxCopy(obj, newObj))
  return newObj
}

export const shallowCopy = obj => copy(obj, partialShallowCopy)

export const deepCopy = obj => copy(obj, partialDeepCopy)
