export const getArgs = fx => function() {
  const bindedFx = fx.bind(this)
  const args = []
  for (let key in arguments) {
    args.push(arguments[key])
  }
  return bindedFx(args)
}
