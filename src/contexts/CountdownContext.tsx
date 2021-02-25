import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { ChallengesContext } from './ChallengesContext';

interface CountdownContextData {
  minutes: number;
  seconds: number;
  countdownHasFinished: boolean;
  countdownIsActive: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
}

interface CountdownProviderProps {
  children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData)

export function CountdownProvider({ children }: CountdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengesContext);
  let countdownTimeOut: NodeJS.Timeout;

  const [time, setTime] = useState(0.05 * 60);
  const [countdownIsActive, setCountdownIsActive] = useState(false);
  const [countdownHasFinished, setCountdownHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function startCountdown() {
    setCountdownIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeOut);
    setCountdownIsActive(false);
    setTime(0.05 * 60);
    setCountdownHasFinished(false);
  }

  useEffect(() => {
    if(countdownIsActive && time > 0) {
      countdownTimeOut = setTimeout(() => {
        setTime(time -1);
      }, 1000);
    } else if (countdownIsActive && time === 0) {
      setCountdownHasFinished(true);
      setCountdownIsActive(false);
      startNewChallenge();
    }
  }, [countdownIsActive, time])

  return (
    <CountdownContext.Provider value={{
      minutes,
      seconds,
      countdownHasFinished,
      countdownIsActive,
      startCountdown,
      resetCountdown
    }}>
      { children }
    </CountdownContext.Provider>
  )
}