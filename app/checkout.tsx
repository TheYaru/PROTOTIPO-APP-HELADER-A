import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useCart } from '../components/CartContext';
import { useAccessibility } from '../components/AccessibilityContext';
import i18n from '../constants/i18n';
import { colors, spacing, radii } from '../constants/theme';

export default function Checkout() {
  const { items, remove, clear, checkout } = useCart();
  const { darkMode } = useAccessibility();
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);
  const router = useRouter();

  const bg = darkMode ? '#0f0f10' : colors?.bg ?? '#fff';
  const surface = darkMode ? '#161616' : colors?.surface ?? '#faf7fa';
  const textColor = darkMode ? '#fff' : colors?.text ?? '#2A2A2A';
  const muted = darkMode ? '#bfbfbf' : colors?.subtleText ?? '#666';
  const primary = colors?.primary ?? '#5E2D35';

  const total = items.reduce((s, it) => s + (it.price ?? 0) * it.qty, 0);

  const onCheckout = async () => {
    if (items.length === 0) {
      Alert.alert(i18n.t('info') || 'Info', i18n.t('carrito_vacio') || 'El carrito está vacío.');
      return;
    }
    setLoading(true);
    try {
      const res = await checkout();
      setOrderId(res.id ?? null);
      Alert.alert(i18n.t('listo') || 'Listo', i18n.t('pedido_creado') || `Pedido ${res.id}`);
    } catch (e) {
      console.error(e);
      Alert.alert(i18n.t('error') || 'Error', i18n.t('error_pedido') || 'Error al procesar el pedido');
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: any) => (
    <View style={[styles.item, { backgroundColor: surface, borderRadius: radii?.sm ?? 8 }]}>
      <View style={{ flex: 1 }}>
        <Text style={[styles.itemTitle, { color: textColor }]}>{item.title ?? `#${item.productId}`}</Text>
        <Text style={[styles.itemMeta, { color: muted }]}>
          {item.qty} × ${((item.price ?? 0)).toFixed(2)}
        </Text>
      </View>
      <Pressable
        style={[styles.smallBtn, { backgroundColor: '#ccc' }]}
        onPress={() => remove(item.productId)}
        accessibilityRole="button"
      >
        <Text style={[styles.smallBtnText, { color: '#333' }]}>{i18n.t('quitar') || 'Quitar'}</Text>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bg }]}>
      <Text style={[styles.title, { color: textColor }]}>{i18n.t('carrito') || 'Carrito'}</Text>

      {items.length === 0 ? (
        <View style={styles.center}>
          <Text style={{ color: muted }}>{i18n.t('carrito_vacio') || 'El carrito está vacío.'}</Text>
          <Pressable style={[styles.primaryBtn, { backgroundColor: primary, marginTop: spacing?.md ?? 18 }]} onPress={() => router.push('/')}>
            <Text style={styles.primaryBtnText}>{i18n.t('seguir_comprando') || 'Seguir comprando'}</Text>
          </Pressable>
        </View>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(i) => String(i.productId)}
            renderItem={renderItem}
            contentContainerStyle={{ padding: spacing?.md ?? 18 }}
            showsVerticalScrollIndicator={false}
          />

          <View style={[styles.summary, { padding: spacing?.md ?? 18 }]}>
            <Text style={[styles.total, { color: textColor }]}>
              {i18n.t('total') || 'Total'}: ${total.toFixed(2)}
            </Text>

            {loading ? (
              <ActivityIndicator color={primary} />
            ) : (
              <Pressable style={[styles.primaryBtn, { backgroundColor: primary }]} onPress={onCheckout}>
                <Text style={styles.primaryBtnText}>{i18n.t('confirmar_pedido') || 'Confirmar pedido'}</Text>
              </Pressable>
            )}

            <View style={{ height: spacing?.sm ?? 12 }} />

            <Pressable style={[styles.ghostBtn]} onPress={() => router.push('/')}>
              <Text style={[styles.ghostText, { color: primary }]}>{i18n.t('seguir_comprando') || 'Seguir comprando'}</Text>
            </Pressable>

            {orderId && <Text style={[styles.order, { color: textColor }]}>{i18n.t('pedido_creado') || `Pedido creado: ${orderId}`}</Text>}

            <Pressable style={[styles.ghostBtn, { marginTop: spacing?.sm ?? 12 }]} onPress={() => { clear(); }}>
              <Text style={[styles.ghostText, { color: muted }]}>{i18n.t('vaciar_carrito') || 'Vaciar carrito'}</Text>
            </Pressable>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 22, fontWeight: '800', paddingHorizontal: spacing?.md ?? 18, paddingTop: spacing?.sm ?? 12 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: spacing?.md ?? 18 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing?.sm ?? 12,
    marginBottom: spacing?.sm ?? 12,
  },
  itemTitle: { fontSize: 16, fontWeight: '700' },
  itemMeta: { marginTop: 6, fontSize: 13 },
  itemButtons: { marginLeft: 12 },
  smallBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: radii?.sm ?? 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallBtnText: { fontWeight: '700' },
  summary: { borderTopWidth: 1, borderTopColor: '#eee' },
  total: { fontSize: 18, fontWeight: '800', marginBottom: spacing?.sm ?? 12 },
  primaryBtn: {
    paddingVertical: 12,
    borderRadius: radii?.md ?? 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryBtnText: { color: '#fff', fontWeight: '800' },
  ghostBtn: {
    paddingVertical: 10,
    borderRadius: radii?.md ?? 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ghostText: { fontWeight: '700' },
  order: { marginTop: 10, fontWeight: '800' },
});