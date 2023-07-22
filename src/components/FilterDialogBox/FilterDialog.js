import React, { useState, useEffect, useCallback } from "react";
import { View, Modal, StyleSheet } from "react-native";
import { Checkbox, Button, useTheme, Text } from "react-native-paper";
import { connect } from "react-redux";

const FilterDialog = ({
  visible,
  onDismiss,
  onSelectCategories,
  initialSelectedCategories = [],
  language,
}) => {
  const displayName = {
    en: {
      Breakfast: "Breakfast",
      Lunch: "Lunch",
      Dinner: "Dinner",
      Dessert: "Dessert",
      selectCategoryTitle: "Select Category(s):",
      apply: "Apply",
      cancel: "Cancel",
    },
    fr: {
      Breakfast: "Petit-déjeuner",
      Lunch: "Déjeunere",
      Dinner: "Dîner",
      Dessert: "Dessert",
      selectCategoryTitle: "Sélectionnez la ou les catégories :",
      apply: "Appliquer",
      cancel: "Annuler",
    },
  };

  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    if (visible) {
      setSelectedCategories(initialSelectedCategories); // Initialize selectedCategories with initialSelectedCategories
    } else {
      setSelectedCategories([]); // Reset selectedCategories when dialog is dismissed
    }
  }, [visible, initialSelectedCategories]);

  const handleDoneButton = useCallback(() => {
    const selectedCategoriesForLanguage = selectedCategories.map((category) => {
      if (language == "en") {
        return displayName[language][category];
      } else {
        return category;
      }
    });

    onSelectCategories(selectedCategoriesForLanguage);
    onDismiss();
  }, [onDismiss, onSelectCategories, selectedCategories, language]);

  const handleCancelButton = () => {
    setSelectedCategories((prevSelectedCategories) => {
      // Restore previously selected categories
      return [...prevSelectedCategories];
    });
    onDismiss();
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prevSelectedCategories) => {
      const isCategorySelected = prevSelectedCategories.includes(category);

      if (isCategorySelected) {
        // If category is already selected, remove it from selectedCategories
        return prevSelectedCategories.filter((c) => c !== category);
      } else {
        // If category is not selected, add it to selectedCategories
        return [...prevSelectedCategories, category];
      }
    });
  };

  const theme = useTheme();

  const renderCheckboxItem = useCallback(
    (category) => {
      return (
        <Checkbox.Item
          key={displayName[language][category]}
          label={displayName[language][category]}
          status={
            selectedCategories.includes(displayName[language][category])
              ? "checked"
              : "unchecked"
          }
          onPress={() => handleCategoryChange(displayName[language][category])}
        />
      );
    },
    [handleCategoryChange, language, selectedCategories]
  );

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
            {displayName[language].selectCategoryTitle}
          </Text>

          {renderCheckboxItem("Breakfast")}
          {renderCheckboxItem("Lunch")}
          {renderCheckboxItem("Dinner")}
          {renderCheckboxItem("Dessert")}

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
  buttonContainer: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

const mapStateToProps = (state) => ({
  language: state.language,
});

export default connect(mapStateToProps)(FilterDialog);
