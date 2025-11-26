/**
 * Medical Disclaimer Component
 * Disclaimer médico visible en todas las pantallas (excepto auth)
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const MedicalDisclaimer = ({ visible = true }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!visible) return null;

  return (
    <View style={styles.container}>
      <View style={styles.disclaimerBox}>
        <Text style={styles.disclaimerTitle}>⚕️ Aviso de Responsabilidad Médica</Text>
        <Text style={styles.disclaimerText} numberOfLines={isExpanded ? 0 : 2}>
          La información proporcionada en este foro es únicamente educativa y no debe considerarse como consejo médico. 
          Consulte siempre con un profesional de salud certificado antes de tomar decisiones sobre su salud.
        </Text>
        <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
          <Text style={styles.toggleButton}>
            {isExpanded ? 'Ocultar' : 'Ver más'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f0f9ff',
  },
  disclaimerBox: {
    backgroundColor: '#e0f2fe',
    borderLeftWidth: 4,
    borderLeftColor: '#0284c7',
    padding: 12,
    borderRadius: 4,
  },
  disclaimerTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0c4a6e',
    marginBottom: 6,
  },
  disclaimerText: {
    fontSize: 12,
    color: '#164e63',
    lineHeight: 16,
  },
  toggleButton: {
    color: '#0284c7',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 6,
  },
});

export default MedicalDisclaimer;
