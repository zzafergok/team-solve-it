import { AnswerInput } from '@/components/game/AnswerInput';
import { GameStats } from '@/components/game/GameStats';
import { PauseMenu } from '@/components/game/PauseMenu';
import { QuestionDisplay } from '@/components/game/QuestionDisplay';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useGame } from '@/contexts/GameContext';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function PlayScreen() {
  const router = useRouter();
  const game = useGame();
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const warningAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    game.restartGame();
    loadSounds();
  }, []);

  useEffect(() => {
    if (game.timeLeft <= 5 && game.timeLeft > 0) {
      startWarningAnimation();
      playWarningSound();
    }
  }, [game.timeLeft]);

  useEffect(() => {
    if (game.isGameOver) {
      Alert.alert(
        'Oyun Bitti!',
        `Skorun: ${game.score}\nPuan: ${game.currentLevel}`,
        [
          { text: 'Tekrar Oyna', onPress: game.restartGame },
          { text: 'Ana Menü', onPress: () => router.push('/(tabs)/game') },
        ]
      );
    }
  }, [game.isGameOver]);

  const loadSounds = async () => {
    // Ses dosyalarını yükleme
  };

  const playWarningSound = async () => {
    // Uyarı sesi çalma
  };

  const startWarningAnimation = () => {
    warningAnim.setValue(0);
    Animated.sequence([
      Animated.timing(warningAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(warningAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const warningStyle = {
    borderColor: warningAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['transparent', '#FF0000'],
    }),
    borderWidth: warningAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 4],
    }),
  };

  return (
    <ThemedView style={styles.container}>
      <Animated.View style={[styles.warningBorder, warningStyle]}>
        <View style={styles.header}>
          <GameStats
            level={game.currentLevel}
            score={game.score}
            lives={game.lives}
            timeLeft={game.timeLeft}
            totalTime={game.totalTime}
          />

          <TouchableOpacity style={styles.pauseButton} onPress={game.pauseGame}>
            <IconSymbol name="pause" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.gameArea}>
          {game.currentQuestion && (
            <>
              <QuestionDisplay question={game.currentQuestion} />
              <AnswerInput onSubmit={game.checkAnswer} />
            </>
          )}
        </View>
      </Animated.View>

      {game.isPaused && (
        <PauseMenu
          onResume={game.resumeGame}
          onRestart={game.restartGame}
          onMainMenu={() => router.push('/(tabs)/game')}
          onExit={() => router.push('/')}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8FF',
  },
  warningBorder: {
    flex: 1,
    margin: 4,
    borderRadius: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 12,
    margin: 8,
  },
  pauseButton: {
    backgroundColor: '#4ECDC4',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  gameArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});
