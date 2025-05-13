import { ThemedText } from '@/components/ThemedText';
import { Question } from '@/contexts/GameContext';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { VisualItems } from './VisualItems';

interface QuestionDisplayProps {
  question: Question;
}

export function QuestionDisplay({ question }: QuestionDisplayProps) {
  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        <ThemedText style={styles.questionText}>
          {question.operand1} {question.operator} {question.operand2} = ?
        </ThemedText>
      </View>

      <VisualItems
        count={question.visualItems}
        operator={question.operator}
        operand1={question.operand1}
        operand2={question.operand2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 40,
  },
  questionContainer: {
    backgroundColor: '#FFE5CC',
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    marginBottom: 30,
  },
  questionText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
});
