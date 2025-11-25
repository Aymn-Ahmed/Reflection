import { useContext } from 'react';
import AuthContext from './authContextValue';

// Hook helper to access AuthContext from other components
export const useAuth = () => useContext(AuthContext);

export default useAuth;
