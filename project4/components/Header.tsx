import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import Dropdown from './Dropdown';

export const HomeHeader = () => {
    return (
        <View style={styles.container}>
                <Header style={styles.header}
                    centerComponent={{ text: "Cloud Customer Service", style: { color: "#fff", fontSize:19 }}}
                    rightComponent={<Dropdown />}
                />
        </View>
    );
}

export const AddCustomerHeader = () => {
    return (
        <View style={styles.container}>
                <Header style={styles.header}
                    centerComponent={{ text: "Cloud Customer Service", style: { color: "#fff", fontSize:19 }}}
                />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: 'rgba(52, 52, 52, 0.1)',
    },
    header: {
        backgroundColor: "black",
        padding: 20,
    }
});

