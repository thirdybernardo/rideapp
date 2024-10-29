import { View, Text , Image, ImageBackground, TouchableOpacity} from 'react-native'
import color from '@/themes/app.colors'
import { commonStyles } from "@/styles/common.style";
import { windowHeight, windowWidth } from "@/themes/app.constant";
import React, { useEffect, useState } from 'react';
 
export default function DriverProfile () {
  const [data, setData] = useState(process.env.EXPO_SERVER_URI);

/*   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.EXPO_SERVER_URI}/api/endpoint`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); */
 

  return (
    <View style={{flex:1, backgroundColor:color.whiteColor}}>
        <Text
        style={[commonStyles.mediumTextBlack, { marginTop: windowHeight(8) }]}
      >
        Profile driver 
       {data}
      </Text>
    </View>
  )
}