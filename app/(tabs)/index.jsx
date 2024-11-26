import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, Text, TouchableOpacity, View, Button, Alert, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DestinationCard from '../../components/destinationCard';
import { router } from 'expo-router';
import { useDestinations } from '../../contexts/destinationContext';
import { deleteDestination } from '@/api/connections';
import { Swipeable } from 'react-native-gesture-handler';
import { Dropdown } from 'react-native-element-dropdown';

const { width } = Dimensions.get('window');
    const cardWidth = width * 0.85;

export default function HomeScreen() {
    const { destinations, updateDestinations } = useDestinations();
    const [loading, setLoading] = useState(true);
    const [sortedDestinations, setSortedDestinations] = useState([]);
    const [selectedOption, setSelectedOption] = useState(0);

    

    const options = [
        { label: 'Default Order', value: 0 },
        { label: 'Alphabetically', value: 1 },
    ];

    useEffect(() => {
        const loadDestinations = async () => {
            await updateDestinations();
            setLoading(false);
        };
        loadDestinations();
    }, []);

    useEffect(() => {
        let sorted = [...destinations]; 
        if (selectedOption === 0) {
            const sorter = (a, b) => {
                if(a.favourite === true){
                   return -1;
                };
                if(b.favourite === true){
                   return 1;
                };
                return a.name < b.name ? -1 : 1;
             };
            sorted.sort(sorter);

        }
        else if (selectedOption === 1) {
            sorted.sort((a, b) => a.name.localeCompare(b.name));
        }
        setSortedDestinations(sorted);
    }, [selectedOption, destinations]);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    const renderRightActions = (id) => (
        <View style={styles.deleteButton}>
            <Button
                onPress={async () => {
                    try {
                        await deleteDestination(id);
                        updateDestinations();
                    } catch (error) {
                        Alert.alert('Error', 'Failed to delete the destination.');
                    }
                }}
                title="Delete"
                color="#ff3b30"
            />
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={options}
                labelField="label"
                valueField="value"
                placeholder="Sort by"
                value={selectedOption}
                onChange={(item) => setSelectedOption(item.value)}
            />
            <View style={styles.view}>
                <FlatList
                    data={sortedDestinations}
                    renderItem={({ item }) => (
                        <Swipeable renderRightActions={() => renderRightActions(item.id)}>
                            <TouchableOpacity onPress={() => router.push(`/destination/${item.id}`)}>
                                <DestinationCard destination={item} />
                            </TouchableOpacity>
                        </Swipeable>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0B1026',
    },
    view: {
        flex: 1,
        padding: 20,
        maxWidth: {cardWidth},
    },
    deleteButton: {
        justifyContent: 'center',
        backgroundColor: '#ffb3b3',
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
        marginHorizontal: 5,
    },
    dropdown: {
        margin: 16,
        height: 50,
        width: '90%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: 'white',
    },
    placeholderStyle: {
        fontSize: 16,
        color: 'gray',
    },
    selectedTextStyle: {
        fontSize: 16,
        color: 'black',
    },
});
