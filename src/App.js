import React, { useState, useEffect } from 'react';

const App = () => {
    const [transcript, setTranscript] = useState('');
    const [isRecording, setIsRecording] = useState(false);

    useEffect(() => {
        let recognition;
        const startRecording = () => {
            recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognition.lang = 'fr-FR'; // Set the language to French
            recognition.continuous = true;

            recognition.onresult = (event) => {
                const result = event.results[event.results.length - 1][0].transcript;
                setTranscript(prevTranscript => prevTranscript + ' ' + result);
            };

            recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
            };

            recognition.start();
        };

        const stopRecording = () => {
            recognition.stop();
        };

        if (isRecording) {
            startRecording();
        } else {
            stopRecording();
        }

        return () => {
            if (recognition) {
                recognition.stop();
            }
        };
    }, [isRecording]);

    const toggleRecording = () => {
        setIsRecording(prevState => !prevState);
    };

    return (
        <div>
            <button onClick={toggleRecording}>
                {isRecording ? 'Stop Recording' : 'Start Recording'}
            </button>
            <div>
                <h3>Real-time Transcription:</h3>
                <p>{transcript}</p>
            </div>
        </div>
    );
};

export default SpeechToText;
