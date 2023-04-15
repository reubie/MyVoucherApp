import axios from 'axios';

// Function to fetch merchant information from API
export const fetchMerchantInfo = async () => {
    try {
      // Make API request to fetch merchant information
      const response = await fetch('https://run.mocky.io/v3/2598c0cf-5647-4ecc-ba4b-15cbc14a2124');
  
      // Handle response
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        // Handle error cases
        throw new Error('Failed to fetch merchant information');
      }
    } catch (error) {
      // Handle error cases
      throw new Error('Failed to fetch merchant information');
    }
  };
  
  // Function to send vouchers to selected contacts
  export const sendVouchers = async (merchantData, voucherDetails, selectedContacts) => {
    try {
      // Make API request to send vouchers
      const response = await fetch('https://api.example.com/send_vouchers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          merchantData,
          voucherDetails,
          selectedContacts,
        }),
      });
  
      // Handle response
      if (response.ok) {
        // Vouchers sent successfully
        const data = await response.json();
        return data;
      } else {
        // Handle error cases
        throw new Error('Failed to send vouchers');
      }
    } catch (error) {
      // Handle error cases
      throw new Error('Failed to send vouchers');
    }
  };
  