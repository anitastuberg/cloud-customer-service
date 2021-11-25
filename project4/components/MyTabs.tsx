import React, { useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { BottomNavigation } from 'react-native-paper';
import CustomerList from './CustomerList';
import { AddCustomer } from './AddCustomer';
import { AddCustomerHeader, HomeHeader } from './Header';
import { Search } from './Search';

//Bottom navigation bar to route between Customer page and Add Customer page

const CustomerRoute = () => {
    return (
        <>
            <HomeHeader />
            <Search />
            <CustomerList />      
        </>
    );
}

const AddCustomerRoute = () => {
    return (
        <>
            <AddCustomerHeader />
            
            <AddCustomer 
                onConfirm={function (): void {
                    throw new Error('Function not implemented.');
            }} 
            onCancel={function (): void {
                throw new Error('Function not implemented.');
            }} 
            message={''} />    
        </>
    );
}


export const MyTabs = () => {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key:"customers", title:'Home', icon:'home'},
        {key:"add",title:"Add customer",icon:'plus'}
    ]);

    const renderScene = BottomNavigation.SceneMap({
        customers: CustomerRoute,
        add: AddCustomerRoute
    });

    return(
        <BottomNavigation
            style={styles.container}
            navigationState={{index,routes}}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    )
}

const styles = StyleSheet.create({
    container:{
        width: Dimensions.get('window').width,
        textAlign:'center',
    }
});

export default MyTabs;
