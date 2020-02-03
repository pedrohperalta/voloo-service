export const filteredJSON = (editableFields: string[], json: JSON): {} => {
  return Object.keys(json)
    .filter(key => editableFields.includes(key))
    .map((key: string) => {
      const obj = {}
      obj[key] = json[key]
      return obj
    })
    .reduce((previous, current) => ({
      ...previous,
      ...current
    }), {})
}
