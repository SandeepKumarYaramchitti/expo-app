import React, {useState} from 'react';
import { StyleSheet } from 'react-native';
import { Image, View, Text, TouchableOpacity} from 'react-native'
import logo from '../assets/images/image-share.jpeg'

import * as ImagePicker from 'expo-image-picker'

export default function TabOneScreen() {

  const [selectedImage, setSelectedImage] = useState('')

  let openImagePickerAsync = async() => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false){
      alert('Permission to access camera roll is required!')
      return
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    setSelectedImage(pickerResult)

  }

  console.log('Image Url', selectedImage)

  return (
    <View style={styles.container}>
      <Image source={{ uri: selectedImage.uri }} style={styles.logo} />
      <Text style={styles.textStyle}>To share photos with your friends, click the button</Text>

      <TouchableOpacity
        onPress={openImagePickerAsync}
        style={styles.pickPhotoButton}
        ><Text style={styles.buttonText}>Pick a photo</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textStyle: {
    color: '#888',
    fontSize: 16,
    marginHorizontal: 15
  },
  logo: {
    width: 305,
    height: 150,
    marginBottom: 10
  },
  pickPhotoButton: {
    backgroundColor: 'green',
    marginTop: 20,
    padding: 20,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  }
})
