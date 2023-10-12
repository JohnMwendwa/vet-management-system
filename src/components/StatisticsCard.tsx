import { ReactNode } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@/components/Material";

interface StatisticsCardProps {
  color: any;
  icon: ReactNode;
  title: string;
  value: ReactNode;
  footer?: ReactNode;
}

export function StatisticsCard({
  color,
  icon,
  title,
  value,
  footer,
}: StatisticsCardProps) {
  return (
    <Card>
      <CardHeader
        variant="gradient"
        color={color}
        className="absolute -mt-4 grid h-16 w-16 place-items-center"
      >
        {icon}
      </CardHeader>
      <CardBody className="p-4 text-right">
        <Typography variant="small" className="font-normal text-blue-gray-600">
          {title}
        </Typography>
        <Typography variant="h4" color="blue-gray">
          {value}
        </Typography>
      </CardBody>
      {footer && (
        <CardFooter className="border-t border-blue-gray-50 p-4">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}
