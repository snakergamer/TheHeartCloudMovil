/**
 * Delete Account Confirm Screen
 * Pantalla para confirmar eliminación de cuenta
 */

import React, { useContext, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../../context';
import CustomButton from '../../components/common/CustomButton';
import CustomInput from '../../components/forms/CustomInput';

const DeleteAccountConfirmScreen = ({ navigation }) => {
    const { deleteAccount, loading, error, setError } = useContext(AuthContext);
    const [confirmText, setConfirmText] = useState('');
    const CONFIRMATION_KEY = 'ELIMINAR';

    const handleDelete = async () => {
        if (confirmText !== CONFIRMATION_KEY) {
            Alert.alert('Error', `Por favor escribe "${CONFIRMATION_KEY}" para confirmar.`);
            return;
        }

        try {
            await deleteAccount();
            // Navigation to Login is handled by AuthContext listener
        } catch (err) {
            setError(err.message);
            Alert.alert('Error', 'No se pudo eliminar la cuenta. Intenta iniciar sesión nuevamente.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.warningBox}>
                    <Text style={styles.warningTitle}>⚠️ Acción Irreversible</Text>
                    <Text style={styles.warningText}>
                        Estás a punto de eliminar tu cuenta permanentemente. Esta acción borrará:
                    </Text>
                    <View style={styles.list}>
                        <Text style={styles.listItem}>• Tu perfil y datos personales</Text>
                        <Text style={styles.listItem}>• Tus publicaciones y comentarios</Text>
                        <Text style={styles.listItem}>• Tus foros creados</Text>
                    </View>
                </View>

                <Text style={styles.instruction}>
                    Para confirmar, escribe "{CONFIRMATION_KEY}" en el campo de abajo:
                </Text>

                <CustomInput
                    placeholder={CONFIRMATION_KEY}
                    value={confirmText}
                    onChangeText={setConfirmText}
                    autoCapitalize="characters"
                />

                <View style={styles.actions}>
                    <CustomButton
                        title="Cancelar"
                        onPress={() => navigation.goBack()}
                        variant="secondary"
                        style={styles.button}
                    />
                    <CustomButton
                        title="Eliminar Cuenta Permanentemente"
                        onPress={handleDelete}
                        variant="danger"
                        loading={loading}
                        disabled={confirmText !== CONFIRMATION_KEY}
                        style={styles.button}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        padding: 24,
    },
    warningBox: {
        backgroundColor: '#fef2f2',
        borderWidth: 1,
        borderColor: '#fca5a5',
        borderRadius: 8,
        padding: 16,
        marginBottom: 24,
    },
    warningTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#991b1b',
        marginBottom: 8,
    },
    warningText: {
        fontSize: 14,
        color: '#7f1d1d',
        marginBottom: 8,
    },
    list: {
        marginLeft: 8,
    },
    listItem: {
        fontSize: 14,
        color: '#7f1d1d',
        marginBottom: 4,
    },
    instruction: {
        fontSize: 16,
        color: '#374151',
        marginBottom: 12,
        fontWeight: '500',
    },
    actions: {
        marginTop: 24,
    },
    button: {
        marginBottom: 12,
    },
});

export default DeleteAccountConfirmScreen;
