import { describe, it, expect, beforeEach } from 'vitest';
import { Calculator } from './Calculator';

describe('Calculator', () => {
  let calculator: Calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  describe('add', () => {
    it('should add two positive numbers correctly', () => {
      expect(calculator.add(5, 3)).toBe(8);
      expect(calculator.add(10, 15)).toBe(25);
      expect(calculator.add(100, 200)).toBe(300);
    });

    it('should add two negative numbers correctly', () => {
      expect(calculator.add(-5, -3)).toBe(-8);
      expect(calculator.add(-10, -15)).toBe(-25);
    });

    it('should add positive and negative numbers correctly', () => {
      expect(calculator.add(5, -3)).toBe(2);
      expect(calculator.add(-5, 3)).toBe(-2);
      expect(calculator.add(10, -15)).toBe(-5);
    });

    it('should add zero correctly', () => {
      expect(calculator.add(5, 0)).toBe(5);
      expect(calculator.add(0, 5)).toBe(5);
      expect(calculator.add(0, 0)).toBe(0);
    });

    it('should handle decimal numbers correctly', () => {
      expect(calculator.add(1.5, 2.5)).toBe(4);
      expect(calculator.add(0.1, 0.2)).toBeCloseTo(0.3, 10);
      expect(calculator.add(3.14, 2.86)).toBe(6);
    });

    it('should handle large numbers', () => {
      expect(calculator.add(Number.MAX_SAFE_INTEGER, 0)).toBe(Number.MAX_SAFE_INTEGER);
      expect(calculator.add(1000000, 2000000)).toBe(3000000);
    });
  });

  describe('subtract', () => {
    it('should subtract two positive numbers correctly', () => {
      expect(calculator.subtract(5, 3)).toBe(2);
      expect(calculator.subtract(10, 15)).toBe(-5);
      expect(calculator.subtract(100, 50)).toBe(50);
    });

    it('should subtract two negative numbers correctly', () => {
      expect(calculator.subtract(-5, -3)).toBe(-2);
      expect(calculator.subtract(-10, -15)).toBe(5);
    });

    it('should subtract positive and negative numbers correctly', () => {
      expect(calculator.subtract(5, -3)).toBe(8);
      expect(calculator.subtract(-5, 3)).toBe(-8);
      expect(calculator.subtract(10, -15)).toBe(25);
    });

    it('should subtract zero correctly', () => {
      expect(calculator.subtract(5, 0)).toBe(5);
      expect(calculator.subtract(0, 5)).toBe(-5);
      expect(calculator.subtract(0, 0)).toBe(0);
    });

    it('should handle decimal numbers correctly', () => {
      expect(calculator.subtract(5.5, 2.3)).toBeCloseTo(3.2, 10);
      expect(calculator.subtract(0.3, 0.1)).toBeCloseTo(0.2, 10);
      expect(calculator.subtract(10.5, 3.5)).toBe(7);
    });

    it('should handle large numbers', () => {
      expect(calculator.subtract(Number.MAX_SAFE_INTEGER, 0)).toBe(Number.MAX_SAFE_INTEGER);
      expect(calculator.subtract(1000000, 500000)).toBe(500000);
    });
  });

  describe('multiply', () => {
    it('should multiply two positive numbers correctly', () => {
      expect(calculator.multiply(5, 3)).toBe(15);
      expect(calculator.multiply(10, 15)).toBe(150);
      expect(calculator.multiply(4, 25)).toBe(100);
    });

    it('should multiply two negative numbers correctly', () => {
      expect(calculator.multiply(-5, -3)).toBe(15);
      expect(calculator.multiply(-10, -15)).toBe(150);
    });

    it('should multiply positive and negative numbers correctly', () => {
      expect(calculator.multiply(5, -3)).toBe(-15);
      expect(calculator.multiply(-5, 3)).toBe(-15);
      expect(calculator.multiply(10, -15)).toBe(-150);
    });

    it('should multiply by zero correctly', () => {
      expect(calculator.multiply(5, 0)).toBe(0);
      expect(calculator.multiply(0, 5)).toBe(0);
      expect(calculator.multiply(0, 0)).toBe(0);
    });

    it('should multiply by one correctly', () => {
      expect(calculator.multiply(5, 1)).toBe(5);
      expect(calculator.multiply(1, 5)).toBe(5);
    });

    it('should handle decimal numbers correctly', () => {
      expect(calculator.multiply(2.5, 4)).toBe(10);
      expect(calculator.multiply(0.5, 0.5)).toBe(0.25);
      expect(calculator.multiply(3.14, 2)).toBeCloseTo(6.28, 10);
    });

    it('should handle large numbers', () => {
      expect(calculator.multiply(1000, 1000)).toBe(1000000);
      expect(calculator.multiply(Number.MAX_SAFE_INTEGER, 1)).toBe(Number.MAX_SAFE_INTEGER);
    });
  });

  describe('divide', () => {
    it('should divide two positive numbers correctly', () => {
      expect(calculator.divide(10, 2)).toBe(5);
      expect(calculator.divide(15, 3)).toBe(5);
      expect(calculator.divide(100, 4)).toBe(25);
    });

    it('should divide two negative numbers correctly', () => {
      expect(calculator.divide(-10, -2)).toBe(5);
      expect(calculator.divide(-15, -3)).toBe(5);
    });

    it('should divide positive and negative numbers correctly', () => {
      expect(calculator.divide(10, -2)).toBe(-5);
      expect(calculator.divide(-10, 2)).toBe(-5);
      expect(calculator.divide(15, -3)).toBe(-5);
    });

    it('should divide by one correctly', () => {
      expect(calculator.divide(5, 1)).toBe(5);
      expect(calculator.divide(-5, 1)).toBe(-5);
    });

    it('should handle decimal results correctly', () => {
      expect(calculator.divide(1, 2)).toBe(0.5);
      expect(calculator.divide(1, 3)).toBeCloseTo(0.3333333333, 10);
      expect(calculator.divide(5, 2)).toBe(2.5);
    });

    it('should handle decimal divisors and dividends correctly', () => {
      expect(calculator.divide(5.5, 2.5)).toBe(2.2);
      expect(calculator.divide(10.5, 3.5)).toBe(3);
      expect(calculator.divide(0.5, 0.25)).toBe(2);
    });

    it('should handle large numbers', () => {
      expect(calculator.divide(1000000, 1000)).toBe(1000);
      expect(calculator.divide(Number.MAX_SAFE_INTEGER, 1)).toBe(Number.MAX_SAFE_INTEGER);
    });

    it('should throw error when dividing by zero', () => {
      expect(() => calculator.divide(5, 0)).toThrow('Division by zero is not allowed');
      expect(() => calculator.divide(-5, 0)).toThrow('Division by zero is not allowed');
      expect(() => calculator.divide(0, 0)).toThrow('Division by zero is not allowed');
      expect(() => calculator.divide(100, 0)).toThrow('Division by zero is not allowed');
    });

    it('should handle zero as dividend correctly', () => {
      expect(calculator.divide(0, 5)).toBe(0);
      // Handle JavaScript's -0 quirk: dividing 0 by negative returns -0
      // Use === comparison which treats 0 and -0 as equal
      expect(calculator.divide(0, -5) === 0).toBe(true);
      expect(calculator.divide(0, 100)).toBe(0);
    });
  });
});

