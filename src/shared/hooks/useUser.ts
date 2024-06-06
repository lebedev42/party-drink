import { useLocalStorage } from 'usehooks-ts';

export const useUser = () => {
  const [user, setUser] = useLocalStorage('user', '');

  const saveUser = (user: string) => {
    setUser(user);
  };

  return { user, saveUser };
};
