import { create, all } from 'mathjs';
import { AngleMode, NumberBase } from '../types';

const math = create(all);

export class CalculatorEngine {
  private angleMode: AngleMode = 'deg';
  private is2ndMode: boolean = false;

  setAngleMode(mode: AngleMode) {
    this.angleMode = mode;
    math.config({
      angles: mode === 'deg' ? 'deg' : mode === 'rad' ? 'rad' : 'grad',
    });
  }

  set2ndMode(enabled: boolean) {
    this.is2ndMode = enabled;
  }

  evaluate(expression: string): string {
    try {
      // Replace special symbols with math.js compatible functions
      let processedExpr = expression
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, 'pi')
        .replace(/√/g, 'sqrt');

      const result = math.evaluate(processedExpr);

      // Format result
      if (typeof result === 'number') {
        if (Math.abs(result) > 1e15 || (Math.abs(result) < 1e-15 && result !== 0)) {
          return result.toExponential(10);
        }
        return this.formatNumber(result);
      }

      return String(result);
    } catch (error) {
      throw new Error('Invalid expression');
    }
  }

  evaluateFunction(func: string, value: number): number {
    try {
      switch (func) {
        case 'sin':
          return math.sin(value);
        case 'cos':
          return math.cos(value);
        case 'tan':
          return math.tan(value);
        case 'asin':
          return math.asin(value);
        case 'acos':
          return math.acos(value);
        case 'atan':
          return math.atan(value);
        case 'log10':
          return math.log10(value);
        case 'log':
          return math.log(value);
        case 'sqrt':
          return math.sqrt(value);
        case 'cbrt':
          return math.cbrt(value);
        case 'square':
          return math.pow(value, 2);
        case 'cube':
          return math.pow(value, 3);
        default:
          throw new Error('Unknown function');
      }
    } catch (error) {
      throw new Error('Invalid operation');
    }
  }

  private formatNumber(num: number, decimals: number = 10): string {
    // Remove trailing zeros
    const str = num.toFixed(decimals);
    return parseFloat(str).toString();
  }

  // Programmer calculator functions
  convertBase(value: string, fromBase: NumberBase, toBase: NumberBase): string {
    try {
      // Convert from source base to decimal
      let decimal: number;
      switch (fromBase) {
        case 'bin':
          decimal = parseInt(value, 2);
          break;
        case 'oct':
          decimal = parseInt(value, 8);
          break;
        case 'dec':
          decimal = parseInt(value, 10);
          break;
        case 'hex':
          decimal = parseInt(value, 16);
          break;
      }

      if (isNaN(decimal)) {
        throw new Error('Invalid number');
      }

      // Convert from decimal to target base
      switch (toBase) {
        case 'bin':
          return decimal.toString(2).toUpperCase();
        case 'oct':
          return decimal.toString(8).toUpperCase();
        case 'dec':
          return decimal.toString(10);
        case 'hex':
          return decimal.toString(16).toUpperCase();
      }
    } catch (error) {
      throw new Error('Invalid conversion');
    }
  }

  bitwiseAnd(a: number, b: number): number {
    return a & b;
  }

  bitwiseOr(a: number, b: number): number {
    return a | b;
  }

  bitwiseXor(a: number, b: number): number {
    return a ^ b;
  }

  bitwiseNot(a: number, wordSize: number = 32): number {
    const mask = (1 << wordSize) - 1;
    return (~a) & mask;
  }

  leftShift(a: number, bits: number): number {
    return a << bits;
  }

  rightShift(a: number, bits: number): number {
    return a >> bits;
  }

  // Percentage calculations
  calculatePercentage(value: number, percentage: number): number {
    return (value * percentage) / 100;
  }
}

export const calculatorEngine = new CalculatorEngine();
