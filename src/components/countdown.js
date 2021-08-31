import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { colors } from '../utils/colors';
import { fontSizes, paddingSizes, marginSizes } from '../utils/sizes';

const minutesToMillisec = (min) => min * 1000 * 60;
const formatTime = (time) => time < 10 ? `0${time}` : time;

export const Countdown = ({ 
  minutes = 20,
  isPaused,
  onProgress,
  onEnd
 }) => {
   const interval = React.useRef(null);
   const countDown = () => {
     setMillies((time) => {
       if(time === 0){
         clearInterval(interval.current);
         onEnd();
         return time;
       }
       const timeLeft = time - 1000;
       onProgress(timeLeft / minutesToMillisec(minutes));
       return timeLeft;
     })
   }

  useEffect(() => {
    setMillies(minutesToMillisec(minutes));
  }, [minutes]) 

  useEffect(() => {
    if (isPaused){
      if(interval.current) clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(countDown, 1000);
    return () => clearInterval(interval.current)
  }, [isPaused]);

   const [millis, setMillies] = useState(minutesToMillisec(minutes));

   const minute = Math.floor(millis / 1000 / 60) % 60;
   const second = Math.floor(millis / 1000) % 60;

  return (
    <View>
    <Text style={styles.text}>{formatTime(minute)}:{formatTime(second)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    borderRadius: 10,
    fontSize: fontSizes.xxl,
    fontWeight: 'bold',
    backgroundColor: colors.lightBlue,
    padding: paddingSizes.md,
    color: colors.white,
  }
})