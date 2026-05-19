import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TextInput, View} from 'react-native';

export interface SignUpTextProps {
    handleText: (value: string) => void;
}
const SignUpPWInput: React.FC<SignUpTextProps>=({ handleText })=>{
  
  const [checked, setChecked] = React.useState('first');
  const handleChange = (value: string) => {
    handleText(value); // Call the handleId function with the new value
    // console.log(value,"dd");
  };
  return (
        <TextInput style={styles.TextInput} secureTextEntry={true} onChangeText={handleChange} />
  );
}
const styles = StyleSheet.create({
  rootWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '7%',
    marginBottom: '3%',
    //backgroundColor: '#aab',
  },
  icon: {
    width: 20,
    height: 25,
    //backgroundColor: '#ff0',
  },

  textWrapper: {
    alignItems: 'center',
    paddingLeft: 20,
    display: 'flex',
    flexDirection: 'row',
    width: '85%',
    backgroundColor: 'transparent',
    height: '100%',
    borderColor: '#E6E6E6',
    borderWidth: 1,
    borderRadius: 5,
  },
  TextInput: {
    borderColor: '#E6E6E6',
    borderWidth: 1,
    width: '100%',
    height: '55%',
    borderRadius: 3,
  },
});

export default SignUpPWInput;