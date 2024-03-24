import {
  Alert as A,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

interface Props {
  title: string;
  description: string;
  variant?: "destructive" | "default";
}

const Alert = ({ title, description, variant }: Props) => {
  return (
    <A variant={variant}>
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </A>
  );
};

export default Alert;
