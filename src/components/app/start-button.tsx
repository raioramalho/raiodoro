import { PlayIcon } from "lucide-react";
import { Button } from "../ui/button";

type StartButtonProps = {
  onClick: any;
};

export function StartButton(props: StartButtonProps) {
  return (
    <Button onClick={props.onClick} variant={"outline"} className="gap-1">
      <PlayIcon className="w-4 h-4" />
      Start
    </Button>
  );
}
