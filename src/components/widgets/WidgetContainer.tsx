import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface WidgetContainerProps {
  title: string;
  className?: string;
  children: React.ReactNode;
}

export function WidgetContainer({ title, className, children }: WidgetContainerProps) {
  return (
    <Card className={cn("min-w-[300px] max-w-full", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
