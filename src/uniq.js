export const uniqWith = (comparator, list) => {
  const outputList = []
  map(
    itemA => {
      const equals = map(
          itemB => comparator(itemA, itemB)
        )(outputList)
        .filter(item => item)

      equals && equals.length === 0 && outputList.push(itemA)
    })(list)
  return outputList
}

export const uniq = list => {
  const New = []
  list.map(
    item => New.indexOf(item) < 0
      ? New.push(item)
      : null)
  return New
}
