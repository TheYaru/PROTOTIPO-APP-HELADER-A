import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Slot } from 'expo-router';
import { LanguageProvider } from '../components/LanguageContext';
import { AccessibilityProvider } from '../components/AccessibilityContext';
import { CartProvider } from '../components/CartContext';
import CartBubble from '../components/CartBubble';
import AccessibilityBubble from '../components/AccessibilityBubble';

export default function Layout() {
  return (
    <LanguageProvider>
      <AccessibilityProvider>
        <CartProvider>
          <SafeAreaView style={styles.safe}>
            <View style={styles.container}>
              <Slot />
              <CartBubble />
              <AccessibilityBubble />
            </View>
          </SafeAreaView>
        </CartProvider>
      </AccessibilityProvider>
    </LanguageProvider>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: 'transparent' },
  container: { flex: 1, paddingTop: 64, backgroundColor: 'transparent' },
});