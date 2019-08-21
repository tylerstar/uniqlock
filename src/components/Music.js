import React, { useState, useEffect } from 'react';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import './Music.css';

const Music = () => {
  const soundList = [0, 1, 2, 3, 4].map(index => {
    return `https://uniqlock.s3-ap-northeast-1.amazonaws.com/uniqlo_extra/uniqlock2/sound/sound${index}.mp3`;
  });

  const [isPlaying, setIsPlaying] = useState(true);
  const [soundURL, setSoundURL] = useState(soundList[0]);


  const context = new AudioContext();
  const toggleMusic = () => {
    // setIsPlaying(!isPlaying);
    // context.suspend();
    // console.log("hello");
  };

  useEffect(() => {

    document.getElementById('root').addEventListener('click', () => {
      context.resume().then(() => {
        console.log("playback.");
      });
    });

    const play = audioBuffer => {
      const source = context.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(context.destination);
      source.start();
      source.onended = getNextSound;
    };

    const fetchSound = () => {
      if (soundURL === "") {
        setSoundURL(soundList[0]);
      }
      window.fetch(soundURL)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
        .then(audioBuffer => {
          play(audioBuffer);
        });
    };

    const getNextSound = () => {
      const currentSoundIndex = soundList.indexOf(soundURL);
      if (currentSoundIndex + 1 === soundList.length) {
        setSoundURL(soundList[0]);
      } else {
        setSoundURL(soundList[currentSoundIndex + 1]);
      }
    };
    fetchSound();
  }, [soundURL]);

  return (
    <div>
      <VolumeUpIcon className="volume" onClick={toggleMusic} />
    </div>
  );
};

export default Music;