
import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import * as Permissions from "expo-camera";
import {BarCodeScanner} from "expo-barcode-scanner";

export default class BookTransaction extends React.Component {

    constructor(){
        super()
        this.state={
            hasCamPermission:null,
            scanned:false,
            scannedData:"",
            buttonState:"normal"
        }
    }

    getCamPermission=async()=>{
        const {status}=await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            hasCamPermission:status==="granted",
            buttonState:"clicked"
        })
    }

    handleBarCodeScanned=async({type,data})=>{
        this.setState({
           scanned:true,
           scannedData:data,
           buttonState:"normal"
        })
    }
    render(){
    if(this.state.buttonState==="clicked" && this.state.hasCamPermission===true){
        return(
            <BarCodeScanner

                onBarCodeScanned={this.state.scanned? undefined:this.handleBarCodeScanned}

            />
        )
    }
    else if(this.state.buttonState==="normal"){
        return(

            <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>

                <Text>
                   {this.hasCamPermission===true?this.state.scannedData:"Permission Denied"}
                </Text>

                <TouchableOpacity onPress={this.getCamPermission}>
                    <Text>
                        Scan Qr Code
                    </Text>
                </TouchableOpacity>

            </View>


        )

    }
       

    }
  
}
