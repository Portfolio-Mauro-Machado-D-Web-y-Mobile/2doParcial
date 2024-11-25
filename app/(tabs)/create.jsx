import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, Button, View, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createDestination } from '../../api/connections';
import { useDestinations } from '@/contexts/destinationContext';
import { router } from 'expo-router';
import CameraButton from '@/components/cameraButton';
import ImagePicker from '@/components/imageSelection';
import { Dropdown } from 'react-native-element-dropdown';

export default function CreateScreen() {
  const { updateDestinations } = useDestinations();

  const [form, setForm] = useState({
    name: '',
    description: '',
    difficulty: '',
    favourite: '',
    image: '',
  });

  const handleChange = (key, value) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const handleUploadimage =  (value) => {
    setForm({
      ...form,
      ['image']: value,
    });};

  const options = [
    { label: 'Easy', value: 'easy' },
    { label: 'Medium', value: 'medium' },
    { label: 'Hard', value: 'hard' },
  ];



  const handleSubmit = async () => {
    const destination = form;

    try {
      await createDestination(destination);
      updateDestinations();
      setForm({
        name: '',
        description: '',
        difficulty: '',
        favourite: '',
        image: '',
      });
      router.push('/');
    } catch (error) {
      Alert.alert('Error', 'Failed to create destination.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={(text) => handleChange('name', text)}
        value={form.name}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        onChangeText={(text) => handleChange('description', text)}
        value={form.description}
      />
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={options}
        labelField="label"
        valueField="value"
        placeholder="Difficulty"
        value={form.difficulty}
        onChange={(item) => setForm({ ...form, difficulty: item.value })}
      />
      <TextInput
            style={styles.input}
            placeholder="URL"
            onChangeText={(text) => handleChange('image', text)}
            value={form.image}
          />
      <View style={styles.imagePickerContainer}>
        {form.image ? (
            <Image source={{ uri: form.image }} style={styles.imagePreview} />
          ) : (
            <Text style={{ color: 'white' }}>No image selected</Text>
          )}
          
          <View style={styles.imagePickerButtons}>
            <CameraButton handleUpload={handleUploadimage}/>
            <ImagePicker handleUpload={handleUploadimage}/>
          </View>
      </View>
      <Button title="Submit" onPress={handleSubmit} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#0B1026',
  },
  input: {
    height: 40,
    marginVertical: 8,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  imagePickerContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginBottom: 8,
    borderRadius: 8,
  },
  imagePickerButtons: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
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
});
