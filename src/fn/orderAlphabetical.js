export default function orderAlphabetical (value, direction) {
    direction = direction || 'asc'
    const directions = {
      asc: [-1, 0, 1],
      desc: [1, 0, -1]
    }
    let ordered = [...value]
    ordered.sort((a, b) => {
      const aLower = a.toLowerCase()
      const bLower = b.toLowerCase()
      if (aLower < bLower) {
        return directions[direction][0]
      } else if (aLower > bLower) {
        return directions[direction][2]
      }
      return directions[direction][1]
    })
    return ordered
  }