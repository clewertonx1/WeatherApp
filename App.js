import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Fontisto } from '@expo/vector-icons'
import {useState} from 'react'
import * as Location from 'expo-location'
import { EvilIcons } from '@expo/vector-icons' 
import ThemeContext from './context/ThemeContext';
import AppTheme from "./components/Themes";
import MainCard from "./components/MainCard"


export default function App() {

  const axios = require('axios')
  const themeHook = useState("dark");
  const theme = useContext(ThemeContext)[0];
  const [darkTheme, setDarkTheme] = useState(true)
  
  const [location, setLocation] = useState(null);
  const [cityName, setCityName] = useState('Fortaleza')
  const [countryName, setCountryName] = useState('Brasil')


  const [currentTemperature, setCurrentTemperature] = useState('')
  const [temperatureMin, setTemperatureMin] = useState('')
  const [temperatureMax, setTemperatureMax] = useState('')
  const [wind, setWind] = useState('')
  const [humidity, setHumidity] = useState('')

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkTheme ? '#232634'  :'#F2F2F2',
      alignItems: 'center',
    },
    refreshButton: {
      position: 'absolute',
      alignSelf: 'flex-start', 
      margin: 30,
    },  
    themeButton: {
      
      margin: 10,
      marginLeft: 300,
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    themeButtonSquare: {
      backgroundColor: darkTheme ? '#F2F2F2'  :'#8F8F8F', 
      justifyContent: 'center',
      borderRadius: 20,
      marginRight: 20,
      width: 50,
      height: 25,
    },  
    themeButtonCircle:{
      alignSelf: darkTheme ? 'flex-end' : 'flex-start',
      margin: 5,
      width: 20,
      height: 20,
      borderRadius: 50,
      backgroundColor: darkTheme ? '#232634'  :'#F2F2F2', 
    },  
    icon: {
      marginTop: 50,
    },  
    temperatureView: {
      
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: 10,
    },
    temperatureText: {
      color: darkTheme ? '#e0e0e0'  : 'black',
      fontSize: 50,
    },
    temperatureDegree:{
      color: darkTheme ? '#e0e0e0'  : 'black',
    },
    cardsHoursDay:{
      color: darkTheme ? 'black'  : 'white',
      margin: 10,
      alignItems: 'center',
      flexDirection: 'row',
      
    },
    localizationText:{
      color: darkTheme ? '#e0e0e0'  : 'black',
    },  
    card:{
      
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      margin: 10,
      width: 110,
      height: 210,
      
    },
    cardHourText:{
      color: darkTheme ? 'white'  : 'white',
      margin: 15,
      fontSize: 20,
    },
    cardTemparatureText:{
      color: darkTheme ? 'white'  : 'white',
      margin: 15,
      fontSize: 20,
    },
    cardIcon: {
      color: darkTheme ? '#e0e0e0'  : 'white',
      margin: 15
    },
    info: {
      alignItems: 'center',
      borderRadius: 20,
      width: 350,
      height: 230,
      backgroundColor: darkTheme ? '#393e54'  :'#8F8F8F',
      
    },
    infoText: {
      color: darkTheme ? '#e0e0e0'  : 'white',
      margin: 15,
      fontSize: 20,
      fontWeight: 'bold',
    },
    addtionalInfo:{
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    climaticalInfoText:{
      color: darkTheme ? '#e0e0e0'  : 'white',
      margin: 5,
      marginLeft: 15,
      fontSize: 18,
    },
    cardAdditionalInfo:{
      alignItems: 'center',
      margin: 10,
      minWidth: 150,
      
    },
    climaticalInfoSubText: {
      color: darkTheme ?'#adadad' : '#E4E4E4',
    },  
    
  });

  async function getLocation(){
    let { status } = await Location.requestPermissionsAsync()
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied')
      }

      let location = await Location.getCurrentPositionAsync({})
      setLocation(location)
  }
  

  function convertKelvinToC(kelvin){
    return parseInt(kelvin - 273)
  }

  async function requesWeatherApi(){
    
    await getLocation()
    const lat = location.coords.latitude
    
    const log = location.coords.longitude

    
    axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&appid=40a5f7559101e8312445dfae9a9b0db1`).then(async function (response){
      const teste = response.data     

      setCountryName(teste.sys.country)
      setCityName(teste.name)
      setTemperatureMin(convertKelvinToC(teste.main.temp_min))
      setTemperatureMax(convertKelvinToC(teste.main.temp_max))
      setWind(teste.wind.speed)
      setHumidity(teste.main.humidity)
      setCurrentTemperature(convertKelvinToC(teste.main.temp))
      
    })
    .catch(function (error) {
      console.log(error)
    })
  }

  return (
    <ThemeContext.Provider value = {themeHook}>
      <View style={styles.container}>
      
        <TouchableOpacity style={styles.refreshButton} onPress={() => requesWeatherApi()}>
          <EvilIcons name="refresh" color={darkTheme ? 'white'  : 'black'} size={24}/>
        </TouchableOpacity>

        <Feather style={styles.icon} name="sun" size={40} color="orange" />

        <View style={styles.temperatureView}>
          <Text style={styles.temperatureText}>{currentTemperature}</Text>
          <Text style={styles.temperatureDegree}>°C</Text> 
        </View>
        
        <Text style={styles.localizationText}>{cityName}, {countryName}, 13:52</Text>

        <View style={styles.cardsHoursDay}>

          <MainCard title={"Manhã"} icon={'morning'} temperature={"27°"} backgroundColor={'#D26F2F'} ></MainCard>
          <MainCard title={"Tarde"} icon={'afternoon'} temperature={"31°"} backgroundColor={darkTheme ? '#D29600'  : '#FCC63F'} ></MainCard>
          <MainCard title={"Noite"} icon={'night'} temperature={"21°"} backgroundColor={darkTheme ? '#008081'  : '#38B7B8'} ></MainCard>

          

        </View>
    
        <View style={styles.info}>

          <Text style={styles.infoText}>Informações adcionais:</Text>

          <View style={styles.addtionalInfo}>

            <View style={styles.cardAdditionalInfo}>
              <Text style={styles.climaticalInfoText}>Vento</Text>
              <Text style={[styles.climaticalInfoText, styles.climaticalInfoSubText]}>{wind} m/h</Text>
            </View>

            <View style={styles.cardAdditionalInfo}>
              <Text style={styles.climaticalInfoText}>Umidade</Text>
              <Text style={[styles.climaticalInfoText, styles.climaticalInfoSubText]}>{humidity}%</Text>
            </View>

            <View style={styles.cardAdditionalInfo}>
              <Text style={styles.climaticalInfoText}>Temp. Min.</Text>
              <Text style={[styles.climaticalInfoText, styles.climaticalInfoSubText]}>{temperatureMin} °C</Text>
            </View>

            <View style={styles.cardAdditionalInfo}>
              <Text style={styles.climaticalInfoText}>Temp. Max</Text>
              <Text style={[styles.climaticalInfoText, styles.climaticalInfoSubText]}>{temperatureMax} °C</Text>
            </View>

          </View>

        </View>

        <View style={styles.themeButton}>
          <View style={styles.themeButtonSquare}>
            <TouchableOpacity style={styles.themeButtonCircle} onPress={() =>darkTheme ? setDarkTheme(false) : setDarkTheme(true)}></TouchableOpacity>
          </View>
        </View>
        
      </View>
    </ThemeContext.Provider>
  );
}


