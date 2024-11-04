import { View, Text , Image, TextInput, Alert} from 'react-native'
import React, {useState } from 'react'
import { useToast } from "react-native-toast-notifications";
import { router } from "expo-router";
import SignInText from "@/components/login/signin.text";
import PhoneNumberInput from "@/components/login/phone-number.input";
import Button from "@/components/common/button";
import AuthContainer from "@/utils/container/auth-container";
import { commonStyles } from "@/styles/common.style";
import { windowHeight, windowWidth } from "@/themes/app.constant";
import { external } from "@/styles/external.style";
import styles2 from "@/screens/userlogin/styles";
import color from "@/themes/app.colors";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UserLoginScreen() {
    const [phone_number, setphone_number] = useState("");
    const [pass_word, setpass_word] = useState("");
    const [loading, setloading] = useState(false);
    const [countryCode, setCountryCode] = useState("+63");
    const toast = useToast();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('Pass1234');
    const [processid, setProcessId] = useState();
    const [elementVisible, setElementVisible] = useState(false);
    const [elementVisibleOTP, setElementvisibleOTP] = useState(false);
    const [elementPhone, setElementPhone] = useState(true);
    const [enterOtp, updatetOtp] = useState('');
    const [token, setToken] = useState("");
   
    const handleSubmit = async () => {
      try {
       
        const apiUrl = 'https://testapi.xpress.ph/v1/'; 
    
        const data = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&roleId=3`;
   
       
        fetch('https://testapi.xpress.ph/v1/Login', {
          method: 'POST',
          body: data,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        })
        
        .then(response => response.json())
        .then(data => {
          console.log("test1", data.ProcessId)
          if (data.ProcessId){
            const processId = data.ProcessId;
            setProcessId(processId)
            setElementvisibleOTP(true)
            setElementPhone(false)
            
          }else{
            Alert.alert('Error', data.message || 'Login failed'); 
          }
          
            if (processid) {
              try {
                const dto = {
                  ProcessId: processid,
                  Password: '112233' // Password 112233 is set for web admin
                  };
            
                fetch('https://testapi.xpress.ph/v1/api/Otp/CheckOTP', {
                  method: 'POST',
                  body: JSON.stringify(dto),
                  headers: {
                      'Content-Type': 'application/json'
                  }
                })
                
              .then(response => response.json())
               .then(checkOtpResponse => {
                console.log("test2",  checkOtpResponse)
    
                if (checkOtpResponse.error){
                    Alert.alert('Error', 'Network request failed. Please check your connection and server.');
                    return;
                }
    
                //token
                try {
                  fetch('https://testapi.xpress.ph/v1/token', {
                    method: 'POST',
                    body: 'processId=' + processid + '&roleId=2',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                  })
                  
                .then(response => response.json())
                .then(data => {
                  if (data.error) {
                    Alert.alert('Error', 'Network request failed. Please check your connection and server.');
                    return;
                }

                setToken(data.access_token)
                const authData = {
                  access_token: data.access_token,
                  '.expires': data['.expires']
                };
                
                const authDataJson = JSON.stringify(authData);
            
                // Store the token in AsyncStorage
                AsyncStorage.setItem('authData', authDataJson);
            
                console.log("Token:", data.access_token);  // Log token to verify
                console.log("data record:", data); 
                
                if (token!==null) {
                  Alert.alert('success token', authDataJson);
              
                }
                 
                 router.push("/(tabs)/home");
               
                });
                
                }catch (error) {
                    console.error('Network Request Failed:', error);
                    Alert.alert('Error', 'Network request failed. Please check your connection and server.');
                }
    
                 
              });
              }catch (error) {
                  console.error('Network Request Failed:', error);
                  Alert.alert('Error', 'Network request failed. Please check your connection and server.');
              } 

            }
           
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
                  <SignInText />
                  <View style={[external.mt_2, external.Pb_10]}>
                    { elementPhone ? (
                    <View>
                      <Text
                        style={[commonStyles.mediumTextBlack, { marginTop: windowHeight(8) }]}
                      >
                        Mobile
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
                            placeholder="Enter Mobile"
                            style={[commonStyles.regularText]}
                            placeholderTextColor={color.subtitle}
                            value={username}
                            onChangeText={setUsername}
                            maxLength={30}
                          />
                        </View>
                      </View>
                    </View>
                    ):""}

                    {
                      elementVisible ? (
                    <View>
                     <Text
                        style={[commonStyles.mediumTextBlack, { marginTop: windowHeight(8) }]}
                      >
                        Enter Otp
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
                     ) : ""
                    }
                    {
                      elementVisibleOTP ? (
                    <View>
                    
                     <Text
                        style={[commonStyles.mediumTextBlack, { marginTop: windowHeight(8) }]}
                      >
                        Enter Otp
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
                            placeholder="Enter OTP"
                            style={[commonStyles.regularText]}
                            placeholderTextColor={color.subtitle}
                            value={enterOtp}
                            onChangeText={updatetOtp}
                            maxLength={30}
                          />
                        </View>
                      </View>
                       
                    </View>
                     ) : ""
                    }
                    
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