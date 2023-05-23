export function formatCoffeeSecondaryInfo(coffee) {
    const parts = []
    if (coffee.coffeeOrigin) {
        parts.push(coffee.coffeeOrigin)
    }
    if (coffee.coffeeRoaster) {
        parts.push(coffee.coffeeRoaster) 
    }
    return parts.join(', ')
}