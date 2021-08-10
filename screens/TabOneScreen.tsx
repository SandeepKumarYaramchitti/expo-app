import React, {useState} from 'react';
import { StyleSheet } from 'react-native';
import { Image, View, Text, TouchableOpacity} from 'react-native'
import logo from '../assets/images/image-share.jpeg'

import * as ImagePicker from 'expo-image-picker'
import * as Sharing from 'expo-sharing'

export default function TabOneScreen() {

  const [selectedImage, setSelectedImage] = useState(null)

  let openImagePickerAsync = async() => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false){
      alert('Permission to access camera roll is required!')
      return
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    setSelectedImage(pickerResult)
  }

  let openShareDialogAsync = async() => {
    if (! (await Sharing.isAvailableAsync())) {
      alert('Uh oh, sharing is not available in your platform');
      return
    }
    await Sharing.shareAsync(selectedImage.uri)
  };

  if (selectedImage !== null){
    return (
      <View style={styles.container}>
        <Image 
          source={{uri: selectedImage.uri}}
          style={styles.logo}>  
        </Image>
        <TouchableOpacity
          onPress={openShareDialogAsync} style={styles.pickPhotoButton}><Text style={styles.buttonText}>Share this Photo</Text></TouchableOpacity>
      </View>
    )
  }

  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: selectedImage.uri }} style={styles.logo} />
        <Text style={styles.textStyle}>To share photos with your friends, click the button</Text>
  
        <TouchableOpacity
          onPress={openImagePickerAsync}
          style={styles.pickPhotoButton}
          >
          <Text style={styles.buttonText}>Pick a photo</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Image source={{ uri: logo }} style={styles.logo} />
      <Text style={styles.textStyle}>To share photos with your friends, click the button</Text>

      <TouchableOpacity
        onPress={openImagePickerAsync}
        style={styles.pickPhotoButton}
        >
        <Text style={styles.buttonText}>Pick a photo</Text>
      </TouchableOpacity>
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
    height: 300,
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
