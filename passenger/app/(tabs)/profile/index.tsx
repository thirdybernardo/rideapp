import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Image, ScrollView  } from 'react-native';
import Images from "../../../utils/images"
import { useToast } from "react-native-toast-notifications";
import { router } from "expo-router";
import AuthContainer from "@/utils/container/auth-container";
import { windowHeight } from "@/themes/app.constant";
import { external } from "@/styles/external.style";
import axios from "axios"; 


const Profile = () => {
  // State to manage visibility
  const [isProfileVisible, setIsProfileVisible] = useState(false);

  // State for animating the profile section
  const slideAnim = useState(new Animated.Value(-200))[0]; // Initial value for hidden position

  // Toggle visibility
  const toggleProfile = () => {
    if (isProfileVisible) {
      // Hide Profile: Animate the slide out
      Animated.timing(slideAnim, {
        toValue: -200, // Move it out of the screen
        duration: 300,
        useNativeDriver: true,
      }).start(() => setIsProfileVisible(false));
    } else {
      // Show Profile: Animate the slide in
      setIsProfileVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0, // Move it into the screen
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <View style={styles.container}>
      {/* Tab Icon */}
     {/*  <TouchableOpacity onPress={toggleProfile} style={styles.tabIcon}> */}
     <View  style={styles.tabIcon}>
        <Text style={styles.tabIconText}>Profile</Text>
         <View style={styles.profileHeader}>
            <Image
              source={Images.user}
              style={styles.profileImage}
            />
           <Image
              source={Images.vios}
              style={styles.carImage}
            />
            <Text style={styles.profileName}>Jane Dela Cruz</Text>
            <Text style={styles.profileName}>Age : 46</Text>
            <Text style={styles.profileName}>(20)Ratings ⭐⭐⭐⭐⭐</Text>
          </View>
          <View style={styles.headerBorder} />
          
           <View style={styles.twoColumnRow}>
              <Text style={styles.leftColumnText}>Toyota Vios</Text>
              <Text style={styles.rightColumnText}>: #123456</Text>
            </View>
            <View style={[styles.barGraph, styles.greenDeep]}>
                <View style={{ flex: 6 }}>
                   <Text style={styles.textLeft}>Driver ID</Text>
                   <Text style={styles.textLeft}>Status</Text>
                </View>
                <View style={{ flex: 6}}>
                    <Text style={styles.textRight}>#123456</Text>
                    <Text style={styles.textRight}>Active</Text>
                </View>
            </View>
              {/* Card Container for Transaction History */}
           {/* Card Container for Transaction History with ScrollView */}
           <View style={styles.cardContainer}>
            <Text style={styles.cardTitle}>Transaction History</Text>
            <Text style={styles.cardTrips}>Trips Completed</Text>
            <ScrollView style={styles.scrollableContent}>
              {/* Example Transactions */}
              <View style={styles.transactionRow}>
                <Text style={styles.transactionTextLeft}>Makati #1234</Text>
                <Text style={styles.transactionText}>P25.00</Text>
              </View>
              <View style={styles.transactionRow}>
                <Text style={styles.transactionTextLeft}>Manila #5678</Text>
                <Text style={styles.transactionText}>P142.00</Text>
              </View>
              <View style={styles.transactionRow}>
                <Text style={styles.transactionTextLeft}>Cavite City #9101</Text>
                <Text style={styles.transactionText}>P218.00</Text>
              </View>
              {/* Add more dynamic transactions here */}
              <View style={styles.transactionRow}>
                <Text style={styles.transactionTextLeft}>Quezon City #1111</Text>
                <Text style={styles.transactionText}>P135.00</Text>
              </View>
              <View style={styles.transactionRow}>
                <Text style={styles.transactionTextLeft}>Order #2222</Text>
                <Text style={styles.transactionText}>P250.00</Text>
              </View>
              <View style={styles.transactionRow}>
                <Text style={styles.transactionTextLeft}>Order #2222</Text>
                <Text style={styles.transactionText}>P500.00</Text>
              </View>
              <View style={styles.transactionRow}>
                <Text style={styles.transactionTextLeft}>Order #2222</Text>
                <Text style={styles.transactionText}>P350.00</Text>
              </View>
              <View style={styles.transactionRow}>
                <Text style={styles.transactionTextLeft}>Order #2222</Text>
                <Text style={styles.transactionText}>P450.00</Text>
              </View>
              <View style={styles.transactionRow}>
                <Text style={styles.transactionTextLeft}>Order #2222</Text>
                <Text style={styles.transactionText}>P300.00</Text>
              </View>
              <View style={styles.transactionRow}>
                <Text style={styles.transactionTextLeft}>Order #2222</Text>
                <Text style={styles.transactionText}>P150.00</Text>
              </View>
              {/* Example continues */}
            </ScrollView>
          </View>
         <View>
        </View>
      </View>
     
   
      {/* Profile Section */}
      {isProfileVisible && (
        <Animated.View style={[styles.profileSection, { transform: [{ translateX: slideAnim }] }]}>
          {/* Profile Image and Name */}
          <View style={styles.profileHeader}>
            <Image
              source={Images.user} // Replace with actual image URL
              style={styles.profileImage}
            />
            
            <Text style={styles.profileName}>Jane Dela Cruz</Text>
          </View>

          {/* Example Profile Content */}
          <Text style={styles.profileText}>Profile Information</Text>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  tabIcon: {
    padding: 20,
    backgroundColor: '#066e9a',
    alignItems: 'center',
  },
  headerBorder: {
    height: 1,
    backgroundColor: '#fff',
    width: '100%',
    marginBottom: 10,  
  },
  tabIconText: {
    color: '#fff',
    fontSize: 18,
  },
  profileSection: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 200,
    height: '100%',
    backgroundColor: '#6200ee',
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginTop:50,
    marginBottom: 20,  
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,  
    borderWidth: 2,
    borderColor: '#fff',
  },
  profileName: {
    marginTop: 10,
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileText: {
    color: '#fff',
    fontSize: 16,
  },
  twoColumnRow: {
    flexDirection: 'row',
    alignContent: 'space-between',
    marginTop: 20,
    marginBottom: 10,
    
  },
  transactionTextLeft:{
    fontWeight: 'bold',
    color: '#000',
    fontSize: 16,
    marginBottom:10
  },
  leftColumnText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 16,
  },
  rightColumnText: {
    color: '#fff',
    fontSize: 16,
  },
  textLeft: {
    fontSize: 12,
    color: 'white',
    textAlign: 'left'
  },
  textRight: {
      fontSize: 12,
      color: 'white',
      textAlign: 'right'
  },
  barGraph: {
    flexDirection: 'row',
    marginBottom: 20,
    width: "100%",
    padding: 10,
    borderRadius: 5
},
  greenDeep: {
      backgroundColor: '#07bbeb'
  },
  carImage: {
    width: 80,
    height: 80,
    borderRadius: 40, // Rounded corners for car image
    borderWidth: 2,
    borderColor: '#fff',
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginTop: 1,
    height: 240,
    width:"100%"
  },
  scrollableContent: {
    flex: 1, 
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardTrips:{
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'gray',
  },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  transactionText: {
    fontSize: 16,
  },
});

export default Profile;
