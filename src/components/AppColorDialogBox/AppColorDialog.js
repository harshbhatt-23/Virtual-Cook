import React, { useState, useEffect } from "react";
import { View, StyleSheet, Modal } from "react-native";
import {
  Button,
  RadioButton,
  Text,
  IconButton,
  useTheme,
} from "react-native-paper";
import { connect } from "react-redux";
import { setAppColor } from "../../components/redux/actions";

const AppColorDialog = ({ visible, onDismiss, setAppColor, language }) => {
  const [color, setColor] = useState("#663399");
  const [prevChecked, setPrevChecked] = useState(color);
  const theme = useTheme();

  const displayName = {
    en: {
      appColorHeading: "App Color:",
      apply: "Apply",
      cancel: "Cancel",
      color_1: "Purple",
      color_2: "Brown",
      color_3: "Yellow",
      color_4: "Cinnabar",
      color_5: "Green",
      color_6: "Bondi Blue",
      color_7: "Orange",
      color_8: "Gold drop",
      color_9: "Maroon",
      color_10: "Persian Red",
      color_11: "Daisy Bush",
      color_12: "Sapphire",
      color_13: "Denim",
    },
    fr: {
      appColorHeading: "Couleur de l'application:",
      apply: "Appliquer",
      cancel: "Annuler",
      color_1: "Violette",
      color_2: "Brun",
      color_3: "Jaune",
      color_4: "Cinabre",
      color_5: "Verte",
      color_6: "Bondi Bleu",
      color_7: "Orange",
      color_8: "Goutte d'or",
      color_9: "Bordeaux",
      color_10: "Rouge persan",
      color_11: "Buisson de marguerite",
      color_12: "Saphir",
      color_13: "Jean",
    },
  };

  const handleDoneButton = () => {
    setPrevChecked(color);
    setAppColor(color);
    onDismiss();
  };

  const handleCancelButton = () => {
    setColor(prevChecked);
    onDismiss();
  };

  const handleRadioChange = (color) => {
    setColor(color);
  };

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
          <Text style={styles.title}>
            {displayName[language].appColorHeading}
          </Text>
          <RadioButton.Group onValueChange={handleRadioChange} value={color}>
            <View style={styles.radioContainer}>
              <IconButton icon="brightness-1" size={24} iconColor="#663399" />
              <View style={styles.radioButtonLabelContainer}>
                <RadioButton.Item
                  label={displayName[language].color_1}
                  value="#663399"
                  labelStyle={styles.radioButtonLabel}
                />
              </View>
            </View>
            <View style={styles.radioContainer}>
              <IconButton icon="brightness-1" size={24} iconColor="#5d4037" />
              <View style={styles.radioButtonLabelContainer}>
                <RadioButton.Item
                  label={displayName[language].color_2}
                  value="#5d4037"
                  labelStyle={styles.radioButtonLabel}
                />
              </View>
            </View>
            <View style={styles.radioContainer}>
              <IconButton icon="brightness-1" size={24} iconColor="#fbc02d" />

              <View style={styles.radioButtonLabelContainer}>
                <RadioButton.Item
                  label={displayName[language].color_3}
                  value="#fbc02d"
                  labelStyle={styles.radioButtonLabel}
                />
              </View>
            </View>
            <View style={styles.radioContainer}>
              <IconButton icon="brightness-1" size={24} iconColor="#388e3c" />

              <View style={styles.radioButtonLabelContainer}>
                <RadioButton.Item
                  label={displayName[language].color_5}
                  value="#388e3c"
                  labelStyle={styles.radioButtonLabel}
                />
              </View>
            </View>
            <View style={styles.radioContainer}>
              <IconButton icon="brightness-1" size={24} iconColor="#0097a7" />

              <View style={styles.radioButtonLabelContainer}>
                <RadioButton.Item
                  label={displayName[language].color_6}
                  value="#0097a7"
                  labelStyle={styles.radioButtonLabel}
                />
              </View>
            </View>
            <View style={styles.radioContainer}>
              <IconButton icon="brightness-1" size={24} iconColor="#f57c00" />

              <View style={styles.radioButtonLabelContainer}>
                <RadioButton.Item
                  label={displayName[language].color_8}
                  value="#f57c00"
                  labelStyle={styles.radioButtonLabel}
                />
              </View>
            </View>
            <View style={styles.radioContainer}>
              <IconButton icon="brightness-1" size={24} iconColor="#c2185b" />

              <View style={styles.radioButtonLabelContainer}>
                <RadioButton.Item
                  label={displayName[language].color_9}
                  value="#c2185b"
                  labelStyle={styles.radioButtonLabel}
                />
              </View>
            </View>
            <View style={styles.radioContainer}>
              <IconButton icon="brightness-1" size={24} iconColor="#d32f2f" />

              <View style={styles.radioButtonLabelContainer}>
                <RadioButton.Item
                  label={displayName[language].color_10}
                  value="#d32f2f"
                  labelStyle={styles.radioButtonLabel}
                />
              </View>
            </View>
            <View style={styles.radioContainer}>
              <IconButton icon="brightness-1" size={24} iconColor="#512DA8" />

              <View style={styles.radioButtonLabelContainer}>
                <RadioButton.Item
                  label={displayName[language].color_11}
                  value="#512DA8"
                  labelStyle={styles.radioButtonLabel}
                />
              </View>
            </View>
            <View style={styles.radioContainer}>
              <IconButton icon="brightness-1" size={24} iconColor="#303F9F" />

              <View style={styles.radioButtonLabelContainer}>
                <RadioButton.Item
                  label={displayName[language].color_12}
                  value="#303F9F"
                  labelStyle={styles.radioButtonLabel}
                />
              </View>
            </View>
            <View style={styles.radioContainer}>
              <IconButton icon="brightness-1" size={24} iconColor="#1976D2" />

              <View style={styles.radioButtonLabelContainer}>
                <RadioButton.Item
                  label={displayName[language].color_13}
                  value="#1976D2"
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
    justifyContent: "flex-end", // Align buttons to the end
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
  },
  radioButtonIcon: {
    marginRight: 8,
  },
  radioButtonItem: {
    flex: 1,
  },
  radioButtonLabelContainer: {
    flex: 1,
    marginLeft: 8, // Adjust the margin as needed
  },
  radioButtonLabel: {
    fontSize: 16,
  },
});

const mapStateToProps = (state) => ({
  language: state.language,
});

const mapDispatchToProps = (dispatch) => ({
  setAppColor: (color) => dispatch(setAppColor(color)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppColorDialog);
