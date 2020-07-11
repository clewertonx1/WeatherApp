import React, { useContext } from "react";
import { StyleSheet, Text, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Fontisto } from '@expo/vector-icons'

const MainCard = (props) => {

    const Icon = () => {
        if(props.icon === 'morning'){
            return(
                <Feather style={styles.cardIcon} name="sun" size={40} color="white" />
            )   
        }
        if(props.icon === 'afternoon'){
            return(
                <Fontisto style={styles.cardIcon} name="day-cloudy" size={40} color="white" />
            )   
        }
        if(props.icon === 'night'){
            return(
                <Feather style={styles.cardIcon} name="cloud-rain" size={40} color="white" />
            )   
        }         
    }

    return(
        <View style={[styles.card, {backgroundColor: props.backgroundColor}]}>
            <Text style={styles.cardHourText}>{props.title}</Text>
                <Icon></Icon>
            <Text style={styles.cardTemparatureText}>{props.temperature}</Text>
         </View>
    )
}

const styles = StyleSheet.create({   
    card:{    
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      margin: 10,
      width: 110,
      height: 210,
      
    },
    cardHourText:{
      color: 'white',
      margin: 15,
      fontSize: 20,
    },
    cardTemparatureText:{
      color: 'white',
      margin: 15,
      fontSize: 20,
    },
    cardIcon: {
      color: 'white',
      margin: 15
    },  
  });

export default MainCard;