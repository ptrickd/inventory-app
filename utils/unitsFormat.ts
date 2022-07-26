import { MEASURE_UNITS } from '../constants/measureUnits'

//volume

//convert ml to l
function toLitre(volume: number, unit: string): number | null {
    switch (unit) {
        case 'l':
            return volume
            break
        case 'ml':
            return volume / 1000
            break
        default:
            return null
            break
    }
}

// //convert l to ml
function toMl(volume: number, unit: string): number | null {
    switch (unit) {
        case 'l':
            return volume * 1000
            break
        case 'ml':
            return volume
            break
        default:
            return null
            break
    }
}


//weigth
//convert grams to kg
function toKg(weigth: number, unit: string): number | null {

    switch (unit) {
        case 'g':
            return weigth / 1000
            break
        case 'kg':
            return weigth
            break
        default:
            return null
            break
    }

}

//convert kg to grams
function toGrams(weigth: number, unit: string): number | null {
    switch (unit) {
        case 'kg':
            return weigth * 1000
            break
        case 'g':
            return weigth
            break
        default:
            return null
            break
    }
}
