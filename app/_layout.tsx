// app/_layout.tsx
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0ea5e9', // Primary blue color
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: '600',
          },
          headerTitleAlign: 'center',
        }}
      >
  <Stack.Screen 
  name="index" 
  options={{ 
  headerShown: false,
  }} 
/>
  </Stack>
    </>
  );
}