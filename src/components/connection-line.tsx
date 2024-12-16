interface ConnectionLineProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

export function ConnectionLine({
  startX,
  startY,
  endX,
  endY,
}: ConnectionLineProps) {
  const curveIntensity = 0.5;
  const midX = startX + (endX - startX) * curveIntensity;
  const midY = startY + (endY - startY) * curveIntensity;

  const path = `M ${startX} ${startY} 
                 C ${midX} ${startY}, 
                   ${midX} ${endY}, 
                   ${endX} ${endY}`;

  return (
    <path
      d={path}
      fill="none"
      stroke="rgb(59, 130, 246)"
      strokeWidth="2"
      className="transition-all duration-300 ease-in-out"
    />
  );
}
