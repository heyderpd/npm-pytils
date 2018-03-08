export const toArray = match => match.slice(1, match.length)

export const unmountRegEx = RegEX => {
  RegEX = RegEX.toString()
  const getFlags = /\/(\w*)$/m
  const [ flags ] = toArray(getFlags.exec(RegEX))
  RegEX = RegEX
    .substr(1, RegEX.length)
    .replace(getFlags, '')
  return [ RegEX, flags ]
}

export const reCompile = RX => {
  const [ RegEX, flags ] = unmountRegEx(RX)
  return new RegExp(RegEX, flags)
}

export const ifMatch = (RX, fx) => {
  const regX = reCompile(RX)
  return word => {
    regX.lastIndex = 0
    let match
    if (match = regX.exec(word)) {
      return fx(toArray(match))
    }
  }
}

export const whileMatch = (RX, fx) => {
  const regX = reCompile(RX)
  return word => {
    regX.lastIndex = 0
    const result = []
    let match
    while (match = regX.exec(word)) {
      result.push(
        fx(toArray(match)))
    }
    return result
  }
}
