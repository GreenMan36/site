/**
 * Composables for application-wide state management
 * Using Nuxt's built-in useState and VueUse utilities
 */

/**
 * Theme management using @nuxtjs/color-mode
 * Automatically handles SSR, persistence, and system preference detection
 */
export const useTheme = () => {
  const colorMode = useColorMode();

  return {
    // Current theme preference: 'light', 'dark', or 'system'
    preference: computed({
      get: () => colorMode.preference,
      set: (value: 'light' | 'dark' | 'system') => {
        colorMode.preference = value;
      },
    }),
    // Resolved theme value (what's actually shown): 'light' or 'dark'
    value: computed(() => colorMode.value),
    // Check if dark mode is active
    isDark: computed(() => colorMode.value === 'dark'),
  };
};

