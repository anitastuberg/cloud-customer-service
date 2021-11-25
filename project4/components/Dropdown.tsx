import React, { useContext, useState } from 'react';
import FilterContext from './FilterContext';
import { useDispatch } from 'react-redux';
import { changeOrder } from '../store/store';
import { Modal, StyleSheet, Text, Pressable, View } from "react-native";
import {Icon} from "react-native-elements";
import { Box, VStack, FormControl, Radio, Divider, Checkbox, NativeBaseProvider } from "native-base";


// Modal menu for choosing filters and order to sort the customer list
const Dropdown = () => {
  const [modalVisible, setModalVisible] = useState(false);

  // order state for customers, the default state is first name ascending
  const [order, setOrdering] = useState('first_name = asc');
  const dispatche = useDispatch();

  const handleChenge = (event: string) => {
    setOrdering(event as string);
    dispatche(changeOrder(event));
  }
  
  const { dispatch } = useContext(FilterContext);

  const [stateSubscriptions, setState] = useState({
    Basic: true,
    Standard: true,
    Premium: true
  });

  const { Basic, Standard, Premium } = stateSubscriptions;
  
  const handleChange = (box:string) => {
    setState((prevState) => ({
      ...stateSubscriptions,
      [box] : !prevState[box],
      }));

    switch (String(box)) {
      case 'Basic':
        dispatch({ type: 'Basic', payload: (!Basic ? box : "") });
        break;
      case 'Standard':
        dispatch({ type: 'Standard', payload: (!Standard ? box : "") });
        break;
      case 'Premium':
        dispatch({ type: 'Premium', payload: (!Premium ? box : "") });
        break;
    };
  }

  return (
    <NativeBaseProvider>
    <View style={styles.cornerView}>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
      >
        {/* Modal */}
        <View style={styles.cornerView}>
          <View style={styles.modalView}>
            <Text style={styles.header}>Filter customers</Text>
            <Box alignItems="flex-start" p="8">
            <VStack alignItems="flex-start" space="5">
                <FormControl>
                  {/* Sort customers */}
                    <FormControl.Label mb="3">Sort by</FormControl.Label>
                    <Radio.Group name="sort_by" value={order} onChange={(order) => handleChenge(order)}>
                        <VStack space="3">
                            <Radio accessibilityLabel='Name a-z' value='first_name = asc'>Name a-z</Radio>
                            <Radio accessibilityLabel='Name z-a' value='first_name = desc'>Name z-a</Radio>
                            <Radio accessibilityLabel='Date low-high' value='birth_date = asc'>Date low-high</Radio>
                            <Radio accessibilityLabel='Date high-low' value='birth_date = desc'>Date high-low</Radio>
                        </VStack>
                    </Radio.Group>
                </FormControl>
                <Divider />
                <FormControl>
                <FormControl.Label mb="3">Subscription</FormControl.Label>
                <VStack space="3">
                <Checkbox size="sm" value='Basic' mb="4" defaultIsChecked={Basic} onChange={() => { handleChange("Basic")}}>
                    Basic
                </Checkbox>
                <Checkbox size="sm" value='Standard' mb="4" defaultIsChecked={Standard} onChange={() => { handleChange("Standard") }}>
                    Standard
                </Checkbox>
                <Checkbox size="sm" value='Premium' mb="4" defaultIsChecked={Premium} onChange={() => { handleChange("Premium") }}>
                    Premium
                </Checkbox>
                </VStack>
                </FormControl>
            </VStack>
          </Box>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.buttonTextStyle}>Hide</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View>
        {/* The icon-button to open the modal */}
            <Icon
                accessibilityLabel='Options to filter and sort'
                name="filter" 
                type="font-awesome" 
                color="white"
                onPress={() => setModalVisible(!modalVisible)}
            />
        </View>
    </View>
    </NativeBaseProvider>
  );
};


// Styling of the menu and filters
const styles = StyleSheet.create({
  // The filter icon to open the modal
  cornerView: {
    flex: 3,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    marginTop: 0,
  },
  // The entire modal
  modalView: {
    margin: 0,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 11,
    paddingTop: 40,
    marginTop: 80,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    shadowColor: "#000",

  },
  // Button to hide modal
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  buttonTextStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 10,
  },
  header: {
    fontWeight: '600',
    alignSelf: 'center',
  }
});

export default Dropdown;