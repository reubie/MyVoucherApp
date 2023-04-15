import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Button,
  Alert,
  FlatList,
} from 'react-native';
import {fetchMerchantInfo, sendVouchers} from '../services/api'; // Import fetchMerchantInfo and sendVouchers functions from api.js
import ContactItem from '../components/ContactItem'; // Import ContactItem component for rendering individual contact items

const VoucherCustomizationScreen = () => {
  const [merchantData, setMerchantData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedContacts, setSelectedContacts] = useState([]); // State to store selected contacts

  useEffect(() => {
    // Fetch merchant information on component mount
    fetchMerchantData();
  }, []);

  const fetchMerchantData = async () => {
    try {
      // Fetch merchant information from API
      const data = await fetchMerchantInfo();
      setMerchantData(data);
      setLoading(false);
    } catch (error) {
      // Handle error cases
      setError(error.message);
      setLoading(false);
    }
  };

  // Handler for sending vouchers
  const handleSendVouchers = async () => {
    // Check if any contacts are selected
    if (selectedContacts.length === 0) {
      Alert.alert(
        'No contacts selected',
        'Please select at least one contact to send vouchers.',
      );
      return;
    }

    try {
      // Prepare voucher details
      const voucherDetails = {
        /* voucher details object */
      };

      // Send vouchers to selected contacts
      await sendVouchers(merchantData, voucherDetails, selectedContacts);

      // Display success message
      Alert.alert(
        'Vouchers sent',
        'Vouchers have been sent to selected contacts successfully.',
      );

      // Clear selected contacts
      setSelectedContacts([]);
    } catch (error) {
      // Display error message
      Alert.alert('Error', 'Failed to send vouchers. Please try again later.');
    }
  };

  // Handler for toggling contact selection
  const handleToggleContact = contactId => {
    // Check if contact is already selected
    if (selectedContacts.includes(contactId)) {
      // If so, remove from selected contacts
      setSelectedContacts(selectedContacts.filter(id => id !== contactId));
    } else {
      // If not, add to selected contacts
      setSelectedContacts([...selectedContacts, contactId]);
    }
  };

  // Render loading spinner while data is being fetched
  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  // Render error message if there's an error
  if (error) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>{error}</Text>
      </View>
    );
  }

  // Render merchant data if available
  return (
    <View style={{flex: 1}}>
      {merchantData && (
        <View style={{flex: 1}}>
          <Text style={{margin: 16}}>Merchant Name: {merchantData.name}</Text>
          <Text style={{marginHorizontal: 16}}>
            Merchant Location: {merchantData.location}
          </Text>
          <FlatList
            data={merchantData.contacts}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <ContactItem
                contact={item}
                // Pass contact details and selected state to ContactItem component
                onPress={() => handleToggleContact(item.id)}
                selected={selectedContacts.includes(item.id)}
              />
            )}
          />
          <View style={{margin: 16}}>
            {/* Render send vouchers button */}
            <Button title="Send Vouchers" onPress={handleSendVouchers} />
          </View>
        </View>
      )}
    </View>
  );
};

export default VoucherCustomizationScreen;
