import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  setLanguage,
  setMeasurement,
  setVeg,
  setTheme,
  setAppColor,
} from "../redux/actions";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Button, Divider, Switch, useTheme, Text } from "react-native-paper";
import style from "./styles";
import LocalNotification from "../LocalNotification/LocalNotification";
import ThemeDialog from "../ThemeDialogBox/ThemeDialog";
import AppColorDialog from "../AppColorDialogBox/AppColorDialog";

const SettingsScreen = ({
  language,
  setLanguage,
  measurement,
  setMeasurement,
  veg,
  setVeg,
  theme,
  setTheme,
  appColor,
  setAppColor,
}) => {
  const settingsLabel = {
    en: {
      changeLanguage: "Change Language:",
      selectTheme: "Dark Mode",
      enableDarkMode: "Enable Dark Mode",
      changeToMetric: "Metric",
      changeToUsImperial: "Change to US/Imperial",
      measurements: "Measurements:",
      measurementBody: "Default is US/Imperial",
      diet: "Dietery Restrictions:",
      veg: "Vegetarian only",
      themeTitle: "Customize your theme",
      changeTheme: "Theme",
      changeAppColor: "App Color",
    },
    fr: {
      changeLanguage: "Changer de langue:",
      selectTheme: "Mode sombre",
      enableDarkMode: "Activer le mode sombre",
      changeToMetric: "Métrique",
      changeToUsImperial: "Changer pour US/Impérial",
      measurements: "Des mesures:",
      measurementBody: "Par défaut, c'est US/Impérial",
      diet: "Restrictions alimentaires:",
      veg: "Végétarien seulement",
      themeTitle: "Personnalisez votre thème",
      changeTheme: "Thème",
      changeAppColor: "Couleur de l'Application",
    },
  };

  const [isSwitchOn, setIsSwitchOn] = useState(language === "fr");
  const [isSwitchOnMeasurement, setIsSwitchOnMeasurement] = useState(
    measurement === "metric"
  );
  const [isSwitchOnVeg, setIsSwitchOnVeg] = useState(false);

  //Language Switch
  const onToggleSwitch = () => {
    const newLanguage = isSwitchOn ? "en" : "fr";
    setIsSwitchOn(!isSwitchOn);
    setLanguage(newLanguage);
  };

  //Measurement Switch
  const onToggleSwitchMeasurement = () => {
    const newMeasurement = isSwitchOnMeasurement ? "us_imperial" : "metric";
    setIsSwitchOnMeasurement(!isSwitchOnMeasurement);
    setMeasurement(newMeasurement);
  };

  //Veg Switch
  const onToggleSwitchVeg = () => {
    setIsSwitchOnVeg(!isSwitchOnVeg);
    setVeg(!isSwitchOnVeg);
  };

  //Theme
  const [themeDialogVisible, setThemeDialogVisible] = useState(false);
  const showDialog = () => {
    setThemeDialogVisible(true);
  };

  const hideThemeDialog = () => {
    setThemeDialogVisible(false);
  };

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
    hideThemeDialog();
  };

  //Appcolor
  const [appColorDialogVisible, setAppColorDialogVisible] = useState(false);
  const showAppColorDialog = () => {
    setAppColorDialogVisible(true);
  };

  const hideAppColorDialog = () => {
    setAppColorDialogVisible(false);
  };

  const handleAppColorChange = (selectedAppColor) => {
    setAppColor(selectedAppColor);
    hideAppColorDialog();
  };

  const currentTheme = useTheme();
  const isDarkTheme = currentTheme.dark;

  // Step 2: Determine the StatusBar background color based on the theme
  const statusBarBackgroundColor = isDarkTheme
    ? currentTheme.colors.background
    : currentTheme.colors.surface;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={[style.container]}>
        <Text style={style.title}>
          {settingsLabel[language].changeLanguage}
        </Text>
        <View style={style.switch}>
          <Text style={style.options.label}>
            {isSwitchOn ? "Changer en français" : "Change to French"}
          </Text>
          <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
        </View>
        <Divider />

        <LocalNotification />

        <Divider />

        <Text style={style.title}>{settingsLabel[language].measurements}</Text>
        <Text style={style.description}>
          {settingsLabel[language].measurementBody}
        </Text>
        <View style={style.switch}>
          <Text style={style.options.label}>
            {settingsLabel[language].changeToMetric}
          </Text>
          <Switch
            value={isSwitchOnMeasurement}
            onValueChange={onToggleSwitchMeasurement}
          />
        </View>

        <Divider />

        <Text style={style.title}>{settingsLabel[language].diet}</Text>
        <View style={style.switch}>
          <Text style={style.options.label}>{settingsLabel[language].veg}</Text>
          <Switch value={isSwitchOnVeg} onValueChange={onToggleSwitchVeg} />
        </View>
        <Divider />

        <Text style={style.title}>{settingsLabel[language].themeTitle}</Text>
        <View style={style.themeButtons}>
          <View style={{ flex: 1 }}>
            <Button
              mode="contained-tonal"
              icon="theme-light-dark"
              onPress={showDialog}
            >
              {settingsLabel[language].changeTheme}
            </Button>
          </View>
          <ThemeDialog
            visible={themeDialogVisible}
            onDismiss={hideThemeDialog}
            setTheme={handleThemeChange}
            language={language}
          />
          <Divider />

          <View style={{ flex: 1 }}>
            <Button
              mode="outlined"
              icon="format-color-fill"
              onPress={showAppColorDialog}
            >
              {settingsLabel[language].changeAppColor}
            </Button>
          </View>
          <AppColorDialog
            visible={appColorDialogVisible}
            onDismiss={hideAppColorDialog}
            setAppColor={handleAppColorChange}
            language={language}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  language: state.language,
  measurement: state.measurement,
  veg: state.veg,
  appColor: state.appColor,
  theme: state.theme,
});

const mapDispatchToProps = {
  setLanguage,
  setMeasurement,
  setVeg,
  setAppColor,
  setTheme,
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
