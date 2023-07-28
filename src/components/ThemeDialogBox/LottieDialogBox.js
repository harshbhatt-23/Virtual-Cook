import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Modal, Animated } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";

const LottieDialog = ({ isVisible, onClose, language }) => {
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
  const [isDialogVisible, setIsDialogVisible] = useState(isVisible);

  useEffect(() => {
    // Handle the visibility change from props
    setIsDialogVisible(isVisible);
  }, [isVisible]);

  // Function to handle the dialog close event
  const handleClose = () => {
    setIsDialogVisible(false); // Set the dialog visibility to false
    onClose(); // Call the onClose function provided by the parent to handle the close event
  };

  const animationRef = useRef(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(
    new Animated.Value(0)
  );

  const startAnimation = () => {
    if (animationRef.current) {
      animationRef.current.play();
    }
  };

  const stopAnimation = () => {
    if (animationRef.current) {
      animationRef.current.reset();
    }
  };

  return (
    <Modal isVisible={isDialogVisible} animationType="fade" transparent>
      <View style={styles.modalContainer}>
        <View
          style={[
            styles.dialogContainer,
            { backgroundColor: theme.colors.surface },
          ]}
        >
          <Text style={styles.title}>{displayName[language].dialogTitle}</Text>
          <LottieView
            ref={animationRef}
            source={require("../../../assets/lottie_shake.json")}
            progress={animationProgress}
            loop={false}
            onAnimationFinish={() => setShowAnimation(false)}
            style={{ height: 250, width: 250 }}
          />

          <View style={styles.buttonContainer}>
            <Button onPress={handleClose}>{displayName[language].ok}</Button>
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
