/**
 * Privacy Screen
 * Pantalla de privacidad
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import MedicalDisclaimer from '../../components/common/MedicalDisclaimer';

const PrivacyScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Política de Privacidad</Text>

        <Text style={styles.section}>1. Información que Recopilamos</Text>
        <Text style={styles.text}>
          Recopilamos información que nos proporciona directamente, como tu nombre, correo electrónico y datos de perfil.
        </Text>

        <Text style={styles.section}>2. Cómo Usamos Tu Información</Text>
        <Text style={styles.text}>
          Utilizamos tu información para proporcionar, mantener y mejorar nuestros servicios de foros.
        </Text>

        <Text style={styles.section}>3. Protección de Datos</Text>
        <Text style={styles.text}>
          Implementamos medidas de seguridad para proteger tu información personal contra acceso no autorizado.
        </Text>

        <Text style={styles.section}>4. Cambios a Esta Política</Text>
        <Text style={styles.text}>
          Podemos actualizar esta política en cualquier momento. Te notificaremos de cambios significativos.
        </Text>
      </ScrollView>

      <MedicalDisclaimer visible={true} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 16,
  },
  section: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1f2937',
    marginTop: 16,
    marginBottom: 8,
  },
  text: {
    fontSize: 13,
    color: '#4b5563',
    lineHeight: 20,
  },
});

export default PrivacyScreen;
