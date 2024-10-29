import { View, Text , Image, TextInput, Alert} from 'react-native'
import React, {useState } from 'react'
import { useToast } from "react-native-toast-notifications";
import styles from "./styles";
import Images from "@/utils/images";
import { router } from "expo-router";
import SignInText from "@/components/login/signin.text";
import PhoneNumberInput from "@/components/login/phone-number.input";
import Button from "@/components/common/button";
import AuthContainer from "@/utils/container/auth-container";
 
import axios from "axios";
import PasswordInput from '@/components/login/password-input';
import { commonStyles } from "@/styles/common.style";
import { windowHeight, windowWidth } from "@/themes/app.constant";
import { external } from "@/styles/external.style";
import styles2 from "@/screens/userlogin/styles";
import color from "@/themes/app.colors";

export default function UserLoginScreen() {
    const [phone_number, setphone_number] = useState("");
    const [pass_word, setpass_word] = useState("");
    const [loading, setloading] = useState(false);
    const [countryCode, setCountryCode] = useState("+63");
    const toast = useToast();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async () => {
      try {
        const apiUrl = 'https://testapi.xpress.ph/v1/'; // Ensure it's a valid URL
    
        const data = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&roleId=3`;
    /* 
        const response = await fetch(apiUrl, {
          method: 'POST',
          body: data,
          headers: {
             'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
        
        });


    
        const result = await response.json();
        if (result) {
          Alert.alert('Success', 'You are logged in!', result.ProcessId);
         
        } else {
          Alert.alert('Error', result.message || 'Login failed');
        }
        const processId = result
        console.log('processId222', processId)
      } catch (error) {
        console.error('Network Request Failed:', error);
        Alert.alert('Error', 'Network request failed. Please check your connection and server.');
      } */
       
        fetch('https://testapi.xpress.ph/v1/Login', {
          method: 'POST',
          body: data,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        })
        .then(response => response.json())
        .then(data => {
          if (data.error){
            Alert.alert('Error', data.message || 'Login failed');
           
          }else{
            Alert.alert('Success', 'You are logged in!', data.ProcessId);
          }
          const processId = data.ProcessId;
          console.log(processId)
        });
      }catch (error) {
          console.error('Network Request Failed:', error);
          Alert.alert('Error', 'Network request failed. Please check your connection and server.');
        }
    };
      

    return (
        <AuthContainer
          topSpace={windowHeight(150)}
          imageShow={true}
          container={
            <View>
              <View>
                <View>
               {/*    <Image style={styles.transformLine} source={Images.line} /> */}
                  <SignInText />
                  <View style={[external.mt_2, external.Pb_10]}>
                    
                  <View>
                      <Text
                        style={[commonStyles.mediumTextBlack, { marginTop: windowHeight(8) }]}
                      >
                        Username
                      </Text>
                      <View
                        style={[
                          external.fd_row,
                          external.ai_center,
                          external.mt_5,
                          { flexDirection: "row" },
                        ]}
                      >
                  
                        <View
                          style={[
                            styles2.phoneNumberInput,
                            {
                              width: windowWidth(400),
                              borderColor: color.border,
                            },
                          ]}
                        >
                          <TextInput
                            placeholder="Username"
                            style={[commonStyles.regularText]}
                            placeholderTextColor={color.subtitle}
                            value={username}
                            onChangeText={setUsername}
                            maxLength={30}
                          />
                        </View>
                      </View>
                    </View>

                    <View>
                      <Text
                        style={[commonStyles.mediumTextBlack, { marginTop: windowHeight(8) }]}
                      >
                        Password
                      </Text>
                      <View
                        style={[
                          external.fd_row,
                          external.ai_center,
                          external.mt_5,
                          { flexDirection: "row" },
                        ]}
                      >
                  
                        <View
                          style={[
                            styles2.phoneNumberInput,
                            {
                              width: windowWidth(400),
                              borderColor: color.border,
                            },
                          ]}
                        >
                          <TextInput
                            placeholder="Password"
                            style={[commonStyles.regularText]}
                            placeholderTextColor={color.subtitle}
                            value={password}
                            onChangeText={setPassword}
                            maxLength={30}
                          />
                        </View>
                      </View>
                    </View>
                    
                    <View style={[external.mt_25, external.Pb_15]}>
                    <Button title="Login" onPress={handleSubmit} />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          }
        />
      );
}