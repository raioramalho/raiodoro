import { ThemeToggle } from "../ui-theme/theme-toggle";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import { Input } from "../ui/input";

type RelogioProps = {
  isRunning: boolean;
  handleChange: any;
  timer: string;
};

export function Relogio(props: RelogioProps) {
  return (
    <Carousel className="w-[100vw] h-[70vh] flex flex-col justify-center items-center">
      <CarouselContent className="w-[100vw] h-[70vh]">
        <CarouselItem className="flex flex-col justify-center items-center">
          <div
            id="timer-div"
            className="w-[200px] h-[200px] border-2 rounded-full flex flex-col justify-center items-center"
          >
            <ThemeToggle />            
            <Input
              onChange={props.handleChange}
              readOnly={props.isRunning}
              className="ml-2 text-6xl w-[165px] border-none outline-none focus:border-none focus:outline-none z-0"
              value={props.timer}
            />
          </div>
        </CarouselItem>
        <CarouselItem className="flex flex-col justify-center items-center">
          <div
            id="timer-div"
            className="w-[255px] h-[250px] border-2 rounded-lg flex flex-col justify-center items-center"
          >
            <ThemeToggle />            
            <Input
              onChange={props.handleChange}
              readOnly={props.isRunning}
              className="ml-2 text-6xl w-[165px] border-none outline-none focus:border-none focus:outline-none z-0"
              value={props.timer}
            />
          </div>
        </CarouselItem>
      </CarouselContent>
      
    </Carousel>
  );
}
