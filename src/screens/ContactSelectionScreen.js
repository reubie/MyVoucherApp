import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import * as Contacts from 'expo-contacts';

const ContactSelectionScreen = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);

  // Fetch contacts from phone book on component mount
  useEffect(() => {
    const fetchContacts = async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Image],
        });

        if (data.length > 0) {
          setContacts(data);
        }
      }
    };

    fetchContacts();
  }, []);

  // Handler for toggling selection of a contact
  const handleContactSelection = (contactId) => {
    const isSelected = selectedContacts.includes(contactId);

    if (isSelected) {
      setSelectedContacts(selectedContacts.filter(id => id !== contactId));
    } else {
      setSelectedContacts([...selectedContacts, contactId]);
    }
  };

  // Render individual contact item in the list
  const renderItem = ({ item }) => {
    const isSelected = selectedContacts.includes(item.id);

    return (
      <TouchableOpacity
        style={[styles.contactItem, { backgroundColor: isSelected ? 'green' : 'white' }]}
        onPress={() => handleContactSelection(item.id)}
      >
        <Text>{`${item.firstName} ${item.lastName}`}</Text>
        <Text>{item.phoneNumbers[0]?.number}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      {/* Render list of contacts */}
      <FlatList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  contactItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
});

export default ContactSelectionScreen;
