import { MEASURE_UNITS } from "../constants/measureUnits";

class UnitsFormat {
  toLitre(volume: number, unit: string): number | null {
    switch (unit) {
      case "l":
        return volume;
        break;
      case "ml":
        if (volume !== 0) return volume / 1000;
        else return 0;
        break;
      default:
        return null;
        break;
    }
  }

  // //convert l to ml
  toMl(volume: number, unit: string): number | null {
    switch (unit) {
      case "l":
        return volume * 1000;
        break;
      case "ml":
        return volume;
        break;
      default:
        return null;
        break;
    }
  }

  //weigth
  //convert grams to kg
  toKg(weigth: number, unit: string): number | null {
    switch (unit) {
      case "g":
        if (weigth !== 0) return weigth / 1000;
        else return 0;
        break;
      case "kg":
        return weigth;
        break;
      default:
        return null;
        break;
    }
  }

  //convert kg to grams
  toGrams(weigth: number, unit: string): number | null {
    switch (unit) {
      case "kg":
        return weigth * 1000;
        break;
      case "g":
        return weigth;
        break;
      default:
        return null;
        break;
    }
  }
}

//volume

//convert ml to l
export default UnitsFormat;
