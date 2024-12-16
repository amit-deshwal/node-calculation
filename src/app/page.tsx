"use client";

import { useState, useEffect } from "react";
import { FunctionCard } from "@/components/function-card";
import { ConnectionLine } from "@/components/connection-line";
import { Input } from "@/components/ui/input";
import { calculateResult } from "@/utils/validate-equation";
import type { FunctionNode, Connection } from "@/types";

const initialFunctions: FunctionNode[] = [
  { id: 1, equation: "x^2", nextFunction: 2, position: { x: 200, y: 100 } },
  { id: 2, equation: "2*x+4", nextFunction: 4, position: { x: 600, y: 100 } },
  {
    id: 3,
    equation: "x^2+20",
    nextFunction: null,
    position: { x: 1000, y: 100 },
  },
  { id: 4, equation: "x-2", nextFunction: 5, position: { x: 500, y: 450 } },
  { id: 5, equation: "x/2", nextFunction: 3, position: { x: 1000, y: 450 } },
];

const connections: Connection[] = [
  { from: 1, to: 2 },
  { from: 2, to: 4 },
  { from: 4, to: 5 },
  { from: 5, to: 3 },
];

export default function Page() {
  const [functions, setFunctions] = useState<FunctionNode[]>(initialFunctions);
  const [initialValue, setInitialValue] = useState<number>(2);
  const [finalOutput, setFinalOutput] = useState<{
    value: number;
    error?: string;
  }>({ value: 0 });

  const updateEquation = (id: number, newEquation: string) => {
    setFunctions((prev) =>
      prev.map((f) => (f.id === id ? { ...f, equation: newEquation } : f))
    );
  };

  useEffect(() => {
    let currentValue = initialValue;
    let currentFunction = 1;
    const visited = new Set<number>();

    while (currentFunction && !visited.has(currentFunction)) {
      visited.add(currentFunction);
      const func = functions.find((f) => f.id === currentFunction);
      if (func) {
        const { result, error } = calculateResult(func.equation, currentValue);
        if (error) {
          console.error(`Error function ${currentFunction}: ${error}`);
          setFinalOutput({
            value: NaN,
            error: `Error function ${currentFunction}: ${error}`,
          });
          return;
        }
        currentValue = result;
        currentFunction = func.nextFunction || 0;
      }
    }

    setFinalOutput({ value: currentValue });
  }, [functions, initialValue]);

  return (
    <div className="min-h-screen bg-dot-pattern relative p-8">
      <div className="relative w-full h-[600px]">
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 0 }}
        >
          {connections.map(({ from, to }) => {
            const fromFunc = functions.find((f) => f.id === from);
            const toFunc = functions.find((f) => f.id === to);
            if (fromFunc && toFunc) {
              return (
                <ConnectionLine
                  key={`${from}-${to}`}
                  startX={fromFunc.position.x + 300}
                  startY={fromFunc.position.y + 130}
                  endX={toFunc.position.x}
                  endY={toFunc.position.y + 130}
                />
              );
            }
          })}
        </svg>

        <div className="absolute left-0 top-[100px] bg-orange-100 rounded-lg p-8 border border-orange-200">
          <div className="text-sm font-medium text-orange-800 mb-2">
            Initial value of x
          </div>
          <Input
            type="number"
            value={initialValue}
            onChange={(e) => setInitialValue(Number(e.target.value))}
            className="w-24"
          />
        </div>

        <div className="absolute right-40 top-[100px] bg-emerald-100 rounded-lg p-8 border border-emerald-200">
          <div className="text-sm font-medium text-emerald-800 mb-2">
            Final Output y
          </div>
          <div className="w-24 p-2 bg-white rounded border text-center">
            {finalOutput.error ? "Error" : finalOutput.value.toFixed(2)}
          </div>
          {finalOutput.error && (
            <div className="text-xs text-red-500 mt-2">{finalOutput.error}</div>
          )}
        </div>

        {functions.map((func) => (
          <div
            key={func.id}
            className="absolute"
            style={{
              left: `${func.position.x}px`,
              top: `${func.position.y}px`,
            }}
          >
            <FunctionCard
              id={func.id}
              equation={func.equation}
              nextFunction={func.nextFunction}
              onEquationChange={(equation) => updateEquation(func.id, equation)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
