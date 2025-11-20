import React from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet } from 'react-native';
import VerticalMenu from '../components/VerticalMenu';
import { typography, spacing } from '../constants/theme';
import { useAccessibility } from '../components/AccessibilityContext';
import i18n from '../constants/i18n';

export default function Home() {
  const { largeText } = useAccessibility();

  return (
    <SafeAreaView style={styles.container}>
      {/* Nombre de la heladería arriba, fijo */}
      <Text style={[styles.heladeria, largeText && styles.largeTitle]}>K'Delight</Text>
      {/* Texto traducido debajo */}
      <Text style={[styles.title, largeText && styles.largeTitle]}>{i18n.t('bienvenido')}</Text>
      <View style={styles.center}>
        <Image source={require('../assets/images/heladeria.png')} style={styles.ice} />
        <Text style={[styles.subtitle, largeText && styles.largeSubtitle]}>{i18n.t('heladeria')}</Text>
        <View style={styles.menuContainer}>
          <VerticalMenu />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    justifyContent: 'flex-start',
  },
  heladeria: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: typography.h1,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  largeTitle: {
    fontSize: typography.h1 + 10,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  ice: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
    marginBottom: spacing.md,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  largeSubtitle: {
    fontSize: 26,
  },
  menuContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: spacing.lg,
  },
});