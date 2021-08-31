import React, { useState } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { TextInput } from 'react-native-paper';
import { fontSizes, paddingSizes, marginSizes } from '../../utils/sizes';

import { RoundedButton } from "../../components/RoundedButton";

export const Focus = ({ addSubject }) => {
  const [subject, setSubject] = useState(null);
  return (
  <View style={styles.container}>
    <View style={styles.titleContainer}>
      <Text style={styles.title}>What would you like to focus on?</Text>
      <View style={styles.inputContainer}>
        <TextInput 
        style={{ marginRight: marginSizes.md, flex: 1 }} 
        onSubmitEditing = {
          ({ nativeEvent }) => {
            setSubject(nativeEvent.text)
          }
        }
        />
        <RoundedButton size={50} title="+" onPress={() => {addSubject(subject)}} />
      </View>
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flex: 0.5,
    padding: paddingSizes.md,
    justifyContent: "center"
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: fontSizes.lg
  },
  inputContainer: {
    paddingTop: paddingSizes.md,
    flexDirection: "row",
    alignItems: "center"
  }
});
