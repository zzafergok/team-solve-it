import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface GameStatsProps {
  level: number;
  score: number;
  lives: number;
  timeLeft: number;
  totalTime: number;
}

export function GameStats({
  level,
  score,
  lives,
  timeLeft,
  totalTime,
}: GameStatsProps) {
  const timePercentage = (timeLeft / totalTime) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.statGroup}>
        <ThemedText style={styles.statLabel}>Seviye</ThemedText>
        <ThemedText style={styles.statValue}>{level}</ThemedText>
      </View>

      <View style={styles.statGroup}>
        <ThemedText style={styles.statLabel}>Skor</ThemedText>
        <ThemedText style={styles.statValue}>{score}</ThemedText>
      </View>

      <View style={styles.statGroup}>
        <ThemedText style={styles.statLabel}>Can</ThemedText>
        <View style={styles.livesContainer}></View>
        {Array.from({ length: 3 }).map((_, i) => (
          <IconSymbol
            key={i}
            name="heart.fill"
            size={20}
            color={i < lives ? '#FF6B6B' : '#DDD'}
          />
        ))}
      </View>

      <View style={styles.statGroup}>
        <ThemedText style={styles.statLabel}>Süre</ThemedText>
        <View style={styles.timeContainer}>
          <View style={styles.timeBar}>
            <View
              style={[
                styles.timeProgress,
                {
                  width: `${timePercentage}%`,
                  backgroundColor:
                    timePercentage > 30
                      ? '#4ECDC4'
                      : timePercentage > 10
                      ? '#FFD93D'
                      : '#FF6B6B',
                },
              ]}
            />
          </View>
          <ThemedText
            style={[
              styles.timeText,
              { color: timePercentage <= 10 ? '#FF6B6B' : '#2C3E50' },
            ]}
          >
            {timeLeft}s
          </ThemedText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statGroup: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#7F8C8D',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  livesContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  timeContainer: {
    alignItems: 'center',
    gap: 4,
  },
  timeBar: {
    width: 60,
    height: 6,
    backgroundColor: '#E8E8E8',
    borderRadius: 3,
    overflow: 'hidden',
  },
  timeProgress: {
    height: '100%',
    borderRadius: 3,
  },
  timeText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
