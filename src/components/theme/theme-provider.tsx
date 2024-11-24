import { ThemeProvider as BaseThemeProvider } from 'next-themes';
import { PropsWithChildren } from 'react';

export default function ThemeProvider({ children }: PropsWithChildren) {
  return (
    <BaseThemeProvider attribute='class' defaultTheme='system' enableSystem>
      {children}
    </BaseThemeProvider>
  );
}
