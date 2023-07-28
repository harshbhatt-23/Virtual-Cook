import React, { useState, useEffect } from "react";
import { View, StyleSheet, Modal } from "react-native";
import { Button, RadioButton, Text, useTheme } from "react-native-paper";
import { connect } from "react-redux";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ThemeDialog = ({ visible, onDismiss, setTheme, language }) => {
  const displayName = {
    en: {
      selectTheme: "Select Theme:",
      apply: "Apply",
      cancel: "Cancel",
      darkTheme: "Dark Theme",
      lightTheme: "Light Theme",
      systemDefaultTheme: "System Default Theme",
    },
    fr: {
      selectTheme: "Sélectionne un thème:",
      apply: "Appliquer",
      cancel: "Annuler",
      darkTheme: "Thème sombre",
      lightTheme: "Thème Lumière",
      systemDefaultTheme: "Thème par défaut du système",
    },
  };

  const colorScheme = useColorScheme();
  const [checked, setChecked] = useState(
    colorScheme === "dark" ? "dark" : "light"
  );
  const [prevChecked, setPrevChecked] = useState(checked);

  const handleDoneButton = async () => {
    setPrevChecked(checked);
    setTheme(checked);
    onDismiss();
    try {
      await AsyncStorage.setItem("selectedTheme", JSON.stringify(checked));
    } catch (error) {
      // Error saving data to AsyncStorage
    }
  };

  const handleCancelButton = () => {
    setChecked(prevChecked);
    onDismiss();
  };

  const handleRadioChange = (checked) => {
    setChecked(checked);
  };

  const theme = useTheme();

  //Async theme store check..
  useEffect(() => {
    const loadThemeFromStorage = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem("selectedTheme");
        if (storedTheme !== null) {
          setChecked(JSON.parse(storedTheme));
          setPrevChecked(JSON.parse(storedTheme));
        }
      } catch (error) {
        // Error retrieving data from AsyncStorage
      }
    };

    loadThemeFromStorage();
  }, []);

  return (
    <Modal
      visible={visible}
      onRequestClose={onDismiss}
      animationType="fade"
      transparent
    >
      <View style={styles.modalContainer}>
        <View
          style={[
            styles.dialogContainer,
            { backgroundColor: theme.colors.surface },
          ]}
        >
          <Text style={styles.title}>{displayName[language].selectTheme}</Text>
          <RadioButton.Group onValueChange={handleRadioChange} value={checked}>
            <View style={styles.radioContainer}>
              <View style={styles.radioButtonLabelContainer}>
                <RadioButton.Item
                  label={displayName[language].lightTheme}
                  value="light"
                  labelStyle={styles.radioButtonLabel}
                />
              </View>
            </View>
            <View style={styles.radioContainer}>
              <View style={styles.radioButtonLabelContainer}>
                <RadioButton.Item
                  label={displayName[language].darkTheme}
                  value="dark"
                  labelStyle={styles.radioButtonLabel}
                />
              </View>
            </View>
          </RadioButton.Group>

          <View style={styles.buttonContainer}>
            <Button onPress={handleCancelButton}>
              {displayName[language].cancel}
            </Button>
            <Button onPress={handleDoneButton}>
              {displayName[language].apply}
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  dialogContainer: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 25,
    width: "80%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 5,
    marginBottom: 8,
    marginTop: 8,
  },
  content: {
    marginBottom: 16,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  buttonContainer: {
    marginLeft: 10,
    marginRight: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioButtonIcon: {
    marginRight: 8,
  },
  radioButtonItem: {
    flex: 1,
  },
  radioButtonLabelContainer: {
    flex: 1,
  },
  radioButtonLabel: {
    fontSize: 16,
  },
});

const mapStateToProps = (state) => ({
  language: state.language,
});

export default connect(mapStateToProps)(ThemeDialog);
