export const useDrawerState = () => {
  // Nuxt3 에서 useState 를 사용할 때 ref 객체를 반환하기때문에 명시적으로 ref 를 반환하지 않아도 된다.
  const leftDrawerOpen = useState<boolean>('leftDrawerOpen', () => false);

  const toggleLeftDrawer = () => {
    console.log('호출됌');
    leftDrawerOpen.value = !leftDrawerOpen.value;
  };

  return {
    leftDrawerOpen,
    toggleLeftDrawer,
  };
};
