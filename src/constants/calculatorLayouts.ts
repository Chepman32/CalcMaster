// Calculator button layouts for different modes

export interface ButtonConfig {
  label: string;
  value: string;
  type: 'number' | 'operator' | 'function' | 'special';
  span?: number;
  secondary?: string; // For 2nd function mode
}

export const basicLayout: ButtonConfig[][] = [
  [
    { label: 'AC', value: 'clear', type: 'special' },
    { label: '+/-', value: 'negate', type: 'function' },
    { label: '%', value: 'percent', type: 'function' },
    { label: '÷', value: '/', type: 'operator' },
  ],
  [
    { label: '7', value: '7', type: 'number' },
    { label: '8', value: '8', type: 'number' },
    { label: '9', value: '9', type: 'number' },
    { label: '×', value: '*', type: 'operator' },
  ],
  [
    { label: '4', value: '4', type: 'number' },
    { label: '5', value: '5', type: 'number' },
    { label: '6', value: '6', type: 'number' },
    { label: '-', value: '-', type: 'operator' },
  ],
  [
    { label: '1', value: '1', type: 'number' },
    { label: '2', value: '2', type: 'number' },
    { label: '3', value: '3', type: 'number' },
    { label: '+', value: '+', type: 'operator' },
  ],
  [
    { label: '0', value: '0', type: 'number', span: 2 },
    { label: '.', value: '.', type: 'number' },
    { label: '=', value: 'equals', type: 'special' },
  ],
];

export const scientificLayout: ButtonConfig[][] = [
  [
    { label: '2nd', value: '2nd', type: 'special' },
    { label: 'sin', value: 'sin', type: 'function', secondary: 'asin' },
    { label: 'cos', value: 'cos', type: 'function', secondary: 'acos' },
    { label: 'tan', value: 'tan', type: 'function', secondary: 'atan' },
    { label: 'log', value: 'log10', type: 'function', secondary: '10^' },
  ],
  [
    { label: 'x²', value: 'square', type: 'function' },
    { label: 'x³', value: 'cube', type: 'function' },
    { label: 'xʸ', value: 'pow', type: 'function' },
    { label: '√', value: 'sqrt', type: 'function', secondary: 'cbrt' },
    { label: 'ln', value: 'log', type: 'function', secondary: 'e^' },
  ],
  [
    { label: '(', value: '(', type: 'operator' },
    { label: ')', value: ')', type: 'operator' },
    { label: 'π', value: 'pi', type: 'function' },
    { label: 'e', value: 'e', type: 'function' },
    { label: 'AC', value: 'clear', type: 'special' },
  ],
  [
    { label: '7', value: '7', type: 'number' },
    { label: '8', value: '8', type: 'number' },
    { label: '9', value: '9', type: 'number' },
    { label: '÷', value: '/', type: 'operator' },
    { label: '←', value: 'backspace', type: 'special' },
  ],
  [
    { label: '4', value: '4', type: 'number' },
    { label: '5', value: '5', type: 'number' },
    { label: '6', value: '6', type: 'number' },
    { label: '×', value: '*', type: 'operator' },
    { label: '+/-', value: 'negate', type: 'function' },
  ],
  [
    { label: '1', value: '1', type: 'number' },
    { label: '2', value: '2', type: 'number' },
    { label: '3', value: '3', type: 'number' },
    { label: '-', value: '-', type: 'operator' },
    { label: '%', value: 'percent', type: 'function' },
  ],
  [
    { label: '0', value: '0', type: 'number' },
    { label: '.', value: '.', type: 'number' },
    { label: 'EXP', value: 'exp', type: 'function' },
    { label: '+', value: '+', type: 'operator' },
    { label: '=', value: 'equals', type: 'special' },
  ],
];

export const programmerLayout: ButtonConfig[][] = [
  [
    { label: 'HEX', value: 'hex', type: 'special' },
    { label: 'DEC', value: 'dec', type: 'special' },
    { label: 'OCT', value: 'oct', type: 'special' },
    { label: 'BIN', value: 'bin', type: 'special' },
  ],
  [
    { label: 'A', value: 'A', type: 'number' },
    { label: 'B', value: 'B', type: 'number' },
    { label: 'C', value: 'C', type: 'number' },
    { label: 'D', value: 'D', type: 'number' },
  ],
  [
    { label: 'E', value: 'E', type: 'number' },
    { label: 'F', value: 'F', type: 'number' },
    { label: '<<', value: 'lshift', type: 'operator' },
    { label: '>>', value: 'rshift', type: 'operator' },
  ],
  [
    { label: 'AND', value: 'and', type: 'operator' },
    { label: 'OR', value: 'or', type: 'operator' },
    { label: 'XOR', value: 'xor', type: 'operator' },
    { label: 'NOT', value: 'not', type: 'operator' },
  ],
  [
    { label: '7', value: '7', type: 'number' },
    { label: '8', value: '8', type: 'number' },
    { label: '9', value: '9', type: 'number' },
    { label: 'AC', value: 'clear', type: 'special' },
  ],
  [
    { label: '4', value: '4', type: 'number' },
    { label: '5', value: '5', type: 'number' },
    { label: '6', value: '6', type: 'number' },
    { label: '←', value: 'backspace', type: 'special' },
  ],
  [
    { label: '1', value: '1', type: 'number' },
    { label: '2', value: '2', type: 'number' },
    { label: '3', value: '3', type: 'number' },
    { label: '=', value: 'equals', type: 'special' },
  ],
  [
    { label: '0', value: '0', type: 'number', span: 2 },
    { label: '.', value: '.', type: 'number' },
    { label: '+', value: '+', type: 'operator' },
  ],
];
