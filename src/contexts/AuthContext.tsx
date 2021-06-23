import { useEffect, useState, createContext, ReactNode } from "react";
import { auth, firebase } from "../services/firebase";

type User = {
    id: string;
    name: string;
    avatar: string;
    socialMedia?: string;
  }
  
  type AuthContextType = {
    user: User | undefined;
    signInWithSocialMedia: (socialMedia: 'facebook.com' | 'google.com') => Promise<void>;
  }  

type AuthContextProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
    const [user, setUser] = useState<User>()

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
          const { displayName, photoURL, uid } = user;
  
          if (!displayName || !photoURL) {
            throw new Error('Missing information from Google Account.');
          }
          
          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL,
            socialMedia: user.providerData[0]?.providerId
          })  
        }
      })
  
      return () => {
        unsubscribe();
      }
    }, [])
  
    async function signInWithSocialMedia(socialMedia: 'facebook.com' | 'google.com') {
      let provider;
      if (socialMedia === 'google.com') provider = new firebase.auth.GoogleAuthProvider();  
      else provider = new firebase.auth.FacebookAuthProvider();

      const result = await auth.signInWithPopup(provider)
  
      if (result.user) {
        const { displayName, photoURL, uid } = result.user;
  
        if (!displayName || !photoURL) {
          throw new Error('Missing information.');
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
          socialMedia: socialMedia
        })
      }
    }

    return (
        <AuthContext.Provider value={{user, signInWithSocialMedia }}>
            {props.children}
        </AuthContext.Provider>

    );
}