import React, { useState } from 'react';
import { View, StyleSheet, useColorScheme, Text, TextInput, Button, Alert, ScrollView, Modal, TouchableOpacity } from 'react-native';

const WorkSelectionPage = ({ route }) => {
  const { workItems } = route.params;
  const [quantities, setQuantities] = useState({});
  const [divisor, setDivisor] = useState('');
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const handleQuantityChange = (workNumber, quantity) => {
    setQuantities({ ...quantities, [workNumber]: quantity });
  };

  const handleSubmit = () => {
    let total = 0;

    workItems.forEach((item) => {
      const quantity = parseInt(quantities[item.workNumber]) || 0;
      const itemTotal = quantity * parseFloat(item.price);
      total += itemTotal;
    });

    const divisorValue = parseFloat(divisor);
    let finalAmount = total;

    if (!isNaN(divisorValue) && divisorValue !== 0) {
      finalAmount = total / divisorValue;
    }

    Alert.alert("Results", `Kokonais summa: €${total.toFixed(2)}\ntunnit: ${divisorValue || 1}\nTuntipalkka: €${finalAmount.toFixed(2)}`);
  };

  // Function to handle About button press
  const handleAboutPress = () => {
    setModalVisible(true); // Show the modal
  };

  return (
    <View style={isDarkMode ? styles.darkContainer : styles.lightContainer}>   
      <View style={{ flex: 1 }}>
        {/* Scrollable content */}
        <ScrollView contentContainerStyle={{  paddingLeft: 10, paddingRight: 10, paddingBottom: 10, flexGrow: 1 }}>
          {workItems.map((item) => (
            <View key={item.workNumber}>
              <Text style={isDarkMode ? styles.darkText : styles.lightText}>
                Työnumero: {item.workNumber} Hinta: {item.price}€
              </Text>
              <TextInput
                placeholder="Määrä"
                placeholderTextColor={isDarkMode ? '#AAAAAA' : '#555555'}
                keyboardType="numeric"
                onChangeText={(value) => handleQuantityChange(item.workNumber, value)}
                style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
              />
            </View>
          ))}
          <TextInput
            placeholder="tunnit"
            placeholderTextColor={isDarkMode ? '#AAAAAA' : '#555555'}
            keyboardType="numeric"
            value={divisor}
            onChangeText={setDivisor}
            style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
          />
          <View>
            <Button title="Laske" onPress={handleSubmit} color={isDarkMode ? "#0A7B0A" : "green"} />
          </View>
        </ScrollView>
        <View style={{ backgroundColor: isDarkMode ? '#333' : '#f2f2f2' }}>
          <Button title="Ohjeet" onPress={handleAboutPress} color={isDarkMode ? "#0A7B0A" : "#333"} />
        </View>
      </View>

    {/* Modal for About Information */}
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // Close modal on back button press
        >
        <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Ohjeet</Text>
      
                  {/* List items formatted as Text components */}
                  <Text style={styles.modalListItem}>• Lisää määrät työnumeroiden alle.</Text>
                  <Text style={styles.modalListItem}>• lisää montako tuntia olet tehnyt.</Text>
                  <Text style={styles.modalListItem}>• Paina "LASKE".</Text>
                  <Text style={[styles.modalListItem1, styles.centeredText1]}>-------ABOUT-------</Text>
                  <Text style={[styles.modalListItem1, styles.centeredText]}>Developed by:</Text>
                  <Text style={[styles.modalListItem1, styles.centeredText1]}>Jonathan Dahl</Text>
                  <Text style={[styles.modalListItem1, styles.centeredText]}>Version:</Text>
                  <Text style={[styles.modalListItem1, styles.centeredText1]}>2.0</Text>
                  <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)} // Close modal on button press
                  >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
    </View> 
  );
};

// Define dark and light mode styles
const styles = StyleSheet.create({
  centeredText: {
    alignSelf: 'center', // Horizontally center text
    fontStyle: 'italic',
    fontSize: 12
  },
  centeredText1: {
    alignSelf: 'center', // Horizontally center text
    fontStyle: 'italic',
    fontSize: 14
  },
  modalListItem: {
    fontSize: 14,
    marginBottom: 10,
    marginLeft: 15, // Indent each item
  },
  modalListItem1: {
    marginBottom: 5,  
  },
  darkContainer: {
    flex: 1,
    backgroundColor: '#121212',
  },
  lightContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  input: {
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  darkInput: {
    backgroundColor: '#333333',
    borderColor: '#444444',
    color: '#FFFFFF',
  },
  lightInput: {
    backgroundColor: '#FFFFFF',
    borderColor: '#CCCCCC',
    color: '#000000',
  },
  darkText: {
    color: '#FFFFFF',
  },
  lightText: {
    color: '#000000',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Background color with transparency
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#0A7B0A',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default WorkSelectionPage;
