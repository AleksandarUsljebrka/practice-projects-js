import {useState, useRef} from 'react'
import ResultModal from './ResultModal.jsx';

function TimerChallenge({title, targetTime}) {
    const timer = useRef();
    const dialog = useRef();

    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime*1000;

    let result;
    let remainingTime;

    if(timeRemaining <= 0){
        clearInterval(timer.current);
        dialog.current.open();
    }
    
    function handleReset(){
        setTimeRemaining(targetTime*1000);
    }
    function handleStart(){
        timer.current = setInterval(() => {
            setTimeRemaining(prevTimeRemaining=>prevTimeRemaining-10)
            
        }, 10);
        
        
    }

    function handleStop(){
        clearInterval(timer.current);
        dialog.current.open();
        
    } 
    return (
        <>
            <ResultModal onReset={handleReset} remainingTime={timeRemaining} ref={dialog} targetTime={targetTime} />         
            <section className="challenge">
                <h1>{title}</h1>
                <p className="challenge-time">
                    {targetTime} second{targetTime>1? 's':'s'}
                </p>
                <p>
                    <button onClick={timerIsActive? handleStop: handleStart}>
                        {timerIsActive? 'Stop':'Start' }Challenge
                    </button>
                </p>
                <p className={timerIsActive? 'active':undefined}>
                    {timerIsActive? 'Timer is running...':'Times is inactive'}
                </p>
            </section>
        </>
  )
}

export default TimerChallenge