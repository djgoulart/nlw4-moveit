import { useState, useEffect } from 'react'
import styles from '../styles/components/Countdown.module.css'

let countdownTimeOut: NodeJS.Timeout;

export function Countdown() {
  const [time, setTime] = useState(0.1 * 60);
  const [countdownIsActive, setCountdownIsActive] = useState(false);

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
    setTime(0.1 * 60)
  }

  useEffect(() => {
    if(countdownIsActive && time > 0) {
      countdownTimeOut = setTimeout(() => {
        setTime(time -1);
      }, 1000);
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
    </div>
  )
}