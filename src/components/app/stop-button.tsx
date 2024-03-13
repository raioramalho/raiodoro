import { StopIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";

type StopButtonProps = {
  onClick: any;
  isRunning: boolean;
};

export function StopButton(props: StopButtonProps) {
  return (
    <Button
      onClick={props.onClick}
      variant={"outline"}
      className="gap-1"
      disabled={props.isRunning}
    >
      <StopIcon className="w-4 h-4" />
      Stop
    </Button>
  );
}
