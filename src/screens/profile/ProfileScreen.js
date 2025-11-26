/**
 * Profile Screen
 * Pantalla de perfil del usuario
 */

import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../../context';
import CustomButton from '../../components/common/CustomButton';
import MedicalDisclaimer from '../../components/common/MedicalDisclaimer';

const ProfileScreen = ({ navigation }) => {
  const { user, logout, deleteAccount } = useContext(AuthContext);

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        { text: 'Cancelar', onPress: () => {}, style: 'cancel' },
        {
          text: 'Cerrar Sesión',
          onPress: () => {
            logout();
            navigation.navigate('Login');
          },
          style: 'destructive',
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Eliminar Cuenta',
      'Esta acción no se puede deshacer. Se eliminarán todos tus datos, foros creados y publicaciones.',
      [
        { text: 'Cancelar', onPress: () => {}, style: 'cancel' },
        {
          text: 'Eliminar',
          onPress: () => navigation.navigate('DeleteAccountConfirm'),
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user?.name?.[0]?.toUpperCase()}</Text>
          </View>
          <Text style={styles.name}>{user?.name || 'Usuario'}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información</Text>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Correo:</Text>
            <Text style={styles.infoValue}>{user?.email}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Publicaciones:</Text>
            <Text style={styles.infoValue}>{user?.postsCount || 0}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Foros:</Text>
            <Text style={styles.infoValue}>{user?.forumsJoined?.length || 0}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Acciones</Text>
          <CustomButton
            title="Editar Perfil"
            onPress={() => navigation.navigate('EditProfile')}
            variant="secondary"
            size="large"
            style={styles.actionButton}
          />
          <CustomButton
            title="Términos y Condiciones"
            onPress={() => navigation.navigate('Terms')}
            variant="secondary"
            size="large"
            style={styles.actionButton}
          />
          <CustomButton
            title="Privacidad"
            onPress={() => navigation.navigate('Privacy')}
            variant="secondary"
            size="large"
            style={styles.actionButton}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Peligro</Text>
          <CustomButton
            title="Cerrar Sesión"
            onPress={handleLogout}
            variant="secondary"
            size="large"
            style={styles.actionButton}
          />
          <CustomButton
            title="Eliminar Cuenta"
            onPress={handleDeleteAccount}
            variant="danger"
            size="large"
          />
        </View>
      </ScrollView>

      <MedicalDisclaimer visible={true} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '700',
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#6b7280',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  infoLabel: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 14,
    color: '#1f2937',
    fontWeight: '600',
  },
  actionButton: {
    marginBottom: 8,
  },
});

export default ProfileScreen;
