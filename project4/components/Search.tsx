import React, { useState, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input } from 'native-base';
import { FilterContext } from './FilterContext';

// Searchfield to search for customers in the database
export const Search = () => {
    const { dispatch } = useContext(FilterContext);
    const [searchName, setSearchName] = useState("");
    
    const handleChange = (name: string) => {
        setSearchName(name as string);
        dispatch({ type:'Name', payload: name });
    }
    
    return (
        <View>
            <Input  
                style={styles.container}
                placeholder="Search customer"
                width="100%"
                onChangeText={handleChange}
            />
        </View> 
    );
}

// Styling the input field
const styles = StyleSheet.create({
    container:{
        width: "90%",
        borderRadius: 10,
        alignSelf: 'center',
        textAlign:'left',
        backgroundColor: "white",
        paddingLeft: 10,
        height: 40,
        marginVertical: 10,
    }
});

export default Search;