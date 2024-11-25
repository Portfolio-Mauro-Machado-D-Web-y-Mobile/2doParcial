import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { fetchDestination, deleteDestination } from '@/api/connections'; 
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const Destination = () => {
  const route = useRoute();
  const { id } = route.params; 
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    if (id) {
      fetchDestination(id).then((data) => {
        setDestination(data);
      });
    }
  }, [id]);

  const handleDelete = () => {
    Alert.alert(
      'Delete Destination',
      `Are you sure you want to delete ${destination.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteDestination(id); 
              router.push('/'); 
            } catch (error) {
              Alert.alert('Error', 'Failed to delete the destination.');
            }
          },
        },
      ]
    );
  };

  if (!destination) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

  const difficultyTagStyles = destination.difficulty === 'easy' ? styles.easyTag : destination.difficulty === 'medium' ? styles.mediumTag : styles.hardTag;


  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{ uri: destination.image }}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.name}>{destination.name}</Text>
        <Text style={styles.text}>{destination.description}</Text>
        <View style={difficultyTagStyles}>
          <Text style={styles.difficulty}>{capitalizeFirstLetter(destination.difficulty)}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => router.push(`/destination/edit/${id}`)}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    backgroundColor: '#0B1026',
    padding: 20,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  content: {
    flex: 1,
  },
  difficulty: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 8,
    marginBottom: 8,
    
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  bold: {
    fontWeight: 'bold',
    color: '#fff',
  },
  text: {
    color: '#fff',
    marginBottom: 10,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 100,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    width: 65,
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: '#FF4136',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  easyTag: {
    flexDirection: 'column',
    backgroundColor: '#caffbf',
    width: '150',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  mediumTag: {
    flexDirection: 'column',
    backgroundColor: '#fdffb6',
    width: '150',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  hardTag: {
    flexDirection: 'column',
    backgroundColor: '#bdb2ff',
    width: '150',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
});

export default Destination;
