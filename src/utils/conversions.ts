// Unit conversion utilities

export type ConversionCategory =
  | 'length'
  | 'weight'
  | 'temperature'
  | 'area'
  | 'volume'
  | 'speed'
  | 'time'
  | 'energy'
  | 'pressure'
  | 'data';

export interface UnitDefinition {
  name: string;
  symbol: string;
  toBase: (value: number) => number;
  fromBase: (value: number) => number;
}

export const conversionUnits: Record<ConversionCategory, UnitDefinition[]> = {
  length: [
    { name: 'Millimeter', symbol: 'mm', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    { name: 'Centimeter', symbol: 'cm', toBase: (v) => v / 100, fromBase: (v) => v * 100 },
    { name: 'Meter', symbol: 'm', toBase: (v) => v, fromBase: (v) => v },
    { name: 'Kilometer', symbol: 'km', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    { name: 'Inch', symbol: 'in', toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
    { name: 'Foot', symbol: 'ft', toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
    { name: 'Yard', symbol: 'yd', toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
    { name: 'Mile', symbol: 'mi', toBase: (v) => v * 1609.34, fromBase: (v) => v / 1609.34 },
  ],
  weight: [
    { name: 'Milligram', symbol: 'mg', toBase: (v) => v / 1000000, fromBase: (v) => v * 1000000 },
    { name: 'Gram', symbol: 'g', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    { name: 'Kilogram', symbol: 'kg', toBase: (v) => v, fromBase: (v) => v },
    { name: 'Ounce', symbol: 'oz', toBase: (v) => v * 0.0283495, fromBase: (v) => v / 0.0283495 },
    { name: 'Pound', symbol: 'lb', toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592 },
    { name: 'Ton', symbol: 'ton', toBase: (v) => v * 907.185, fromBase: (v) => v / 907.185 },
  ],
  temperature: [
    { name: 'Celsius', symbol: '°C', toBase: (v) => v, fromBase: (v) => v },
    { name: 'Fahrenheit', symbol: '°F', toBase: (v) => (v - 32) * 5 / 9, fromBase: (v) => v * 9 / 5 + 32 },
    { name: 'Kelvin', symbol: 'K', toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
  ],
  area: [
    { name: 'Square Meter', symbol: 'm²', toBase: (v) => v, fromBase: (v) => v },
    { name: 'Square Foot', symbol: 'ft²', toBase: (v) => v * 0.092903, fromBase: (v) => v / 0.092903 },
    { name: 'Acre', symbol: 'acre', toBase: (v) => v * 4046.86, fromBase: (v) => v / 4046.86 },
    { name: 'Hectare', symbol: 'ha', toBase: (v) => v * 10000, fromBase: (v) => v / 10000 },
  ],
  volume: [
    { name: 'Milliliter', symbol: 'ml', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    { name: 'Liter', symbol: 'L', toBase: (v) => v, fromBase: (v) => v },
    { name: 'Gallon', symbol: 'gal', toBase: (v) => v * 3.78541, fromBase: (v) => v / 3.78541 },
    { name: 'Quart', symbol: 'qt', toBase: (v) => v * 0.946353, fromBase: (v) => v / 0.946353 },
    { name: 'Pint', symbol: 'pt', toBase: (v) => v * 0.473176, fromBase: (v) => v / 0.473176 },
  ],
  speed: [
    { name: 'Meters/Second', symbol: 'm/s', toBase: (v) => v, fromBase: (v) => v },
    { name: 'Kilometers/Hour', symbol: 'km/h', toBase: (v) => v / 3.6, fromBase: (v) => v * 3.6 },
    { name: 'Miles/Hour', symbol: 'mph', toBase: (v) => v * 0.44704, fromBase: (v) => v / 0.44704 },
    { name: 'Knots', symbol: 'knots', toBase: (v) => v * 0.514444, fromBase: (v) => v / 0.514444 },
  ],
  time: [
    { name: 'Second', symbol: 's', toBase: (v) => v, fromBase: (v) => v },
    { name: 'Minute', symbol: 'min', toBase: (v) => v * 60, fromBase: (v) => v / 60 },
    { name: 'Hour', symbol: 'hr', toBase: (v) => v * 3600, fromBase: (v) => v / 3600 },
    { name: 'Day', symbol: 'day', toBase: (v) => v * 86400, fromBase: (v) => v / 86400 },
    { name: 'Week', symbol: 'week', toBase: (v) => v * 604800, fromBase: (v) => v / 604800 },
    { name: 'Year', symbol: 'year', toBase: (v) => v * 31536000, fromBase: (v) => v / 31536000 },
  ],
  energy: [
    { name: 'Joule', symbol: 'J', toBase: (v) => v, fromBase: (v) => v },
    { name: 'Kilojoule', symbol: 'kJ', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    { name: 'Calorie', symbol: 'cal', toBase: (v) => v * 4.184, fromBase: (v) => v / 4.184 },
    { name: 'Kilocalorie', symbol: 'kcal', toBase: (v) => v * 4184, fromBase: (v) => v / 4184 },
    { name: 'Watt-hour', symbol: 'Wh', toBase: (v) => v * 3600, fromBase: (v) => v / 3600 },
    { name: 'Kilowatt-hour', symbol: 'kWh', toBase: (v) => v * 3600000, fromBase: (v) => v / 3600000 },
  ],
  pressure: [
    { name: 'Pascal', symbol: 'Pa', toBase: (v) => v, fromBase: (v) => v },
    { name: 'Bar', symbol: 'bar', toBase: (v) => v * 100000, fromBase: (v) => v / 100000 },
    { name: 'PSI', symbol: 'psi', toBase: (v) => v * 6894.76, fromBase: (v) => v / 6894.76 },
    { name: 'Atmosphere', symbol: 'atm', toBase: (v) => v * 101325, fromBase: (v) => v / 101325 },
  ],
  data: [
    { name: 'Bit', symbol: 'bit', toBase: (v) => v, fromBase: (v) => v },
    { name: 'Byte', symbol: 'B', toBase: (v) => v * 8, fromBase: (v) => v / 8 },
    { name: 'Kilobyte', symbol: 'KB', toBase: (v) => v * 8192, fromBase: (v) => v / 8192 },
    { name: 'Megabyte', symbol: 'MB', toBase: (v) => v * 8388608, fromBase: (v) => v / 8388608 },
    { name: 'Gigabyte', symbol: 'GB', toBase: (v) => v * 8589934592, fromBase: (v) => v / 8589934592 },
    { name: 'Terabyte', symbol: 'TB', toBase: (v) => v * 8796093022208, fromBase: (v) => v / 8796093022208 },
  ],
};

export const convert = (
  value: number,
  fromUnit: UnitDefinition,
  toUnit: UnitDefinition
): number => {
  const baseValue = fromUnit.toBase(value);
  return toUnit.fromBase(baseValue);
};
