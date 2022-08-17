import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

import { differenceInSeconds } from "date-fns";

import { HandPalm, Play } from "phosphor-react";

import {
  CountDownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  StopCountdownButton,
  TaskInput,
} from "./styles";
import { useEffect, useState } from "react";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a Tarefa"),
  minutesAmount: zod
    .number()
    .min(1, "O cíclo precisa ser de no mínimo 5 minutos.")
    .max(60, "O cíclo precisa ser de no máximo 60 minutos."),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

interface ICycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

export default function Home() {
  const [cycles, setCycles] = useState<ICycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amoundSecondsPassed, setAmoundSecondsPassed] = useState(0);

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 5,
    },
  });

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - amoundSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = minutesAmount.toString().padStart(2, "0");
  const seconds = secondsAmount.toString().padStart(2, "0");

  const task = watch("task");
  const isSubmitDisabled = !task;

  useEffect(() => {
    if (activeCycle) {
      const interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        );

        if (secondsDifference >= totalSeconds) {
          setCycles((state) =>
            state.map((cycle) => {
              if (cycle.id === activeCycleId) {
                return {
                  ...cycle,
                  finishedDate: new Date(),
                };
              }

              return cycle;
            })
          );

          setAmoundSecondsPassed(totalSeconds);

          clearInterval(interval);
        } else {
          setAmoundSecondsPassed(secondsDifference);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [activeCycle, activeCycleId, totalSeconds]);

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`;
    }
  }, [activeCycle, minutes, seconds, task]);

  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return {
            ...cycle,
            interruptedDate: new Date(),
          };
        }

        return cycle;
      })
    );

    setActiveCycleId(null);
  }

  function handleCreateNewCycle(data: NewCycleFormData) {
    const newCycle: ICycle = {
      id: new Date().getTime().toString(),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    setCycles((oldCyclesValues) => [...oldCyclesValues, newCycle]);
    setActiveCycleId(newCycle.id);
    setAmoundSecondsPassed(0);

    reset();
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            type="text"
            id="task"
            placeholder="Dê um nome para o seu projeto"
            list="task-suggestion"
            disabled={!!activeCycle}
            {...register("task")}
          />

          <datalist id="task-suggestion">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="Projeto 4" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={1}
            max={60}
            disabled={!!activeCycle}
            {...register("minutesAmount", { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountDownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountDownContainer>

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={handleInterruptCycle}>
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
}
