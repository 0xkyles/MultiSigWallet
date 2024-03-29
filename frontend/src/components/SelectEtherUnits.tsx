import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  className: string;
  unit: string;
  setUnit: (value: string) => void;
}

const units = ["wei", "gwei", "ether"] as const;

const SelectEtherUnits = ({ className, unit, setUnit }: Props) => {
  return (
    <Select value={unit} onValueChange={(value: string) => setUnit(value)}>
      <SelectTrigger className={className}>
        <SelectValue placeholder="Select a unit" />
      </SelectTrigger>
      <SelectContent>
        {units.map((unit) => (
          <SelectItem key={unit} value={unit}>
            {unit}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectEtherUnits;
