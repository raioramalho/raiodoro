import { useState, useEffect } from "react";
import { ThemeToggle } from "./components/ui-theme/theme-toggle";
import { Button } from "./components/ui/button";
import { PauseIcon, PlayIcon, Star } from "lucide-react";
import { ExitIcon, StopIcon } from "@radix-ui/react-icons";
import { Input } from "./components/ui/input";

function App() {
  const [timer, setTimer] = useState("00:00");
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isRunning) {
      interval = setInterval(() => {
        // Aqui você pode adicionar a lógica para atualizar o timer
        // No exemplo abaixo, estou apenas decrementando o timer em segundos
        const [hours, minutes] = timer.split(":").map(Number);
        let newMinutes = minutes - 1;
        let newHours = hours;
        if (newMinutes < 0) {
          if (newHours > 0) {
            newHours--;
            newMinutes = 59;
          } else {
            // Timer chegou a 00:00, então para o timer
            setIsRunning(false);
            clearInterval(interval);
            return;
          }
        }
        setTimer(
          `${String(newHours).padStart(2, "0")}:${String(newMinutes).padStart(
            2,
            "0"
          )}`
        );
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timer, isRunning]);

  function handleStart() {
    setIsRunning(true);
  }

  function handlePause() {
    setIsRunning(false);
    setTimer(timer);
  }

  function handleStop() {
    setIsRunning(false);
    setTimer("00:00"); // Resetar o timer para 22:00
  }

  function handleExit() {
    // Aqui você pode adicionar a lógica para sair do aplicativo
  }

  function StartButton() {
    return (
      <Button onClick={handleStart} variant={"outline"} className="gap-1">
        <PlayIcon className="w-4 h-4" />
        start
      </Button>
    );
  }

  function PauseButton() {
    return (
      <Button onClick={handlePause} variant={"outline"} className="gap-1">
        <PauseIcon className="w-4 h-4" />
        pause
      </Button>
    );
  }

  function StopButton() {
    return (
      <Button onClick={handleStop} variant={"outline"} className="gap-1" disabled={isRunning ? true : false}>
        <StopIcon className="w-4 h-4" />
        stop
      </Button>
    );
  }

  return (
    <main
      id="main"
      className="w-[300px] h-[300px] flex flex-col justify-center items-center p-4 border rounded-md"
    >
      <div
        id="timer-div"
        className="w-[200px] h-[200px] border rounded-full flex flex-col justify-center items-center"
      >
        <ThemeToggle />

        <input
          onChange={(e) => setTimer(e.target.value)}
          className="text-6xl font-bold w-[175px] focus:border-none focus:outline-none"
          value={timer}
        />
      </div>
      <div
        id="control-div"
        className="flex flex-row justify-center items-center gap-1 mt-4"
      >
        {isRunning ? <PauseButton/> : <StartButton/>}      
        <StopButton/>
        <Button onClick={handleExit} variant={"destructive"} className="gap-1">
          <ExitIcon className="w-4 h-4" />
          exit
        </Button>
      </div>
    </main>
  );
}

export default App;
