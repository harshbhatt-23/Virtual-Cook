import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Button, Dialog, Portal, Text, Checkbox } from 'react-native-paper';

const Home = ({ selectedOptions = [], handleOptionPress, handleApplyFilters }) => {

  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const [breakfastChecked, setBreakfastChecked] = useState(false);
  const [lunchChecked, setLunchChecked] = useState(false);
  const [dinnerChecked, setDinnerChecked] = useState(false);
  const [dessertChecked, setDessertChecked] = useState(false);

  const handleDoneButton = () => {
    // Create an array to store the selected categories
    const selectedCategories = [];

    // Check each category and add it to the selectedCategories array if it is selected
    if (breakfastChecked) {
      selectedCategories.push('Breakfast');
    }
    if (lunchChecked) {
      selectedCategories.push('Lunch');
    }
    if (dinnerChecked) {
      selectedCategories.push('Dinner');
    }
    if (dessertChecked) {
      selectedCategories.push('Dessert');
    }

    // Do something with the selected categories array
    console.log('Selected Categories:', selectedCategories);
    hideDialog()
  };


  // const isOptionSelected = (option) => {
  //   return selectedOptions.includes(option);
  // };

  // const toggleOption = (option) => {
  //   let updatedOptions = [];
  //   if (isOptionSelected(option)) {
  //     updatedOptions = selectedOptions.filter((selectedOption) => selectedOption !== option);
  //   } else {
  //     updatedOptions = [...selectedOptions, option];
  //   }
  //   handleOptionPress(updatedOptions);
  // };

  return (
    // <View style={styles.container}>
    //   <View style={styles.modalBox}>
    //     <Text style={styles.title}>Filter Options</Text>
    //     <TouchableOpacity
    //       style={[styles.option, isOptionSelected('option1') && styles.selectedOption]}
    //       onPress={() => toggleOption('option1')}
    //     >
    //       <Text style={styles.optionText}>Option 1</Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity
    //       style={[styles.option, isOptionSelected('option2') && styles.selectedOption]}
    //       onPress={() => toggleOption('option2')}
    //     >
    //       <Text style={styles.optionText}>Option 2</Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity
    //       style={[styles.option, isOptionSelected('option3') && styles.selectedOption]}
    //       onPress={() => toggleOption('option3')}
    //     >
    //       <Text style={styles.optionText}>Option 3</Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity style={styles.applyButton} onPress={handleApplyFilters}>
    //       <Text style={styles.buttonText}>Apply Filters</Text>
    //     </TouchableOpacity>
    //   </View>
    // </View>

    <View style={styles.container}>
      <Button onPress={showDialog}>Show Dialog</Button>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Category</Dialog.Title>
          <Dialog.Content>
            <View>
              <View style={styles.categoryContainer}>
                <Checkbox.Item
                  label="Breakfast"
                  status={breakfastChecked ? 'checked' : 'unchecked'}
                  onPress={() => setBreakfastChecked(!breakfastChecked)}
                />
                <Checkbox.Item
                  label="Lunch"
                  status={lunchChecked ? 'checked' : 'unchecked'}
                  onPress={() => setLunchChecked(!lunchChecked)}
                />
                <Checkbox.Item
                  label="Dinner"
                  status={dinnerChecked ? 'checked' : 'unchecked'}
                  onPress={() => setDinnerChecked(!dinnerChecked)}
                />
                <Checkbox.Item
                  label="Dessert"
                  status={dessertChecked ? 'checked' : 'unchecked'}
                  onPress={() => setDessertChecked(!dessertChecked)}
                />
              </View>
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleDoneButton}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#FFFFFF',
    //width: '80%',
    width: '80%'
  },
  modalBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    width: '90%',
    elevation: 5, // Add elevation for outer shadow
    shadowColor: '#000000', // Set shadow color
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  option: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 4,
  },
  selectedOption: {
    backgroundColor: '#0066FF',
    borderColor: '#0066FF',
  },
  optionText: {
    color: '#000000',
  },
  applyButton: {
    backgroundColor: '#0066FF',
    borderRadius: 4,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Home;