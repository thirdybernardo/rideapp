import { View, Text, SafeAreaView, FlatList, ScrollView, Alert , ActivityIndicator, Modal, Button, StyleSheet} from "react-native";
import styles from "./styles";
import { commonStyles } from "@/styles/common.style";
import { external } from "@/styles/external.style";
import LocationSearchBar from "@/components/location/location.search.bar";
import color from "@/themes/app.colors";
import { useEffect, useState } from "react";
import Ably from 'ably';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function HomeScreen() {
  const [recentRides, setrecentRides] = useState([]);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [expiry, setExpiry] = useState<string | null>(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const client = new Ably.Realtime('FEdy3w.A121tw:rM2GFsv_eQWCD7Ok5JPS7obKpnRzynQPyeno-WtnxyU');
  const channel = client.channels.get('TestNewXpressOrders');
    channel.subscribe((message) => {
      const jsonString = atob(message.data.Data);
      const data = JSON.parse(jsonString);
      console.log('Received message:', jsonString);
      Alert.alert('Received message:', jsonString);
    });

  useEffect(() => {
   const loadAuthData = async () => {
      const authDataJson = await AsyncStorage.getItem('authData');
      if (authDataJson) {
        const authData = JSON.parse(authDataJson);
        setAccessToken(authData.access_token);
        setExpiry(authData['.expires']);
        } else {
      }
    };
    loadAuthData();
  }, []);  
 
  return (
    <View style={[commonStyles.flexContainer, { backgroundColor: "#fff" }]}>
      <SafeAreaView style={styles.container}>
        <View style={[external.p_5, external.ph_20]}>
          <Text
            style={{
              fontFamily: "TT-Octosquares-Medium",
              fontSize: 25,
            }}
          >
          </Text>
          <LocationSearchBar accesstoken={accessToken} />
        </View>
        <View style={{ padding: 5 }}>
          <View
            style={[
              styles.rideContainer,
              { backgroundColor: color.whiteColor },
            ]}
          >
          </View>
       
        </View>
        <View>
        <Button title="Accept" onPress={toggleModal} />
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={toggleModal}
            >
            <View style={styles2.modalOverlay}>
              <View style={styles2.modalContent}>
                <Text style={styles2.modalText}>Accept Bookings</Text>
                <Button title="Cancel" onPress={toggleModal} />
              </View>
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles2 = StyleSheet.create({
  
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5, 
    shadowColor: '#000',  
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});