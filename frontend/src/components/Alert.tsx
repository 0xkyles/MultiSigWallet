import {
  Alert as A,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

interface Props {
  title?: JSX.Element | string;
  description: JSX.Element | string;
  variant?: "destructive" | "default" | "success";
  className?: string;
}

const Alert = ({ title, description, variant, className }: Props) => {
  return (
    <A className={className} variant={variant}>
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>{description}</AlertDescription>
    </A>
  );
};

export default Alert;
