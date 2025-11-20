// app/ofertas.tsx
import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import AccessibilityBubble from '../components/AccessibilityBubble';

export default function Ofertas() {
  return (
    <SafeAreaView style={{flex:1, padding:18}}>
      <Text style={{fontSize:30, fontWeight:'800'}}>Ofertas</Text>

      <View style={{marginTop:18, backgroundColor:'#F7EDF7', padding:16, borderRadius:14}}>
        <View style={{height:120, backgroundColor:'#E8DFE9', borderRadius:8, marginBottom:12, alignItems:'center', justifyContent:'center'}}>
          <Text>Imagen promo</Text>
        </View>
        <Text style={{fontWeight:'700'}}>2 x 1</Text>
        <Text style={{color:'#555', marginVertical:8}}>Compra un helado y llévate otro gratis. Válido 31 Dic 2025</Text>
        <View style={{flexDirection:'row', gap:12}}>
          <PrimaryButton title="Apartar" onPress={()=>{}} />
          <PrimaryButton title="Usar cupón" onPress={()=>{}} />
        </View>
      </View>

      <AccessibilityBubble />
    </SafeAreaView>
  );
}
