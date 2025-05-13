import { ThemedText } from '@/components/ThemedText';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

const { width } = Dimensions.get('window');

interface VisualItemsProps {
  count: number;
  operator: '+' | '-' | '*' | '/';
  operand1: number;
  operand2: number;
}

export function VisualItems({
  count,
  operator,
  operand1,
  operand2,
}: VisualItemsProps) {
  const renderItems = () => {
    switch (operator) {
      case '+':
        return renderAdditionItems(operand1, operand2);
      case '-':
        return renderSubtractionItems(operand1, operand2);
      case '*':
        return renderMultiplicationItems(operand1, operand2);
      case '/':
        return renderDivisionItems(operand1, operand2);
      default:
        return null;
    }
  };

  const renderAdditionItems = (num1: number, num2: number) => (
    <View style={styles.additionContainer}>
      <View style={styles.group}>
        {Array.from({ length: num1 }).map((_, i) => (
          <View
            key={`group1-${i}`}
            style={[styles.circle, { backgroundColor: '#FF6B6B' }]}
          />
        ))}
      </View>
      <ThemedText style={styles.operatorText}>+</ThemedText>
      <View style={styles.group}>
        {Array.from({ length: num2 }).map((_, i) => (
          <View
            key={`group2-${i}`}
            style={[styles.circle, { backgroundColor: '#4ECDC4' }]}
          />
        ))}
      </View>
    </View>
  );

  const renderSubtractionItems = (num1: number, num2: number) => (
    <View style={styles.subtractionContainer}>
      <View style={styles.group}>
        {Array.from({ length: num1 }).map((_, i) => (
          <View
            key={`sub-${i}`}
            style={[
              styles.circle,
              {
                backgroundColor: i < num2 ? '#FFE5E5' : '#FF6B6B',
                borderWidth: i < num2 ? 2 : 0,
                borderColor: '#FF0000',
                borderStyle: i < num2 ? 'dashed' : 'solid',
              },
            ]}
          />
        ))}
      </View>
    </View>
  );

  const renderMultiplicationItems = (num1: number, num2: number) => (
    <View style={styles.multiplicationContainer}>
      {Array.from({ length: num1 }).map((_, groupIndex) => (
        <View key={`row-${groupIndex}`} style={styles.multiplicationRow}>
          {Array.from({ length: num2 }).map((_, itemIndex) => (
            <View
              key={`item-${groupIndex}-${itemIndex}`}
              style={[styles.square, { backgroundColor: '#95E1D3' }]}
            />
          ))}
        </View>
      ))}
    </View>
  );

  const renderDivisionItems = (num1: number, num2: number) => {
    const groups = num1 / num2;
    return (
      <View style={styles.divisionContainer}>
        {Array.from({ length: groups }).map((_, groupIndex) => (
          <View key={`div-group-${groupIndex}`} style={styles.divisionGroup}>
            {Array.from({ length: num2 }).map((_, itemIndex) => (
              <View
                key={`div-item-${groupIndex}-${itemIndex}`}
                style={[styles.circle, { backgroundColor: '#FFD93D' }]}
              />
            ))}
          </View>
        ))}
      </View>
    );
  };

  return <View style={styles.container}>{renderItems()}</View>;
}

const styles = StyleSheet.create({
  container: {
    width: width - 40,
    alignItems: 'center',
    marginVertical: 20,
  },
  additionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 20,
  },
  subtractionContainer: {
    alignItems: 'center',
  },
  multiplicationContainer: {
    alignItems: 'center',
    gap: 8,
  },
  multiplicationRow: {
    flexDirection: 'row',
    gap: 8,
  },
  divisionContainer: {
    alignItems: 'center',
    gap: 15,
  },
  divisionGroup: {
    flexDirection: 'row',
    gap: 8,
    padding: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  group: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    maxWidth: width * 0.35,
  },
  circle: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    margin: 2,
  },
  square: {
    width: 35,
    height: 35,
    borderRadius: 8,
  },
  operatorText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
});
