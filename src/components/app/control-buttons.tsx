import { ExitIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { PauseButton } from "./puase-button";
import { StartButton } from "./start-button";
import { StopButton } from "./stop-button";

type ControlButtonsProps = {
 isRunning: boolean;
 handleStart: any;
 handlePause: any;
 handleStop: any;  
 handleExit: any; 
}

export function ControlButtons(props: ControlButtonsProps) {
    return (
        <div
        id="control-div"
        className="flex flex-row justify-center items-center gap-1 mt-4"
      >
        {props.isRunning ? (
          <PauseButton onClick={props.handlePause} />
        ) : (
          <StartButton onClick={props.handleStart} />
        )}
        <StopButton onClick={props.handleStop} isRunning={props.isRunning} />
        <Button onClick={props.handleExit} variant={"destructive"} className="gap-1">
          <ExitIcon className="w-4 h-4" />
          Exit
        </Button>
      </div>
    )
}