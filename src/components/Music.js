import React, { useState, useEffect, useRef } from 'react';
import { fetchSound } from "../api";
import { Icon } from '@blueprintjs/core';
import './Music.css';
import useMusicPlayer from "../hooks/useMusicPlayer";

const Music = () => {
  // const soundSeries = 'uniqlock2';
  // const soundIndexes = [0, 1, 2, 3, 4];
  // const [currIndex, setCurrIndex] = useState(soundIndexes[0]);
  // const [isPlaying, setIsPlaying] = useState(true);
  //
  // const context = new AudioContext();
  // const source = context.createBufferSource();
  //
  // const loadNextSound = () => {
  //   console.log("load next sound");
  //   const currentSoundIndex = soundIndexes.indexOf(currIndex);
  //   if (currentSoundIndex + 1 === soundIndexes.length) {
  //     setCurrIndex(soundIndexes[0]);
  //   } else {
  //     setCurrIndex(soundIndexes[currentSoundIndex + 1]);
  //   }
  // };
  //
  // const startPlaySound = () => {
  //   fetchSound(soundSeries, currIndex)
  //     .then(resp => resp.arrayBuffer())
  //     .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
  //     .then(buffer => {
  //       source.buffer = buffer;
  //       source.connect(context.destination);
  //       source.start(0);
  //       console.log("start");
  //       source.onended = loadNextSound;
  //     });
  // };
  //
  // const stopPlaySound = () => {
  //   source.onended = null;
  //   source.stop(0);
  //   source.buffer = null;
  // };
  //
  // const handleSoundPlay = () => {
  //   if (isPlaying) {
  //     stopPlaySound();
  //     setIsPlaying(false);
  //   } else {
  //     startPlaySound();
  //     setIsPlaying(true);
  //     // source.onended = loadNextSound;
  //   }
  // };
  //
  // console.log(isPlaying);
  //
  // useEffect(() => {
  //   startPlaySound();
  // }, [currIndex]);
  //
  // const resumePlay = () => {
  //   context.resume();
  // };
  const { playNextTrack, togglePlay, hasPlayed } = useMusicPlayer();

  useEffect(() => {
    playNextTrack();
  }, [hasPlayed]);

  return (
    <Icon icon="volume-up" className="volume" onClick={togglePlay} />
  );
};

export default Music;