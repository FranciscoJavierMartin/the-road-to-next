import { PropsWithChildren, ReactNode } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';

interface CardCompactProps {
  title: string;
  description: string;
  className?: string;
  footer?: ReactNode;
}

export default function CardCompact({
  title,
  description,
  className,
  children,
  footer,
}: PropsWithChildren<CardCompactProps>) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}
