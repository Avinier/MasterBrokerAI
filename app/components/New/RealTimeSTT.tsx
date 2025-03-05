import React, { useState, useRef, useEffect } from 'react';
import SkuemorphicContainer from "~/components/UI/SkuemorphicContainer";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, StopCircle, PlayCircle } from "lucide-react";
import { useFetcher } from "@remix-run/react";

interface Message {
  id: number;
  text: string;
  sender: 'assistant' | 'user';
}

interface AudioMessage {
  transcription: string;
  translation: string;
}

const RealTimeSTT = () => {
  const fetcher = useFetcher();
  const [isPhoneClicked, setIsPhoneClicked] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const silenceTimeoutRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (fetcher.data) {
      const { transcription, translatedText } = fetcher.data;
      if (transcription && translatedText) {
        // Determine the sender based on the last message
        const lastSender = messages.length > 0 ? messages[messages.length - 1].sender : "user";
        const newSender = lastSender === "user" ? "assistant" : "user";
  
        // Add the transcription and translation to the messages state
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            text: `Transcription: ${transcription}\n\nTranslation: ${translatedText}`,
            sender: newSender, // Alternate between "assistant" and "user"
          },
        ]);
      }
    }
  }, [fetcher.data]);
  

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      mediaRecorderRef.current = new MediaRecorder(stream);

      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
      sourceRef.current.connect(analyserRef.current);

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        setAudioBlob(audioBlob);
        audioChunksRef.current = [];
        await processAudio(audioBlob);
        
        if (streamRef.current?.active) {
          startNewRecording(streamRef.current);
        }
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      analyzeAudio();
    } catch (err) {
      console.error("Error starting recording:", err);
    }
  };

  const startNewRecording = (stream: MediaStream) => {
    mediaRecorderRef.current = new MediaRecorder(stream);
    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };
    
    mediaRecorderRef.current.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
      setAudioBlob(audioBlob);
      audioChunksRef.current = [];
      await processAudio(audioBlob);
      
      if (streamRef.current?.active) {
        startNewRecording(streamRef.current);
      }
    };

    mediaRecorderRef.current.start();
    setIsRecording(true);
    analyzeAudio();
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      streamRef.current?.getTracks().forEach(track => track.stop());
      cleanupAudio();
    }
  };

  const processAudio = async (blob: Blob) => {
    const formData = new FormData();
    formData.append("audio", new File([blob], "recording.wav", { type: "audio/wav" }));
    fetcher.submit(formData, {
      method: "post",
      action: "/api/process-audio",
      encType: "multipart/form-data",
    });
  };
  
  useEffect(() => {
    if (fetcher.data) {
      const { transcription, translatedText } = fetcher.data;
      if (transcription && translatedText) {
        // Add the transcription and translation to the messages state
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            text: `Transcription: ${transcription}\n\nTranslation: ${translatedText}`,
            sender: "user",
          },
        ]);
      }
    }
  }, [fetcher.data]);

  const analyzeAudio = () => {
    if (!analyserRef.current || !audioContextRef.current) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const floatData = new Float32Array(bufferLength);

    const checkSilence = () => {
      if (!analyserRef.current) return;

      analyserRef.current.getByteTimeDomainData(dataArray);
      
      // Convert to float samples
      for (let i = 0; i < dataArray.length; i++) {
        floatData[i] = (dataArray[i] - 128) / 128;
      }

      // Calculate RMS and dB
      let sum = 0;
      for (const sample of floatData) {
        sum += sample * sample;
      }
      const rms = Math.sqrt(sum / floatData.length);
      const dB = 20 * Math.log10(rms + 1e-6);

      // Silence threshold at -45dB
      if (dB < -45) {
        if (!silenceTimeoutRef.current) {
          silenceTimeoutRef.current = window.setTimeout(() => {
            if (mediaRecorderRef.current?.state === "recording") {
              mediaRecorderRef.current.stop();
            }
            silenceTimeoutRef.current = null;
          }, 1000);
        }
      } else {
        if (silenceTimeoutRef.current) {
          clearTimeout(silenceTimeoutRef.current);
          silenceTimeoutRef.current = null;
        }
      }

      if (audioContextRef.current) {
        requestAnimationFrame(checkSilence);
      }
    };

    checkSilence();
  };

  const cleanupAudio = () => {
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current);
      silenceTimeoutRef.current = null;
    }
  };

  const handlePhoneClick = () => {
    setIsPhoneClicked(true);
  };

  const handleStartRecording = () => {
    startRecording();
  };

  const handleStopRecording = () => {
    stopRecording();
  };

  return (
    <SkuemorphicContainer className="w-full h-full flex items-center justify-center relative bg-gray-900">
      {/* Glowing background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 animate-pulse blur-2xl" />
      
      {!isPhoneClicked && (
        <div className="text-center absolute top-0 mt-10 space-y-2 z-10">
          <h2 className='text-3xl font-bold font-subheading bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent'>
            Live Conversation Analysis
          </h2>
          <p className="text-gray-400 font-subheading">Real-time client communication</p>
        </div>
      )}

      <AnimatePresence>
        {!isPhoneClicked && (
          <motion.button 
            onClick={handlePhoneClick}
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute z-10"
          >
            <motion.div
              className="relative rounded-full bg-cyan-500 h-24 w-24 flex items-center justify-center shadow-lg"
              animate={{
                scale: [1, 1.2, 1],
                boxShadow: [
                  '0 0 0px rgba(16, 185, 129, 0)',
                  '0 0 20px rgba(16, 185, 129, 0.6)',
                  '0 0 40px rgba(16, 185, 129, 0.4)',
                  '0 0 60px rgba(16, 185, 129, 0.6)',
                  '0 0 0px rgba(16, 185, 129, 0)'
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 opacity-75 blur-xl animate-pulse"></div>
              <Phone className="text-white h-12 w-12 relative z-10" />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {isPhoneClicked && (
        <div className="absolute bottom-0 flex space-x-4 mb-8 z-10">
          <motion.button
            onClick={handleStartRecording}
            disabled={isRecording}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`
              relative rounded-full h-12 w-12 flex items-center justify-center shadow-md hover:shadow-lg
              ${isRecording 
                ? 'bg-cyan-300 cursor-not-allowed opacity-50' 
                : 'bg-cyan-500 hover:bg-cyan-600'
              }
            `}
          >
            <div className={`
              absolute inset-0 rounded-full 
              ${isRecording 
                ? 'bg-cyan-300 opacity-30' 
                : 'bg-cyan-400 opacity-50 blur-xl animate-pulse'
              }
            `}></div>
            <PlayCircle className={`
              text-white h-6 w-6 relative z-10
              ${isRecording ? 'opacity-50' : ''}
            `} />
          </motion.button>

          <motion.button
            onClick={handleStopRecording}
            disabled={!isRecording}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className={`
              relative rounded-full h-12 w-12 flex items-center justify-center shadow-md hover:shadow-lg
              ${!isRecording 
                ? 'bg-emerald-300 cursor-not-allowed opacity-50' 
                : 'bg-emerald-500 hover:bg-emerald-600'
              }
            `}
          >
            <div className={`
              absolute inset-0 rounded-full 
              ${!isRecording 
                ? 'bg-emerald-300 opacity-30' 
                : 'bg-emerald-400 opacity-50 blur-xl animate-pulse'
              }
            `}></div>
            <StopCircle className={`
              text-white h-6 w-6 relative z-10
              ${!isRecording ? 'opacity-50' : ''}
            `} />
          </motion.button>
        </div>
      )}
<AnimatePresence>
  {isRecording && (
    <div className="flex flex-col items-start mt-4 w-full px-4 z-10 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-500 scrollbar-track-gray-900">
      {messages.map((message, index) => (
        <motion.div
          key={message.id}
          initial={{ opacity: 0, x: message.sender === 'assistant' ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            duration: 0.4, 
            type: "spring", 
            stiffness: 100 
          }}
          className={`
            flex 
            ${message.sender === 'assistant' ? 'justify-start' : 'justify-end'}
            w-full
            mb-4
          `}
        >
          <div
            className={`
              relative 
              max-w-[80%] 
              rounded-xl 
              p-4 
              transition-all 
              duration-300 
              ${message.sender === 'assistant' 
                ? 'bg-gradient-to-br from-cyan-500 via-emerald-500 to-emerald-400' 
                : 'bg-gradient-to-br from-gray-700 via-gray-600 to-gray-500'}
              text-white 
              shadow-xl 
              hover:scale-[1.01] 
              transform 
              ease-in-out
              font-subheading 
              tracking-wide 
              text-sm
            `}
          >
            {message.text.split("\n").map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  )}
</AnimatePresence>


    </SkuemorphicContainer>
  );
};

export default RealTimeSTT;