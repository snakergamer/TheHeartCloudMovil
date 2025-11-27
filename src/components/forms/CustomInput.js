/**
 * Custom Input Component
 * Input reutilizable con validación
 */

import React, { useRef } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
} from 'react-native';

const CustomInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  secureTextEntry = false,
  keyboardType = 'default',
  maxLength,
  editable = true,
  onFocus,
  onBlur,
  autoCapitalize = 'none',
  autoCorrect = false,
  returnKeyType = 'done',
}) => {
  const [focused, setFocused] = React.useState(false);
  const inputRef = useRef(null);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        ref={inputRef}
        style={[
          styles.input,
          error && styles.inputError,
          focused && styles.inputFocused
        ]}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        maxLength={maxLength}
        editable={editable}
        onFocus={() => {
          setFocused(true);
          onFocus?.();
        }}
        onBlur={() => {
          setFocused(false);
          onBlur?.();
        }}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        autoComplete="off"
        returnKeyType={returnKeyType}
        selectTextOnFocus={true}
        clearButtonMode="while-editing"
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#000',
    backgroundColor: '#fff',
    minHeight: 48,
  },
  inputFocused: {
    borderColor: '#3b82f6',
    backgroundColor: '#f0f9ff',
    borderWidth: 2,
  },
  inputError: {
    borderColor: '#ef4444',
    backgroundColor: '#fef2f2',
    borderWidth: 2,
  },
  error: {
    color: '#ef4444',
    fontSize: 12,
    marginTop: 4,
  },
});

export default CustomInput;
