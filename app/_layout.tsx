import { Stack } from "expo-router/stack";
import { createContext, useState } from "react";
import { PaperProvider, MD2LightTheme, MD3Colors, MD2DarkTheme, MD3LightTheme } from "react-native-paper";


export interface Stretch {
  id: number;
  name: string;
}

import React from 'react';

interface StretchContextType {
  stretches: Stretch[];
  setStretches: React.Dispatch<React.SetStateAction<Stretch[]>>;
}

// Initialize the context with undefined. The actual value will be provided by a Provider.


export const StretchContext = React.createContext<StretchContextType | undefined>(undefined);

export default function Layout() {
  const [stretches, setStretches] = useState<Stretch[]>([]);


  return (
    <PaperProvider theme={MD3LightTheme}>
      <StretchContext.Provider value={{ stretches, setStretches }}>
        <Stack>
          <Stack.Screen name="(tabs)"
            options={{ headerShown: false }}
          />
        </Stack>
      </StretchContext.Provider>
    </PaperProvider>
  );
}