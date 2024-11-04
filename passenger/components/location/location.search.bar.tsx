import { View, Text, Pressable ,Animated, StyleSheet} from "react-native";
import { styles } from "./styles";
import color from "@/themes/app.colors";
import { Clock } from "@/utils/icons";
import { windowHeight, windowWidth } from "@/themes/app.constant";
import DownArrow from "@/assets/icons/downArrow";
import { router } from "expo-router";
import React, { useRef, useState  } from 'react';

export default function LocationSearchBar(props: { accesstoken: any; }) {
  const { accesstoken} = props;
  const [isOn, setIsOn] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const handleToggle = async  () => {
    Animated.timing(slideAnim, {
      toValue: isOn ? 0 : 40,  
      duration: 200,  
      useNativeDriver: true,
    }).start();
    setIsOn(!isOn);  

    if(isOn==!true){
      try {
        const response = await fetch('https://testapi.xpress.ph/v1/api/XpressRider/UpdateAvailability', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accesstoken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            RiderId: 500,
            IsOnline: true,
          }),
        });
    
        if (response.ok) {
          const data = await response.json();
          console.log('Response Data:', data);
          
        } else {
          console.error('Failed to fetch:', response.status);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
  };

  return (
    <Pressable
      style={[
        styles.container,
        { flexDirection: "row" },
        { justifyContent: "space-around" },
        { paddingHorizontal: windowWidth(18) },
        { paddingRight: windowWidth(40) },
      ]}
      onPress={() => router.push("/(routes)/booking")} 
    >
        <View style={{ flexDirection: "row", paddingLeft: windowWidth(30) }}>
          <Text
            style={[
              styles.textInputStyle,
              { fontSize: 20, fontWeight: "500", color: "#000" },
            ]}
          >
            <View style={styles2.toggleBackground}>
 
          <Pressable onPress={handleToggle}>
            <Animated.View
              style={[
                styles2.toggleCircle,
                {
                  backgroundColor: isOn ? '#004060' : 'gray',  
                  transform: [{ translateX: slideAnim }],  
                },
              ]}
            >
              <Text style={styles2.toggleText}>{isOn ? 'ON' : 'OFF'}</Text>
            </Animated.View>
          </Pressable>
        </View>
          <Text></Text>
        </Text>
      </View>
      <View>
        <View
          style={{
            width: windowWidth(130),
            height: windowHeight(28),
            borderRadius: 20,
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Clock />
            <Text
              style={{
                fontSize: windowHeight(12),
                fontWeight: "600",
                paddingHorizontal: 8,
              }}
            >
              
            </Text>
            <DownArrow />
          </View>
        </View>
      </View>
    </Pressable>
  );
}
const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleBackground: {
    width: 80,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    padding: 2,
  },
  toggleCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});