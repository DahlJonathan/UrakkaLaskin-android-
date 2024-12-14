import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Button, Text, FlatList, ScrollView, Alert, useColorScheme, Modal, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WorkEntryPage = ({ navigation }) => {
  const [workNumber, setWorkNumber] = useState('');
  const [price, setPrice] = useState('');
  const [workItems, setWorkItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  useEffect(() => {
    const loadWorkItems = async () => {
      try {
        const savedItems = await AsyncStorage.getItem('workItems');
        if (savedItems) {
          setWorkItems(JSON.parse(savedItems));
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load work items');
      }
    };
    loadWorkItems();
  }, []);

  useEffect(() => {
    const saveWorkItems = async () => {
      try {
        await AsyncStorage.setItem('workItems', JSON.stringify(workItems));
      } catch (error) {
        Alert.alert('Error', 'Failed to save work items');
      }
    };
    saveWorkItems();
  }, [workItems]);

  const addWorkItem = () => {
    if (workNumber && price) {
      setWorkItems([...workItems, { workNumber, price }]);
      setWorkNumber('');
      setPrice('');
    } else {
      Alert.alert('Error', 'Työnumero ja hinta');
    }
  };

  const deleteWorkItem = (workNumberToDelete) => {
    setWorkItems(workItems.filter(item => item.workNumber !== workNumberToDelete));
  };

  // Function to handle About button press
  const handleAboutPress = () => {
    setModalVisible(true); // Show the modal
  };

  return (
    <View style={isDarkMode ? styles.darkContainer : styles.lightContainer}> 
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: 10 }}>
          <TextInput
            placeholder="Työnumero"
            value={workNumber}
            onChangeText={setWorkNumber}
            style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
            placeholderTextColor={isDarkMode ? "#AAAAAA" : "#555555"}
          />
          <TextInput
            placeholder="Hinta"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
            placeholderTextColor={isDarkMode ? "#AAAAAA" : "#555555"}
          />
          <View style={{ marginBottom: 5 }}>
            <Button title="Lisää työvaihe" onPress={addWorkItem} color={isDarkMode ? "#0A7B0A" : "green"} />
          </View>
          <View style={{ marginBottom: 5 }}>
            <Button
              title="Laskuri"
              onPress={() => navigation.navigate('WorkSelectionPage', { workItems })}
            />
          </View>

          <FlatList
            data={workItems}
            keyExtractor={(item) => item.workNumber}
            renderItem={({ item }) => (
              <View style={[styles.workItem, isDarkMode ? styles.darkWorkItem : styles.lightWorkItem]}>
                <Text style={isDarkMode ? styles.darkText : styles.lightText}>
                Työnumero: {item.workNumber} Hinta: {item.price}€
                </Text>
                <Button title="Poista" onPress={() => deleteWorkItem(item.workNumber)} color={isDarkMode ? "#B22222" : "red"} />
              </View>
            )}
          />
        </ScrollView>
        
        <View style={{ backgroundColor: isDarkMode ? '#333' : '#f2f2f2' }}>
          <Button title="Ohjeet" onPress={handleAboutPress} color={isDarkMode ? "#0A7B0A" : "#333"} />
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
                  <Text style={styles.modalListItem}>• Lisää työnumero ja työvaiheen hinta.</Text>
                  <Text style={styles.modalListItem}>• Hinnassa pitää käyttää piste [ . ] ei pilkku [ , ].</Text>
                  <Text style={styles.modalListItem}>• Paina "LISÄÄ TYÖVAIHE".</Text>
                  <Text style={styles.modalListItem}>• Alle ilmestyy työvaihe/hinta.</Text>
                  <Text style={styles.modalListItem}>• Voit lisätä niin monta kuin tarvitset.</Text>
                  <Text style={styles.modalListItem}>• Kun olet valmis paina "LASKURI".</Text>
                  <Text style={[styles.modalListItem1, styles.centeredText1]}>-------ABOUT-------</Text>
                  <Text style={[styles.modalListItem1, styles.centeredText]}>Developed by:</Text>
                  <Text style={[styles.modalListItem1, styles.centeredText1]}>Jonathan Dahl</Text>
                  <Text style={[styles.modalListItem1, styles.centeredText]}>Version:</Text>
                  <Text style={[styles.modalListItem1, styles.centeredText1]}>2.1</Text>
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
  workItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    borderRadius: 5,
  },
  darkWorkItem: {
    backgroundColor: '#333333',
  },
  lightWorkItem: {
    backgroundColor: '#EEEEEE',
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


export default WorkEntryPage;
