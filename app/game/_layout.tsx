import { GameProvider } from '@/contexts/GameContext';
import { Stack } from 'expo-router';

export default function GameLayout() {
  return (
    <GameProvider>
      <Stack>
        <Stack.Screen
          name="play"
          options={{
            headerShown: false,
            gestureEnabled: false, // Oyun sırasında geri gitmeyi engelle
          }}
        />
      </Stack>
    </GameProvider>
  );
}
