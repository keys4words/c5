export class Calculator {
  /**
   * Adds two numbers
   * @param a First number
   * @param b Second number
   * @returns Sum of a and b
   */
  add(a: number, b: number): number {
    return a + b;
  }

  /**
   * Subtracts second number from first number
   * @param a First number
   * @param b Second number
   * @returns Difference of a and b
   */
  subtract(a: number, b: number): number {
    return a - b;
  }

  /**
   * Multiplies two numbers
   * @param a First number
   * @param b Second number
   * @returns Product of a and b
   */
  multiply(a: number, b: number): number {
    return a * b;
  }

  /**
   * Divides first number by second number
   * @param a Dividend
   * @param b Divisor
   * @returns Quotient of a and b
   * @throws Error if divisor is zero
   */
  divide(a: number, b: number): number {
    if (b === 0) {
      throw new Error('Division by zero is not allowed');
    }
    return a / b;
  }
}

