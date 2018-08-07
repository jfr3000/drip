import { db } from '../../db'

export default function getColumnNamesForCsv() {
  return getPrefixedKeys('CycleDay')

  function getPrefixedKeys(schemaName, prefix) {
    const schema = db.schema.find(x => x.name === schemaName).properties
    return Object.keys(schema).reduce((acc, key) => {
      const prefixedKey = prefix ? [prefix, key].join('.') : key
      const childSchemaName = schema[key].objectType
      if (!childSchemaName) {
        acc.push(prefixedKey)
        return acc
      }
      acc.push(...getPrefixedKeys(childSchemaName, prefixedKey))
      return acc
    }, [])
  }
}