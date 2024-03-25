import {
  Alert as A,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

interface Props {
  title: string;
  description: string;
  variant?: "destructive" | "default";
  className?: string;
}

const Alert = ({ title, description, variant, className }: Props) => {
  return (
    <A className={className} variant={variant}>
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </A>
  );
};

export default Alert;
