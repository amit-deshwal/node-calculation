export function validateEquation(equation: string): boolean {
  const validPattern = /^[0-9x\s\+\-\*\/\^()]+$/;
  return validPattern.test(equation);
}

export function calculateResult(
  equation: string,
  x: number
): { result: number; error?: string } {
  try {
    const processedEquation = equation.replace(/\^/g, "**");

    const calculationFunction = new Function(
      "x",
      `return ${processedEquation}`
    );

    const result = calculationFunction(x);

    if (typeof result !== "number" || isNaN(result) || !isFinite(result)) {
      return { result: NaN, error: `Invalid result: ${result}` };
    }

    return { result };
  } catch (error) {
    console.error("Error calculating result:", error);
    return { result: NaN, error: `Calculation error: ${error}` };
  }
}
