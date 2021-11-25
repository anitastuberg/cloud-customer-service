import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ItemValue } from '@react-native-picker/picker/typings/Picker';


const Subscriptions = [
    {
      value: 'basic',
      label: 'Basic',
    },
    {
      value: 'standard',
      label: 'Standard',
    },
    {
      value: 'premium',
      label: 'Premium',
    }
  ];


type SelectSubscriptionType = {
    subscription: string
    setSubscription: (value: string) => void
  }
  
  // Function to select subscription from the dropdown menu
  export const SelectSubscription: React.FC<SelectSubscriptionType> = ({ subscription, setSubscription }) => {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        marginTop: 0,
        marginBottom:10,
        paddingTop: 0,
        alignItems: "center"
      },
      picker: {
         height: 'auto', 
         width: 150, 
      },
      inputHeader: {
        fontSize: 16,
      }
    });
  
    return (
      <View style={styles.container}>
        <Text style={styles.inputHeader}>Subscription:</Text>
        <Picker
          accessibilityLabel='Select subscription'
          prompt="Subscription options"
          selectedValue={subscription}
          style={styles.picker}
          onValueChange={(itemValue: ItemValue, itemIndex) => setSubscription(itemValue + "")}>
          <Picker.Item label="Basic" value="basic" />
          <Picker.Item label="Standard" value="standard" />
          <Picker.Item label="Premium" value="premium" />
        </Picker>
      </View>
    )
  }


