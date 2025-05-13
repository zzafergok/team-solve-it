import { ThemedText } from '@/components/ThemedText';
import React, { useRef, useState } from 'react';
import {
  Animated,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface AnswerInputProps {
  onSubmit: (answer: number) => boolean;
}

export function AnswerInput({ onSubmit }: AnswerInputProps) {
  const [answer, setAnswer] = useState('');
  const [showResult, setShowResult] = useState<'correct' | 'incorrect' | null>(
    null
  );
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const feedbackAnim = useRef(new Animated.Value(0)).current;

  const handleSubmit = () => {
    const numAnswer = parseInt(answer);
    if (isNaN(numAnswer)) return;

    const isCorrect = onSubmit(numAnswer);
    setShowResult(isCorrect ? 'correct' : 'incorrect');

    // Animasyon efektleri
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();

    // Geribildirim animasyonu
    Animated.sequence([
      Animated.timing(feedbackAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.delay(800),
      Animated.timing(feedbackAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setAnswer('');
      setShowResult(null);
    });
  };

  const handleKeyPress = (key: string) => {
    if (key === 'delete') {
      setAnswer((prev) => prev.slice(0, -1));
    } else if (key === 'submit') {
      handleSubmit();
    } else {
      setAnswer((prev) => prev + key);
    }
  };

  const keys = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['delete', '0', 'submit'],
  ];

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.inputContainer, { transform: [{ scale: scaleAnim }] }]}
      >
        <TextInput
          style={styles.input}
          value={answer}
          editable={false}
          placeholder="?"
          placeholderTextColor="#A0A0A0"
        />
      </Animated.View>

      <View style={styles.keyboard}>
        {keys.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.keyboardRow}>
            {row.map((key) => (
              <TouchableOpacity
                key={key}
                style={[
                  styles.key,
                  key === 'submit' && styles.submitKey,
                  key === 'delete' && styles.deleteKey,
                ]}
                onPress={() => handleKeyPress(key)}
              >
                <ThemedText
                  style={[
                    styles.keyText,
                    key === 'submit' && styles.submitKeyText,
                    key === 'delete' && styles.deleteKeyText,
                  ]}
                >
                  {key === 'delete' ? '⌫' : key === 'submit' ? '✓' : key}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>

      {showResult && (
        <Animated.View style={[styles.feedback, { opacity: feedbackAnim }]}>
          <ThemedText
            style={[
              styles.feedbackText,
              showResult === 'correct'
                ? styles.correctText
                : styles.incorrectText,
            ]}
          >
            {showResult === 'correct' ? '🎉 Doğru!' : '❌ Tekrar Dene!'}
          </ThemedText>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    minHeight: 300,
  },
  inputContainer: {
    marginBottom: 30,
  },
  input: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2C3E50',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    textAlign: 'center',
    minWidth: 150,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  keyboard: {
    gap: 10,
  },
  keyboardRow: {
    flexDirection: 'row',
    gap: 10,
  },
  key: {
    width: 80,
    height: 80,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  submitKey: {
    backgroundColor: '#4ECDC4',
  },
  deleteKey: {
    backgroundColor: '#FF6B6B',
  },
  keyText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  submitKeyText: {
    color: '#FFFFFF',
  },
  deleteKeyText: {
    color: '#FFFFFF',
  },
  feedback: {
    position: 'absolute',
    bottom: -50,
  },
  feedbackText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  correctText: {
    color: '#27AE60',
  },
  incorrectText: {
    color: '#E74C3C',
  },
});
