export default function round (value, precision) {
    precision = precision || 0
    const power = Math.pow(10, precision)
    return Math.round(value * power) / power
}