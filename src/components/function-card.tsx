import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { validateEquation } from "../utils/validate-equation";

interface FunctionCardProps {
  id: number;
  equation: string;
  nextFunction: number | null;
  onEquationChange: (equation: string) => void;
}

export function FunctionCard({
  id,
  equation,
  nextFunction,
  onEquationChange,
}: FunctionCardProps) {
  return (
    <Card className="w-[300px] relative">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-normal text-muted-foreground">
          Function: {id}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Equation</label>
          <Input
            value={equation}
            onChange={(e) => {
              if (validateEquation(e.target.value)) {
                onEquationChange(e.target.value);
              }
            }}
            placeholder="Enter equation (e.g., x^2 + 1)"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Next function</label>
          <Select disabled value={nextFunction?.toString() || ""}>
            <SelectTrigger>
              <SelectValue placeholder="-" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  Function: {num}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <div className="absolute left-0 top-1/2 -translate-x-2 w-4 h-4 rounded-full border-2 border-blue-500 bg-white" />
      <div className="absolute right-0 top-1/2 translate-x-2 w-4 h-4 rounded-full border-2 border-blue-500 bg-white" />
    </Card>
  );
}
