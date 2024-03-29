import { PauseIcon } from "lucide-react";
import { Button } from "../ui/button";

type PauseButtonProps = {
  onClick: any;
};

export function PauseButton(props: PauseButtonProps) {
  return (
    <Button onClick={props.onClick} variant={"outline"} className="gap-1">
      <PauseIcon className="w-4 h-4" />
      Pause
    </Button>
  );
}
