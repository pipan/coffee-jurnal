export default function ellipsis (value, limit) {
    if (value.length > limit) {
      return value.substr(0, limit) + "..."
    }
    return value
}