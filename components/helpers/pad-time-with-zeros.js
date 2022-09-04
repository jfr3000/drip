export default function (jsDate) {
  const vals = [jsDate.getHours(), jsDate.getMinutes()]
  return vals
    .map((val) => {
      if (parseInt(val) < 10) {
        val = `0${val}`
      }
      return val
    })
    .join(':')
}
