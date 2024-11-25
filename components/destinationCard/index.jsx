import { updateDestination } from '@/api/connections';
import { useDestinations } from '@/contexts/destinationContext';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform } from 'react-native';



const DestinationCard = ({ destination }) => {
  const difficultyTagStyles = destination.difficulty === 'easy' ? styles.easyTag : destination.difficulty === 'medium' ? styles.mediumTag : styles.hardTag;

  const isAndroid = Platform.OS === 'android';

  const { updateDestinations } = useDestinations();

  function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

  const handleFavourite = async () => {
    console.log("fav");
    await updateDestination(destination.id, { ...destination, favourite: !destination.favourite });
    updateDestinations();
  }

  const favouritePlatformBasedStyle = () => {
    if (!destination.favourite) {
      return {backgroundColor: 'transparent'}
    } else if (isAndroid) {
      return {backgroundColor: '#fdffb6'}
    } else {
      return {backgroundColor: '#ffc6ff'}
    }};

  console.log(destination);
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: destination.image }}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.name}>{destination.name}</Text>
        <View style={difficultyTagStyles}>
        <Text style={styles.name}>{capitalizeFirstLetter(destination.difficulty)}</Text>
      </View>
      </View>
      <TouchableOpacity style={[styles.button, favouritePlatformBasedStyle()]} onPress={handleFavourite}>
        <Ionicons
              name={"star"}
              color={"#A0C4FF"}
              size={25}
            />
      </TouchableOpacity>
      
      
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    width: 300,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 16,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 8,
    color: 'black',
  },
  easyTag: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#caffbf',
    width: '150',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  mediumTag: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fdffb6',
    width: '150',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  hardTag: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#bdb2ff',
    width: '150',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  link: {
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
  button: {
    borderRadius: 50,
    borderColor: 'black',
    borderWidth: 1,
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    position: 'absolute',
    top: 10,
    right: 10,
  },
  
});

export default DestinationCard;
