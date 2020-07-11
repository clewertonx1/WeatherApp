import React from "react";
import { StyleSheet, Text, View } from 'react-native'


const InfoCard = (props) => {

    // text princial darkTheme ? '#e0e0e0'  : 'white',

    // text secundario color: darkTheme ?'#adadad' : '#E4E4E4', 

    return(
        <View style={styles.card}>
            <Text style={styles.text}>{props.title}</Text>
            <Text style={[styles.text, {color: '#adadad'}]}>{props.variable}</Text>
        </View>
    )
}
const styles = StyleSheet.create({   
    card:{
        alignItems: 'center',
        margin: 10,
        minWidth: 150,
      },
    text:{
        color: '#e0e0e0',
        margin: 5,
        marginLeft: 15,
        fontSize: 18,
      },
  });

export default InfoCard;