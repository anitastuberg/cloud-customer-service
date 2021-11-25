import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, ActivityIndicator } from 'react-native';
import { ListItem, Icon, Card, Button } from 'react-native-elements';
import { useQuery } from '@apollo/client';
import { filterUsers } from '../gql/queries';
import { AppState } from '../store/store';
import { useSelector } from 'react-redux';
import FilterContext from './FilterContext';


const CustomerList = () => {

    const { state } = useContext(FilterContext);
    const ordering = useSelector((state: AppState) => state.ordering);
    const [nextUsers, setNextUsers] = useState(0);


    const [expanded, setExpanded] = useState(false);
    const [expanded1, setExpanded1] = useState([
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
    ]);

    //Function to load more customers
    const viewMoreCustomers = () => {
        setNextUsers(nextUsers + 10);
    }

    //Function to load fewer customers
    const viewFewerCustomers = () => {
        if (nextUsers > 9)
            setNextUsers(nextUsers - 10);
    }

    useEffect(() => {
        setNextUsers(0);
    }, [state, ordering]);


    const handlePress = (i: number) => {
        let person = expanded1;
        person[i] = !person[i]
        setExpanded1(person);
        setExpanded(!expanded);
    };


    let subscriptionType = [];

    if (state.Basic === "Basic") {
        subscriptionType.push("Basic")
    }
    if (state.Premium === "Premium") {
        subscriptionType.push("Premium")
    }
    if (state.Standard === "Standard") {
        subscriptionType.push("Standard")
    }
    const subs = subscriptionType.join(",");

    const { data, loading, error } = useQuery(filterUsers, {
        variables: {
            subscription: subs,
            name: state.Name,
            limit: 10,
            skip: nextUsers,
            orderBy: ordering,
        },
        pollInterval: 5000,
    });


    if (!data && loading) {
        return (
            <View style={styles.indicator}>
                <ActivityIndicator size="large" color="#0100ff" />
            </View>
        );
    };

    if (error) return <Text>{error.message}</Text>

    return (
        <Card containerStyle={styles.cardView}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                {data?.filterUsers.map((user: any, i: number) => (
                    <View style={[expanded1[i] ? styles.container : styles.container2]} key={i}>
                        <ListItem.Accordion
                            content={
                                <>
                                    <Icon name="person" size={40} />

                                    <ListItem.Content>
                                        <ListItem.Title>{user.first_name} {user.last_name}</ListItem.Title>

                                        <ListItem.Subtitle style={styles.listItem_subtitle}>Subscription: {user.subscription}</ListItem.Subtitle>
                                    </ListItem.Content>
                                </>
                            }
                            isExpanded={expanded1[i]}
                            onPress={() => handlePress(i)}
                        >
                            <ListItem bottomDivider>
                                <ListItem.Content>
                                    <ListItem.Subtitle style={styles.listHeader}>
                                        Email:
                                    </ListItem.Subtitle>
                                    <Text style={styles.listContent}>
                                        {user.email}
                                    </Text>
                                    <ListItem.Subtitle style={styles.listHeader}>
                                        Phone number:
                                    </ListItem.Subtitle>
                                    <Text style={styles.listContent}>
                                        {user.phone_number}
                                    </Text>
                                    <ListItem.Subtitle style={styles.listHeader}>
                                        Country:
                                    </ListItem.Subtitle>
                                    <Text style={styles.listContent}>
                                        {user.country}
                                    </Text>
                                    <ListItem.Subtitle style={styles.listHeader}>
                                        Address:
                                    </ListItem.Subtitle>
                                    <Text style={styles.listContent}>
                                        {user.address}
                                    </Text>
                                    <ListItem.Subtitle style={styles.listHeader}>
                                        City:
                                    </ListItem.Subtitle>
                                    <Text style={styles.listContent}>
                                        {user.city}
                                    </Text>
                                    <ListItem.Subtitle style={styles.listHeader}>
                                        Date:
                                    </ListItem.Subtitle>
                                    <Text style={styles.listContent}>
                                        {user.birth_date}
                                    </Text>
                                    <ListItem.Subtitle style={styles.listHeader}>
                                        Card Type:
                                    </ListItem.Subtitle>
                                    <Text style={styles.listContent}>
                                        {user.card_type}
                                    </Text>
                                    <ListItem.Subtitle style={styles.listHeader}>
                                        Card Number:
                                    </ListItem.Subtitle>
                                    <Text style={styles.listContent}>
                                        {user.card_number}
                                    </Text>
                                </ListItem.Content>
                            </ListItem>
                        </ListItem.Accordion>
                    </View>
                ))}
                <View style={styles.buttons}>
                    <View style={styles.button}>
                        <Button title="Prev 10" onPress={() => viewFewerCustomers()} />
                    </View>
                    <View style={styles.button}>
                        <Button title="Next 10" onPress={() => viewMoreCustomers()} />
                    </View>
                </View>

            </ScrollView>
        </Card>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: 500,
        paddingTop: StatusBar.currentHeight,
        textAlign: 'center',
        marginTop: 5,
    },
    container2: {
        flex: 1,
        width: "100%",
        height: 100,
        paddingTop: StatusBar.currentHeight,
        textAlign: 'center',
        marginTop: 5,

    },
    listHeader: {
        fontWeight: '200',
    },
    listContent: {
        marginLeft: 20,
        marginBottom: 10,
    },
    listItem_subtitle: {
        marginTop: 5,
        fontWeight: '300',
    },
    scrollView: {
        marginHorizontal: 10,
        width: "100%",
    },
    cardView: {
        width: '90%',
        alignSelf: 'center'

    },
    indicator: {
        flex: 1,
        justifyContent: "center"
    },
    test: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 50,
        width: "100%",
    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 50,
        marginBottom: 120,
    },
    button: {
        width: 100,
        margin: 10
    }
}
);

export default CustomerList;