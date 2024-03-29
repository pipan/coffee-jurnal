import { CoffeePropertyAdapter } from "./adapters/CoffeePropertyAdapter"
import { DateIntervalAdapter } from "./adapters/DateIntervalAdapter"
import { ListAdapters } from "./adapters/ListAdapters"
import { CoffeePropertyFilter } from "./CoffeePropertyFilter"
import { DateIntervalFilter } from "./DateIntervalFilter"
import { ListFilter } from "./ListFilter"

export class CoffeeFilter {
    static fromQuery(params) {
        let ratingsInt = []
        for (const rating of params.rating || []) {
            ratingsInt.push(parseInt(rating))
        }
        return new ListFilter([
            new CoffeePropertyFilter('coffeeType', params.coffeeType),
            new CoffeePropertyFilter('coffeePlace', params.coffeePlace),
            new CoffeePropertyFilter('coffeeOrigin', params.coffeeOrigin),
            new CoffeePropertyFilter('coffeeRoaster', params.coffeeRoaster),
            new CoffeePropertyFilter('coffeeRoastIntensity', params.coffeeRoastIntensity),
            DateIntervalFilter.fromDate(params.dateSince, params.dateUntil),
            new CoffeePropertyFilter('rating', ratingsInt),
            new CoffeePropertyFilter('coffeeProcessing', params.coffeeProcessing)
        ])
    }

    static adapter() {
        return new ListAdapters([
            new DateIntervalAdapter('dateSince', 'dateUntil'),
            new CoffeePropertyAdapter('coffeeType'),
            new CoffeePropertyAdapter('coffeePlace'),
            new CoffeePropertyAdapter('coffeeOrigin'),
            new CoffeePropertyAdapter('coffeeRoaster'),
            new CoffeePropertyAdapter('coffeeRoastIntensity'),
            new CoffeePropertyAdapter('rating'),
            new CoffeePropertyAdapter('coffeeProcessing'),
        ])
    }
}