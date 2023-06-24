import React, { useState } from "react";
import { View, Text, Modal, StyleSheet } from "react-native";
import { Checkbox, Button } from "react-native-paper";
import { connect } from "react-redux";

const FilterDialog = ({ visible, onDismiss, onSelectCategories, language }) => {
  const [breakfastChecked, setBreakfastChecked] = useState(false);
  const [lunchChecked, setLunchChecked] = useState(false);
  const [dinnerChecked, setDinnerChecked] = useState(false);
  const [dessertChecked, setDessertChecked] = useState(false);

  const displayName = {
    en: {
      breakfast: "Breakfast",
      lunch: "Lunch",
      dinner: "Dinner",
      dessert: "Dessert",
      selectCategoryTitle: "Select Categorie(s):",
      apply: "Apply",
      cancel: "Cancel",
    },
    fr: {
      breakfast: "Petit-déjeuner",
      lunch: "Déjeunere",
      dinner: "Dîner",
      dessert: "Dessert",
      selectCategoryTitle: "Sélectionnez la ou les catégories:",
      apply: "Appliquer",
      cancel: "Annuler",
    },
  };

  const handleDoneButton = () => {
    const selectedCategories = [];
    if (breakfastChecked) {
      selectedCategories.push(displayName[language].breakfast);
    }
    if (lunchChecked) {
      selectedCategories.push(displayName[language].lunch);
    }
    if (dinnerChecked) {
      selectedCategories.push(displayName[language].dinner);
    }
    if (dessertChecked) {
      selectedCategories.push(displayName[language].dessert);
    }

    onSelectCategories(selectedCategories);
    console.log("Selectred Categories" + selectedCategories);
    onDismiss();
  };

  const handleCancelButton = () => {
    onDismiss();
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={onDismiss}
      animationType="fade"
      transparent
    >
      <View style={styles.modalContainer}>
        <View style={styles.dialogContainer}>
          <Text style={styles.title}>
            {displayName[language].selectCategoryTitle}
          </Text>
          <Checkbox.Item
            label={displayName[language].breakfast}
            status={breakfastChecked ? "checked" : "unchecked"}
            onPress={() => setBreakfastChecked(!breakfastChecked)}
          />
          <Checkbox.Item
            label={displayName[language].lunch}
            status={lunchChecked ? "checked" : "unchecked"}
            onPress={() => setLunchChecked(!lunchChecked)}
          />
          <Checkbox.Item
            label={displayName[language].dinner}
            status={dinnerChecked ? "checked" : "unchecked"}
            onPress={() => setDinnerChecked(!dinnerChecked)}
          />
          <Checkbox.Item
            label={displayName[language].dessert}
            status={dessertChecked ? "checked" : "unchecked"}
            onPress={() => setDessertChecked(!dessertChecked)}
          />

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
    maxWidth: 400,
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
});

const mapStateToProps = (state) => ({
  language: state.language,
});

export default connect(mapStateToProps)(FilterDialog);
