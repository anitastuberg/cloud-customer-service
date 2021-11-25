import React from 'react';
import { SafeAreaView, TextInput, TextInputProps, Button, View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { FunctionComponent, useContext, useState } from 'react';
import DatePicker from 'react-native-datepicker';
import { Modal } from 'react-native-paper';
import {SelectSubscription} from './SelectSubscription';
import { createPerson } from '../gql/queries';
import { useMutation} from '@apollo/client';
import { filterUsers } from '../gql/queries';
import { useSelector } from 'react-redux';
import FilterContext from './FilterContext';
import { AppState } from '../store/store';

interface AddCustomerModalProps {
  onConfirm: () => void
  onCancel: () => void
  message: string
}



function getMonthlyPrice(subscription: string) {
  if (subscription === 'basic') {
    return 99;
  }
  if (subscription === 'standard') {
    return 199;
  }
  if (subscription === 'premium') {
    return 499;
  }
  return "";
}

export const AddCustomer: FunctionComponent<AddCustomerModalProps> = (props: TextInputProps) => {
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [cardType, setCardType] = useState('');
  const [subscription, setSubscription] = React.useState('basic');
  const [cardNumber, setCardNumber] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [postalCode, setPostalCode] = useState('');

  function capitalizeFirstLetter(name: string) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  const [showSaveModal, setShowSaveModal] = useState<boolean>(false);
  const toggleSaveModal = () => setShowSaveModal(!showSaveModal);

  const [showCancelModal, selShowCancelModal] = useState<boolean>(false);
  const toggleCancelModal = () => selShowCancelModal(!showCancelModal);

  const onSave = () => {
    const inputValues = [firstName, lastName, email, subscription, getMonthlyPrice(subscription), cardType, cardNumber, address, country, city, phoneNumber, postalCode, birthday];
    //console.log(inputValues);
    console.log("valid email: " + validateEmail(email));

    if (inputValues.some(i => i == '')){

        Alert.alert('Please fill inn all fields');
        toggleSaveModal();
        return;
    }

    if (!validateEmail(email)){
        Alert.alert('Please use a legal email');
        toggleSaveModal();
        return;
    }

    console.log(inputValues);

    Alert.alert("Customer succsessfully added");
    toggleSaveModal();
    
    mutateFunction({variables: {
        first_name: capitalizeFirstLetter(String(inputValues[0])),
        last_name: capitalizeFirstLetter(String(inputValues[1])),
        email: String(inputValues[2]),
        country: String(inputValues[8]),
        city: String(inputValues[9]),
        birth_date: String(inputValues[12]),
        phone_number: String(inputValues[10]),
        subscription:capitalizeFirstLetter(String(inputValues[3])),
        balance: String(inputValues[4]),
        card_number: String(inputValues[6]),
        card_type: String(inputValues[5]),
        address: String(inputValues[7])
    }})

    clearWindow();
  };

    function validateEmail(inputEmail:string) 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(inputEmail);
    }

    const ordering:string = useSelector((state: AppState) => state.ordering);
    const { state } = useContext(FilterContext);
  
    const [mutateFunction, { data, loading, error }] = useMutation(createPerson,{
        variables:{
        first_name: "",
        last_name: "",
        email: "",
        country: "",
        city: "",
        birth_date: "",
        phone_number: "",
        subscription: "",
        balance: "",
        card_number: "",
        card_type: "",
        address: ""
        },
        refetchQueries:[
        {query: filterUsers,
            variables:{
            subscription: String(Object.values(state)),
            name: String(Object.values(state)[3]),
            limit:10,
            orderBy: ordering,
            }
        }
        ],

        onError(err) {
        console.log(err);
        },
    });

    const clearWindow = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setBirthday("");
        setCardType("");
        setSubscription("");
        setCardNumber("");
        setAddress("");
        setCountry("");
        setCity("");
        setPhoneNumber("");
        setPostalCode("");
    }

  const onCancel = () => {
    //console.log("Cancel button pushed");
    
    clearWindow();
    toggleCancelModal();

  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.scrollView}>
        <View style={styles.headerView}>
        <Text style={styles.headerText}>
          Add a new customer to the database by filling in all the fields and click save
          </Text>
          </View>
      <React.Fragment>        
        {/* Form with all fields to be filled in by user */}
        <Text style={styles.inputHeader}>First name</Text>
        <TextInput accessibilityLabel='First name' {...props} value={firstName} onChangeText={text => setFirstName(text + "")} style={styles.TextInput}  placeholder="e.g. John"/>
        <Text style={styles.inputHeader}>Last name</Text>
        <TextInput accessibilityLabel='Last name' {...props} value={lastName} onChangeText={text => setLastName(text + "")} style={styles.TextInput}  placeholder="e.g. Doe"/>
        <Text style={styles.inputHeader}>Email address</Text>
        <TextInput accessibilityLabel='Email address'{...props} value={email} onChangeText={text => setEmail(text + "")} keyboardType="email-address" style={styles.TextInput}  placeholder="e.g. someone@example.com"/>
        <Text style={styles.inputHeader}>Birth date</Text>
        <DatePicker
          accessibilityLabel='Birth date'
          style={styles.DatePicker}
          date={birthday} // Initial date from state
          mode="date" // The enum of date, datetime and time
          placeholder="Birth date"
          format={"YYYY-MM-DD"}
          minDate="1900-01-01"
          maxDate="2022-01-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={(birthday: any) => {
            setBirthday(birthday)
          }} />
      </React.Fragment>
      <Text style={styles.inputHeader}>Card type</Text>
        <TextInput accessibilityLabel='Card Type' value={cardType} onChangeText={text => setCardType(text + "")} placeholder="e.g Mastercard" style={styles.TextInput} />
        <Text style={styles.inputHeader}>Card number</Text>
        <TextInput accessibilityLabel='Card number' value={cardNumber} {...props} onChangeText={text => setCardNumber(text + "")} style={styles.TextInput} placeholder="e.g 4567.11.3452"/>
        <Text style={styles.inputHeader}>Address</Text>
        <TextInput accessibilityLabel='Address' value={address} {...props} onChangeText={text => setAddress(text + "")} style={styles.TextInput} placeholder="e.g 39 St. Swithin St"/>
        <Text style={styles.inputHeader}>Country</Text>
        <TextInput accessibilityLabel='Country' value={country} {...props} onChangeText={text => setCountry(text + "")} style={styles.TextInput} placeholder="e.g Scotland"/>
        <Text style={styles.inputHeader}>City</Text>
        <TextInput accessibilityLabel='City' value={city} {...props} onChangeText={text => setCity(text + "")} style={styles.TextInput} placeholder="e.g Aberdeen"/>
        <Text style={styles.inputHeader}>Phone number</Text>
        <TextInput accessibilityLabel='Phone number' value={phoneNumber} {...props} onChangeText={text => setPhoneNumber(text + "")} keyboardType="number-pad" style={styles.TextInput} placeholder="e.g +42 345 22 980"/>
        <Text style={styles.inputHeader}>Postal Code</Text>
        <TextInput accessibilityLabel='Postal code' value={postalCode} {...props} onChangeText={text => setPostalCode(text + "")} keyboardType="number-pad" style={styles.TextInput}  placeholder="e.g. 1412, AB10 6XL, 83522
"/>
        <SelectSubscription subscription={subscription} setSubscription={setSubscription} />

        <View style={styles.saveCancelButtons}>
            <View style={styles.buttons}>
          <Button title="Save customer" onPress={() => toggleSaveModal()} />
          </View>
          <View style={styles.buttons}>
          <Button  title="Cancel" onPress={() => toggleCancelModal()} />
          </View>
        </View>


        <Modal visible={showSaveModal}>
            <View style={styles.modalView}>
            <Text>Do you want to save customer to database?</Text>
            <View style={styles.buttonView}>
            <Pressable
              onPress={() => onSave()}
            >
            <Text>Yes</Text>
            </Pressable>
            <View style={styles.buttonView}/>
            <Pressable
              onPress={() => toggleSaveModal()}
            >
            <Text>No</Text>
            </Pressable>
            </View>
            </View>
        </Modal>
        <Modal visible={showCancelModal}>
            <View style={styles.modalView}>
            <Text>Do you want to clear the window?</Text>
            <View style={styles.buttonView}>
            <Pressable
              onPress={() => onCancel()}
            >
            <Text>Yes</Text>
            </Pressable>
            <View style={styles.buttonView}/>
            <Pressable
              onPress={() => toggleCancelModal()}
            >
            <Text>No</Text>
            </Pressable>
            </View>
            </View>
        </Modal>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  TextInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    height: 50,
    width: '100%',
    margin: 10,
    marginBottom: 20,
    paddingLeft: 5,
  },
  DatePicker: {
    width: 250,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    borderRadius: 10,
  },
  // Modal for popup when clicking save/cancel
  modalView: {
    margin: 20,
    zIndex: 21,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    alignSelf: "center",
    alignContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonView: {
    shadowColor: "#000",
    flexDirection: 'row',
    margin: 10,
  },
  scrollView: {
    width: '100%',
    backgroundColor: '#ffff',
    padding: 20,
    paddingBottom: 40
  },
  // text in the header
  headerText: {
    fontSize: 20,
  },
  // the box for the header text
  headerView: {
    borderRadius: 10,
    backgroundColor: '#cdebf9',
    padding: 15,
    marginBottom: 25,
  },
  // Names for the input text fields
  inputHeader: {
    fontSize: 16,
  },
  saveCancelButtons: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    alignContent:'space-between',
    marginTop: 0,
    marginBottom: 90,
  },
  buttons:{
      margin:10
  },
});
