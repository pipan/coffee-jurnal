export function formatCoffeeSecondaryInfo(coffee) {
    const parts = []
    if (coffee.coffeeOrigin || coffee.coffeeRegion) {
        let text = coffee.coffeeOrigin || ''
        if (coffee.coffeeRegion) {
            text += `: ${coffee.coffeeRegion}`
        }
        parts.push(text)
    }
    if (coffee.coffeeRoaster) {
        parts.push(coffee.coffeeRoaster) 
    }
    return parts.join(', ')
}