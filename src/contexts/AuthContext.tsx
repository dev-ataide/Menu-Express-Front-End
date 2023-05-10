import { createContext, ReactNode, useState } from "react";
import {destroyCookie, setCookie,parseCookies} from 'nookies'
import Router from "next/router";
import { api } from "@/services/apiClient";

// Define a interface para o objeto que será armazenado no contexto
type AuthContextData = {
  user: UserProps | null;
  isAuthenticated: boolean;
  signIn: (credentials: SigninProps) => Promise<void>;
  signOut: () => void;
};

// Define a interface para as propriedades do usuário
type UserProps = {
  id: string;
  name: string;
  email: string;
};

// Define a interface para as propriedades do formulário de login
type SigninProps = {
  email: string;
  password: string;
};

// Define a interface para as propriedades do componente AuthProvider
type AuthProviderProps = {
  children: ReactNode;
};

// Cria um contexto do tipo AuthContextData com valor inicial vazio
export const AuthContext = createContext({} as AuthContextData);

export function signOut(){
    try {
        destroyCookie(undefined,"@nextauth")
        Router.push('/')
    } catch (error) {
        console.log('erro ao deslogar')
    }

}


export function AuthProvider({ children }: AuthProviderProps) {
  // Inicializa o estado user com null
  const [user, setUser] = useState<UserProps | null>(null);

  // Verifica se existe um usuário autenticado
  const isAuthenticated = !!user;

  // Função para autenticar o usuário
  async function signIn({email,password}:SigninProps){
   
try {
  const response = await api.post('/session', {
    email,
    password,
  })
  console.log(response.data)

  const {id, name,token} =response.data;
  setCookie(undefined, '@nextAuth', token,{
    maxAge: 60*60*24*30 // O Cookie atrelado ao token do usuario expirará em 30 dias
  })

  setUser({
    id,
    name,
    email,
  })

  //Passa para as proximas requisições o token do usuario
  api.defaults.headers['Authorization'] = `Bearer ${token}`
  //Redirecionar o usuario para o dashboard
  Router.push('/dashboard')
} catch (erro) {
  console.log('erro na autenticação')
}

}

  return (
    // Define o valor do contexto com user, isAuthenticated e signIn, e depois renderiza os componentes filhos
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
