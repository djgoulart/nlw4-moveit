import { useState, useEffect, useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/Countdown.module.css'

let countdownTimeOut: NodeJS.Timeout;

export function Countdown() {
  const { startNewChallenge } = useContext(ChallengesContext);

  const [time, setTime] = useState(0.05 * 60);
  const [countdownIsActive, setCountdownIsActive] = useState(false);
  const [countdownHasFinished, setCountdownHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [minuteLeft, minuteRight] = String(minutes).padStart(2,'0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2,'0').split('');

  function startCountdown() {
    setCountdownIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeOut);
    setCountdownIsActive(false);
    setTime(0.05 * 60)
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
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {
        countdownHasFinished ? (
          <button
            disabled 
            className={styles.countdownButton}
            onClick={resetCountdown}
          >
            Ciclo encerrado
          </button>
        ) : (
          <>
            { countdownIsActive ? (
              <button 
                type="button" 
                className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                onClick={resetCountdown}
              >
                Abandonar ciclo
              </button>
            ) : (
              <button 
                type="button" 
                className={styles.countdownButton}
                onClick={startCountdown}
              >
                Iniciar um ciclo
              </button>
            )}
          </>
        )
      }

      
    </div>
  )
}