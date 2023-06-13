import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setLanguage } from '../redux/actions';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Switch } from 'react-native-paper';
import style from './styles';

const SettingsScreen = ({ language, setLanguage }) => {
  const [isSwitchOn, setIsSwitchOn] = useState(language === 'fr');

  const onToggleSwitch = () => {
    const newLanguage = isSwitchOn ? 'en' : 'fr';
    setIsSwitchOn(!isSwitchOn);
    setLanguage(newLanguage);
  };

  return (
    <View style={style.container}>
      <View style={style.switch}>
        <Text>
          {isSwitchOn ? 'French' : 'English'} Language
        </Text>
        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  language: state.language,
});

const mapDispatchToProps = {
  setLanguage,
};

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
