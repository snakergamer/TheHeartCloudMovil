/**
 * Terms Screen
 * Pantalla de términos y condiciones
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MedicalDisclaimer from '../../components/common/MedicalDisclaimer';

const TermsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Términos y Condiciones</Text>

        <Text style={styles.section}>1. Aceptación de Términos</Text>
        <Text style={styles.text}>
          Al usar TheHeartCloud, aceptas estos términos y condiciones en su totalidad.
        </Text>

        <Text style={styles.section}>2. Uso Responsable</Text>
        <Text style={styles.text}>
          Te comprometes a usar esta plataforma de manera responsable y a no publicar contenido ofensivo, ilegal o peligroso.
        </Text>

        <Text style={styles.section}>3. Contenido de Usuarios</Text>
        <Text style={styles.text}>
          Eres responsable de todo el contenido que publiques. Nos reservamos el derecho de eliminar contenido que viole estos términos.
        </Text>

        <Text style={styles.section}>4. Limitación de Responsabilidad</Text>
        <Text style={styles.text}>
          TheHeartCloud no es responsable de daños derivados del uso de esta plataforma. Los consejos médicos en foros son informativos, no son sustituto de consulta profesional.
        </Text>

        <Text style={styles.section}>5. Cambios a los Términos</Text>
        <Text style={styles.text}>
          Podemos modificar estos términos en cualquier momento. El uso continuado implica aceptación de cambios.
        </Text>

        <Text style={styles.disclaimer}>
          ⚠️ AVISO MÉDICO: La información en foros es solo educativa. Consulta siempre con profesionales de salud certificados.
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
  disclaimer: {
    fontSize: 12,
    color: '#991b1b',
    backgroundColor: '#fef2f2',
    borderLeftWidth: 4,
    borderLeftColor: '#ef4444',
    padding: 12,
    marginTop: 16,
    borderRadius: 4,
  },
});

export default TermsScreen;
