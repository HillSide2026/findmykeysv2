import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ThemeContextType {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
  fontSize: number;
  setFontSize: (value: number) => void;
  fontColor: string;
  setFontColor: (value: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [fontColor, setFontColor] = useState('#000000');

  useEffect(() => {
    // Load the stored settings from AsyncStorage when the app starts
    const loadSettings = async () => {
      const storedDarkMode = await AsyncStorage.getItem('isDarkMode');
      const storedFontSize = await AsyncStorage.getItem('fontSize');
      const storedFontColor = await AsyncStorage.getItem('fontColor');
      
      if (storedDarkMode !== null) setIsDarkMode(JSON.parse(storedDarkMode));
      if (storedFontSize !== null) setFontSize(Number(storedFontSize));
      if (storedFontColor !== null) setFontColor(storedFontColor);
    };

    loadSettings();
  }, []);

  useEffect(() => {
    // Save settings whenever they change
    AsyncStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
    AsyncStorage.setItem('fontSize', fontSize.toString());
    AsyncStorage.setItem('fontColor', fontColor);
  }, [isDarkMode, fontSize, fontColor]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode, fontSize, setFontSize, fontColor, setFontColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
