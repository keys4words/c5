import { test, expect } from '@playwright/test';

test.describe('Calculator E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/calculator.html');
  });

  test.describe('Number Input', () => {
    test('should display single digit when clicking number button', async ({ page }) => {
      await page.click('button:has-text("5")');
      await expect(page.locator('#display')).toHaveText('5');
    });

    test('should append multiple digits when clicking number buttons', async ({ page }) => {
      await page.click('button:has-text("1")');
      await page.click('button:has-text("2")');
      await page.click('button:has-text("3")');
      await expect(page.locator('#display')).toHaveText('123');
    });

    test('should replace zero when entering first number', async ({ page }) => {
      // Display starts with 0
      await expect(page.locator('#display')).toHaveText('0');
      
      await page.click('button:has-text("7")');
      await expect(page.locator('#display')).toHaveText('7');
    });

    test('should handle all number buttons (0-9)', async ({ page }) => {
      // Start by clicking a non-zero number to avoid the "0" replacement behavior
      // Then append all numbers including 0
      await page.click('button:has-text("1")');
      const numbers = ['0', '2', '3', '4', '5', '6', '7', '8', '9'];
      
      for (const num of numbers) {
        await page.click(`button:has-text("${num}")`);
      }
      
      // Verify all numbers were entered correctly (1 followed by 023456789)
      await expect(page.locator('#display')).toHaveText('1023456789');
    });

    test('should handle decimal point input', async ({ page }) => {
      await page.click('button:has-text("5")');
      await page.click('button:has-text(".")');
      await page.click('button:has-text("2")');
      await expect(page.locator('#display')).toHaveText('5.2');
    });

    test('should not allow multiple decimal points', async ({ page }) => {
      await page.click('button:has-text("3")');
      await page.click('button:has-text(".")');
      await page.click('button:has-text(".")');
      await page.click('button:has-text("1")');
      await expect(page.locator('#display')).toHaveText('3.1');
    });
  });

  test.describe('Basic Operations', () => {
    test('should perform addition', async ({ page }) => {
      await page.click('button:has-text("5")');
      await page.click('button:has-text("+")');
      await page.click('button:has-text("3")');
      await page.click('button:has-text("=")');
      await expect(page.locator('#display')).toHaveText('8');
    });

    test('should perform subtraction', async ({ page }) => {
      await page.click('button:has-text("1")');
      await page.click('button:has-text("0")');
      await page.click('button:has-text("-")');
      await page.click('button:has-text("4")');
      await page.click('button:has-text("=")');
      await expect(page.locator('#display')).toHaveText('6');
    });

    test('should perform multiplication', async ({ page }) => {
      await page.click('button:has-text("6")');
      await page.click('button:has-text("×")');
      await page.click('button:has-text("7")');
      await page.click('button:has-text("=")');
      await expect(page.locator('#display')).toHaveText('42');
    });

    test('should perform division', async ({ page }) => {
      await page.click('button:has-text("1")');
      await page.click('button:has-text("5")');
      await page.click('button:has-text("/")');
      await page.click('button:has-text("3")');
      await page.click('button:has-text("=")');
      // Add explicit wait for Firefox compatibility
      await page.waitForTimeout(100);
      await expect(page.locator('#display')).toHaveText('5');
    });

    test('should handle negative results', async ({ page }) => {
      await page.click('button:has-text("5")');
      await page.click('button:has-text("-")');
      await page.click('button:has-text("1")');
      await page.click('button:has-text("0")');
      await page.click('button:has-text("=")');
      await expect(page.locator('#display')).toHaveText('-5');
    });

    test('should handle decimal results', async ({ page }) => {
      await page.click('button:has-text("1")');
      await page.click('button:has-text("/")');
      await page.click('button:has-text("2")');
      await page.click('button:has-text("=")');
      await expect(page.locator('#display')).toHaveText('0.5');
    });
  });

  test.describe('Complex Calculations', () => {
    test('should handle multiple operations', async ({ page }) => {
      await page.click('button:has-text("1")');
      await page.click('button:has-text("0")');
      await page.click('button:has-text("+")');
      await page.click('button:has-text("5")');
      await page.click('button:has-text("-")');
      await page.click('button:has-text("3")');
      await page.click('button:has-text("=")');
      await expect(page.locator('#display')).toHaveText('12');
    });

    test('should handle chained operations', async ({ page }) => {
      await page.click('button:has-text("2")');
      await page.click('button:has-text("×")');
      await page.click('button:has-text("3")');
      await page.click('button:has-text("=")');
      await expect(page.locator('#display')).toHaveText('6');
      
      await page.click('button:has-text("+")');
      await page.click('button:has-text("4")');
      await page.click('button:has-text("=")');
      await expect(page.locator('#display')).toHaveText('10');
    });

    test('should handle large numbers', async ({ page }) => {
      await page.click('button:has-text("1")');
      await page.click('button:has-text("0")');
      await page.click('button:has-text("0")');
      await page.click('button:has-text("×")');
      await page.click('button:has-text("5")');
      await page.click('button:has-text("0")');
      await page.click('button:has-text("=")');
      await expect(page.locator('#display')).toHaveText('5000');
    });
  });

  test.describe('Operator Buttons', () => {
    test('should replace operator when clicking new operator', async ({ page }) => {
      await page.click('button:has-text("5")');
      await page.click('button:has-text("+")');
      await page.click('button:has-text("-")');
      await expect(page.locator('#display')).toHaveText('5-');
    });

    test('should allow changing operator multiple times', async ({ page }) => {
      await page.click('button:has-text("8")');
      await page.click('button:has-text("+")');
      await page.click('button:has-text("-")');
      await page.click('button:has-text("×")');
      await page.click('button:has-text("/")');
      await expect(page.locator('#display')).toHaveText('8/');
    });
  });

  test.describe('Clear and Delete Functions', () => {
    test('should clear display when clicking C button', async ({ page }) => {
      await page.click('button:has-text("9")');
      await page.click('button:has-text("8")');
      await page.click('button:has-text("7")');
      await expect(page.locator('#display')).toHaveText('987');
      
      await page.click('button:has-text("C")');
      await expect(page.locator('#display')).toHaveText('0');
    });

    test('should delete last character when clicking delete button', async ({ page }) => {
      await page.click('button:has-text("1")');
      await page.click('button:has-text("2")');
      await page.click('button:has-text("3")');
      await expect(page.locator('#display')).toHaveText('123');
      
      await page.click('button:has-text("⌫")');
      await expect(page.locator('#display')).toHaveText('12');
      
      await page.click('button:has-text("⌫")');
      await expect(page.locator('#display')).toHaveText('1');
      
      await page.click('button:has-text("⌫")');
      await expect(page.locator('#display')).toHaveText('0');
    });

    test('should reset to 0 when deleting last character of single digit', async ({ page }) => {
      await page.click('button:has-text("5")');
      await page.click('button:has-text("⌫")');
      await expect(page.locator('#display')).toHaveText('0');
    });
  });

  test.describe('Division by Zero', () => {
    test('should display error message when dividing by zero', async ({ page }) => {
      await page.click('button:has-text("1")');
      await page.click('button:has-text("0")');
      await page.click('button:has-text("/")');
      await page.click('button:has-text("0")');
      await page.click('button:has-text("=")');
      await expect(page.locator('#display')).toHaveText('Ошибка');
    });

    test('should allow new calculation after division by zero error', async ({ page }) => {
      await page.click('button:has-text("5")');
      await page.click('button:has-text("/")');
      await page.click('button:has-text("0")');
      await page.click('button:has-text("=")');
      await expect(page.locator('#display')).toHaveText('Ошибка');
      
      // After error, clicking a number should start fresh
      await page.click('button:has-text("7")');
      await expect(page.locator('#display')).toHaveText('7');
    });
  });

  test.describe('Keyboard Input', () => {
    test('should handle number input from keyboard', async ({ page }) => {
      await page.keyboard.press('4');
      await page.keyboard.press('5');
      await page.keyboard.press('6');
      await expect(page.locator('#display')).toHaveText('456');
    });

    test('should handle operation keys from keyboard', async ({ page }) => {
      await page.keyboard.press('8');
      await page.keyboard.press('+');
      await page.keyboard.press('2');
      await page.keyboard.press('Enter');
      await expect(page.locator('#display')).toHaveText('10');
    });

    test('should handle decimal point from keyboard', async ({ page }) => {
      await page.keyboard.press('3');
      await page.keyboard.press('.');
      await page.keyboard.press('1');
      await page.keyboard.press('4');
      await expect(page.locator('#display')).toHaveText('3.14');
    });

    test('should handle clear with Escape key', async ({ page }) => {
      await page.keyboard.press('9');
      await page.keyboard.press('9');
      await expect(page.locator('#display')).toHaveText('99');
      
      await page.keyboard.press('Escape');
      await expect(page.locator('#display')).toHaveText('0');
    });

    test('should handle equals with Enter key', async ({ page }) => {
      await page.keyboard.press('6');
      await page.keyboard.press('*');
      await page.keyboard.press('7');
      await page.keyboard.press('Enter');
      await expect(page.locator('#display')).toHaveText('42');
    });
  });

  test.describe('Display and UI', () => {
    test('should display initial value of 0', async ({ page }) => {
      await expect(page.locator('#display')).toHaveText('0');
    });

    test('should update display after calculation', async ({ page }) => {
      await page.click('button:has-text("2")');
      await page.click('button:has-text("×")');
      await page.click('button:has-text("5")');
      // The calculator stores '*' internally even though button shows '×'
      await expect(page.locator('#display')).toHaveText('2*5');
      
      await page.click('button:has-text("=")');
      // Wait for calculation result
      await expect(page.locator('#display')).toHaveText('10');
    });

    test('should reset display for new input after calculation', async ({ page }) => {
      await page.click('button:has-text("4")');
      await page.click('button:has-text("+")');
      await page.click('button:has-text("4")');
      await page.click('button:has-text("=")');
      await expect(page.locator('#display')).toHaveText('8');
      
      // After calculation, clicking a number should replace the result
      await page.click('button:has-text("3")');
      await expect(page.locator('#display')).toHaveText('3');
    });
  });
});

