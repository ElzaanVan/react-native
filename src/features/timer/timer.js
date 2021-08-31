import React, { useState } from 'react';
import { View, StyleSheet, Text, Vibration, Platform } from 'react-native';
import { ProgressBar } from 'react-native-paper';

import { colors } from '../../utils/colors';
import { paddingSizes } from '../../utils/sizes';
import { Countdown } from '../../components/countdown';
import { RoundedButton } from '../../components/RoundedButton';
import { Timing } from './timing';

export const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
  
  const [minutes, setMinutes] = useState(0.1);
  const [isStarted, setisStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  const onProgress = (progress) => {setProgress(progress)};
  const changeTime = (minutes) => {
    setMinutes(minutes);
    setProgress(1);
    setisStarted(false);
  }

  const vibrate = () => {
  const ONE_SECOND_IN_MS = 1000;

  const PATTERN = [
    1 * ONE_SECOND_IN_MS,
    2 * ONE_SECOND_IN_MS,
    3 * ONE_SECOND_IN_MS
  ];
    if (Platform.OS === 'ios'){
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 3000)
    }else{

      Vibration.vibrate(3 * ONE_SECOND_IN_MS);
    }
  }

  const onEnd = () => {
    vibrate();
    setMinutes(minutes);
    setProgress(1);
    setisStarted(false);
    setTimeout(() => {
  onTimerEnd();
    }, 4000)
  
  }
  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown 
        minutes={minutes} 
        isPaused={!isStarted} 
        onProgress={onProgress} 
        onEnd={onEnd}
        />
      </View>
      <View style={{ paddingTop: paddingSizes.xxl }}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View style={styles.progressBar}>
        <ProgressBar 
        style={{ height: 10 }}
        progress={progress} 
        color="#6F8FAF" />
      </View>
      <View style={styles.buttonWrapper}>
      <Timing onChangeTime={changeTime} />
      </View>
      <View style={styles.buttonWrapper}>
        {isStarted ? (
          <RoundedButton
            title="Pause"
            size={80}
            onPress={() => setisStarted(false)}
          />
        ) : (
          <RoundedButton
            title="Start"
            size={80}
            onPress={() => setisStarted(true)}
          />
        )}
      </View>
      <View style={styles.clearSubject}>
       <RoundedButton
            title="-"
            size={40}
            onPress={() => clearSubject()}
          />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: colors.white,
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBar: {
    marginTop: paddingSizes.sm,
  },
  clearSubject: {
    paddingBottom: 25,
    paddingLeft: 25
  }
});
