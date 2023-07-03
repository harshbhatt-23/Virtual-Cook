import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Modal, StyleSheet } from "react-native";
import { Checkbox, Button } from "react-native-paper";
import { connect } from "react-redux";

const FilterDialog = ({
  visible,
  onDismiss,
  onSelectCategories,
  language,
}) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    if (!visible) {
      setSelectedCategories([]);
    }
  }, [visible]);

  const displayName = {
    en: {
      breakfast: "Breakfast",
      lunch: "Lunch",
      dinner: "Dinner",
      dessert: "Dessert",
      selectCategoryTitle: "Select Category(s):",
      apply: "Apply",
      cancel: "Cancel",
    },
    fr: {
      breakfast: "Petit-déjeuner",
      lunch: "Déjeunere",
      dinner: "Dîner",
      dessert: "Dessert",
      selectCategoryTitle: "Sélectionnez la ou les catégories :",
      apply: "Appliquer",
      cancel: "Annuler",
    },
  };

  const handleDoneButton = useCallback(() => {
    const selectedCategoriesForLanguage = selectedCategories.map((category) => {
      return displayName[language][category];
    });

    setSelectedCategories(selectedCategoriesForLanguage);
    console.log(selectedCategoriesForLanguage);

    onSelectCategories(selectedCategoriesForLanguage);
    onDismiss();
  }, [onDismiss, onSelectCategories, selectedCategories, language]);
  

  const handleCancelButton = useCallback(() => {
    setSelectedCategories([]);
    onDismiss();
  }, [onDismiss]);

  const handleCategoryChange = useCallback(
    (category) => {
      const lowerCaseCategory = category.toLowerCase();
      setSelectedCategories((prevSelectedCategories) => {
        if (prevSelectedCategories.includes(lowerCaseCategory)) {
          return prevSelectedCategories.filter((c) => c !== lowerCaseCategory);
        } else {
          return [...prevSelectedCategories, lowerCaseCategory];
        }
      });
    },
    []
  );

  const renderCheckboxItem = useCallback(
    (category) => {
      const lowercaseCategory = category.toLowerCase();
      console.log(selectedCategories)
      return (
        <Checkbox.Item
          key={lowercaseCategory}
          label={displayName[language][lowercaseCategory]}
          status={
            selectedCategories.includes(lowercaseCategory)
              ? "checked"
              : "unchecked"
          }
          onPress={() => handleCategoryChange(lowercaseCategory)}
        />
      );
    },
    [handleCategoryChange, language, selectedCategories]
  );

  useEffect(() => {
    setSelectedCategories([]);
  }, [visible]);

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
          {renderCheckboxItem("breakfast")}
          {renderCheckboxItem("lunch")}
          {renderCheckboxItem("dinner")}
          {renderCheckboxItem("dessert")}
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