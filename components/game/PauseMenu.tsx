import { ThemedText } from '@/components/ThemedText';
import { BlurView } from 'expo-blur';
import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

interface PauseMenuProps {
  onResume: () => void;
  onRestart: () => void;
  onMainMenu: () => void;
  onExit: () => void;
}

export function PauseMenu({
  onResume,
  onRestart,
  onMainMenu,
  onExit,
}: PauseMenuProps) {
  return (
    <View style={styles.overlay}>
      <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill} />
      <View style={styles.menuContainer}>
        <ThemedText style={styles.title}>Oyun Duraklatıldı</ThemedText>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.resumeButton]}
            onPress={onResume}
          >
            <ThemedText style={styles.buttonText}>Devam Et</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.restartButton]}
            onPress={onRestart}
          >
            <ThemedText style={styles.buttonText}>Yeniden Oyna</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.mainMenuButton]}
            onPress={onMainMenu}
          >
            <ThemedText style={styles.buttonText}>Ana Menü</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.exitButton]}
            onPress={onExit}
          >
            <ThemedText style={styles.buttonText}>Çıkış</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  menuContainer: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    minWidth: 280,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 30,
  },
  buttonContainer: {
    gap: 15,
    width: '100%',
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  resumeButton: {
    backgroundColor: '#4ECDC4',
  },
  restartButton: {
    backgroundColor: '#FFD93D',
  },
  mainMenuButton: {
    backgroundColor: '#95E1D3',
  },
  exitButton: {
    backgroundColor: '#FF6B6B',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
