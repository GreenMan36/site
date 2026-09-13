/**
 * Composables for application-wide state management
 * Using Nuxt's built-in useState and VueUse utilities
 */

/**
 * Navigation state for mobile menu
 * 0 = closed, 1-3 = different menu levels
 */
export const useNavState = () => {
  const navLevel = useState<0 | 1 | 2 | 3>('navLevel', () => 0);

  const toggleNav = () => {
    navLevel.value = navLevel.value ? 0 : 1;
  };

  const setNavLevel = (level: 0 | 1 | 2 | 3) => {
    navLevel.value = level;
  };

  const closeNav = () => {
    navLevel.value = 0;
  };

  return {
    navLevel: readonly(navLevel),
    toggleNav,
    setNavLevel,
    closeNav,
  };
};
