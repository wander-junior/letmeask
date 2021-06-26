import { useEffect, useState, createContext, ReactNode } from "react";
import { Loading } from "../components/Loading";
import { auth, firebase } from "../services/firebase";


type User = {
    id: string | null;
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
    const [user, setUser] = useState<User>();
    const [isLoading, setIsLoading] = useState(true);

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
          setIsLoading(false);
        }
        else {
          setIsLoading(false)
          setUser({
            id: null,
            name: '',
            avatar: ''
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

    if (isLoading) return (
      <Loading />
    )

    return (
        <AuthContext.Provider value={{user, signInWithSocialMedia }}>
            {props.children}
        </AuthContext.Provider>

    );
}