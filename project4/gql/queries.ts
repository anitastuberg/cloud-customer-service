import { gql } from '@apollo/client';

export const filterUsers = gql`
    query Subscription(
        $subscription: String!,
        $name: String!,
        $limit: Int!,
        $skip: Int!
        $orderBy: String!
    ){
        filterUsers(
            subscription:$subscription,
            name:$name,
            limit:$limit,
            skip: $skip,
            orderBy:$orderBy
        ){
            first_name
            last_name
            email
            phone_number
            country
            address
            city
            subscription
            birth_date
            card_type
            card_number
        }
    }
`;

export const createPerson = gql` 
    mutation addNewUser(
        $first_name: String!,
        $last_name: String!,
        $email: String!,
        $country: String!,
        $city: String!,
        $birth_date: String!,
        $phone_number: String!,
        $subscription: String!,
        $balance: String!,
        $card_type: String!,
        $card_number: String!,
        $address: String! 
        ){ 
        CreateUser(
        first_name: $first_name,
        last_name: $last_name,
        email: $email,
        country: $country,
        city: $city,
        birth_date: $birth_date,
        phone_number: $phone_number,
        subscription: $subscription,
        balance: $balance,
        card_number: $card_number,
        card_type: $card_type,
        address: $address
        ){
        first_name
        email
        phone_number
        country
        address
        city
        subscription
        birth_date
        balance, 
        card_type
        card_number
        }
    }
`;
