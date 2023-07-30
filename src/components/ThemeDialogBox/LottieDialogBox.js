import React, { useState, useEffect, useRef, useCallback } from "react";
import { View, StyleSheet, Modal, Animated } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { connect } from "react-redux";
import LottieView from "lottie-react-native";

const LottieDialog = ({ isShakeVisible, onClose, language }) => {
  const displayName = {
    en: {
      dialogTitle: "Shake to get a random recipe",
      ok: "Ok",
    },
    fr: {
      dialogTitle: "Secouez pour obtenir une recette aléatoire",
      ok: "D'accord",
    },
  };

  const theme = useTheme();

  const handleClose = () => {
    onClose();
  };

  return (
    isShakeVisible && (
      <Modal
        transparent
        visible={isShakeVisible}
        onRequestClose={onClose}
        animationType="fade"
      >
        <View style={styles.modalContainer}>
          <View
            style={[
              styles.dialogContainer,
              { backgroundColor: theme.colors.surface },
            ]}
          >
            <Text style={styles.title}>
              {displayName[language].dialogTitle}
            </Text>
            <Animated.View style={styles.lottieContainer}>
              {/* Wrap LottieView with Animated.View */}
              <LottieView
                source={require("../../../assets/lottie_shake.json")}
                autoPlay
                loop
                style={{ height: 250, width: 250 }}
              />
            </Animated.View>

            <View style={styles.buttonContainer}>
              <Button onPress={handleClose} labelStyle={{ fontSize: 18 }}>
                {displayName[language].ok}
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    )
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
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 5,
    marginBottom: 8,
    marginTop: 8,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "center",
  },
});

const mapStateToProps = (state) => ({
  language: state.language,
});

export default connect(mapStateToProps)(LottieDialog);
