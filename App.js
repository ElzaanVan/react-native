import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Platform } from 'react-native';
import { Focus } from './src/features/focus/Focus';
import { FocusHistory } from './src/features/focus/FocusHistory';
import Constants from 'expo-constants';
import { colors } from './src/utils/colors';
import { paddingSizes } from './src/utils/sizes';
import { Timer } from './src/features/timer/timer';
import AsyncStorage from '@react-native-async-storage/async-storage'

const STATUS = {
  COMPLETE: 1,
  CANCELLED: 2
}
export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

const focusHistorySubjectState = (subject, status) => {
  setFocusHistory([...focusHistory, {subject, status}]);
}

const onClear = () => {
  setFocusHistory([]);
}

const saveFocusHistory = async() => {
  try {
    await AsyncStorage.setItem("focusHistory", JSON.stringify(focusHistory));
  } catch(e) {
    console.log(e);
  }
}

const loadFocusHistory = async() => {
  try{
    const history = await AsyncStorage.getItem("focusHistory");

    if (history && JSON.parse(history).length){
      setFocusHistory(JSON.parse(history));
    }
  }catch(e){
    console.log(e);
  }
};

useEffect(() => {
  loadFocusHistory();
}, []);

useEffect(() => {
  saveFocusHistory();
}, [focusHistory]);

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer 
        focusSubject={focusSubject} 
        onTimerEnd={()=> {
          focusHistorySubjectState(focusSubject, STATUS.COMPLETE);
          setFocusSubject(null)
        }}
        clearSubject={() => {
        focusHistorySubjectState(focusSubject, STATUS.CANCELLED);
        setFocusSubject(null)
        }}
        />
        ) : (
        <>
        <Focus addSubject={setFocusSubject} />
        <FocusHistory focusHistory={focusHistory} onClear={onClear} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGreen,
    paddingTop: Platform.OS === 'ios' ? paddingSizes.lg : paddingSizes.xl
  },
});
