import React, {useState, useRef, useEffect} from 'react'


function Stopwatch(){


    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(0);
    const [records, setRecords] = useState([]);

    useEffect(() => {
        if(isRunning){
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 10);
        }

        return () => {
            clearInterval(intervalIdRef.current);
        }
    }, [isRunning]);


    function start(){
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;
    }
    function stop(){
        setIsRunning(false);
        
    }
    function reset(){
        setElapsedTime(0);
        setIsRunning(false);
    }
    function formatTime(){
        let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
        let seconds = Math.floor(elapsedTime / (1000) % 60);
        let milliseconds = Math.floor(elapsedTime % 1000 / 10);

        hours = hours.toString().padStart(2,"0");
        minutes = minutes.toString().padStart(2,"0");    
        seconds = seconds.toString().padStart(2,"0");
        milliseconds = milliseconds.toString().padStart(2,"0");

        return `${hours}:${minutes}:${seconds}:${milliseconds}`;
    }

    function recordTime(){
        if (elapsedTime > 0) {
            setRecords((prevRecords) => [...prevRecords, formatTime()]);
        }
    }

    return(
    <>
        <div className="stopwatchDiv">
            <h1 id="myH1">Stopwatch</h1>
            <div className="stopwatchContainer">
                <div className="stopwatchDisplay">
                    {formatTime()}
                </div>
                <div className="controls">
                    <button id="startBtn" onClick={start}>Start</button>
                    <button id="stopBtn" onClick={stop}>Stop</button>
                    <button id="resetBtn" onClick={reset}>Reset</button>
                    <button id="recordBtn" onClick={recordTime}>Save</button>
                </div>
            </div>
        </div>
    
        <div id="timeRecord">
            <div className="timeRecordContainer">
                <h2>Time Records:</h2>
                <ol id="recordDisplay">
                    {records.map((record, index) => (
                            <li key={index}>{record}</li> 
                        ))}
                </ol>
            </div>
        </div>
    </>
    );
}

export default Stopwatch;