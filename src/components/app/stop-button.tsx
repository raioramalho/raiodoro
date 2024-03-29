import { StopIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";

type StopButtonProps = {
  onClick: any;
  isRunning: boolean;
  timer: string;
};

export function StopButton(props: StopButtonProps) {
  return (
    <Button
      onClick={props.onClick}
      variant={"outline"}
      className="gap-1"
      disabled={props.isRunning || props.timer === "00:00" ? true : false}
    >
      <StopIcon className="w-4 h-4" />
      Stop
    </Button>
  );
}
