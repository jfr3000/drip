const isObject = (obj) => obj === Object(obj)

export default function replaceWithNullIfAllPropertiesAreNull(obj) {
  Object.keys(obj).forEach((key) => {
    if (!isObject(obj[key])) return
    if (Object.values(obj[key]).every((val) => val === null)) {
      obj[key] = null
      return
    }
    replaceWithNullIfAllPropertiesAreNull(obj[key])
  })
}
