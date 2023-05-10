// Importação das dependências necessárias
import axios, { AxiosError } from "axios"; // Biblioteca para realizar requisições HTTP
import { parseCookies } from "nookies"; // Biblioteca para lidar com cookies no Next.js
import { AuthTokenError } from "./errors/AuthTokenErro"; // Importação de um erro personalizado
import { signOut } from "@/contexts/AuthContext"; // Importação da function de deslogar o usuario

// Função para configurar o cliente da API
export function setupAPIClient(ctx = undefined) {
  // Obtenção dos cookies da aplicação utilizando a biblioteca nookies
  let cookies = parseCookies(ctx);

  // Criação do objeto para realizar requisições HTTP utilizando a biblioteca axios
  const api = axios.create({
    baseURL: "http://localhost:3333", // Endereço base da API
    headers: {
      Authorization: `Bearer ${cookies["@nextauth"]}`, // Token de autorização obtido do cookie
    },
  });

  // Interceptação das respostas da API para lidar com erros de autorização
  api.interceptors.response.use(
    (response) => {
      return response; // Retorna a resposta caso não haja erros
    },
    (error: AxiosError) => {

      //Verificar que porra de erro é esse que ta dando no response -> "response is any"
      
      if (error.response?.status === 401) { // Verifica se o erro é de autorização
        if (typeof window !== "undefined") {
          signOut() // Se estiver no lado do cliente (no navegador)
        } else {
          // Se estiver no lado do servidor (no Next.js)
          return Promise.reject(new AuthTokenError()); // Rejeita a promessa com um erro personalizado de autenticação
        }
      }
      return Promise.reject(error); // Rejeita a promessa com o erro original caso não seja de autorização
    }
  );

  return api; // Retorna o objeto configurado para realizar requisições HTTP
} 

// Comentário de cada linha:
// - Importação das bibliotecas axios e AxiosError: permite realizar requisições HTTP e tratar erros específicos do axios.
// - Importação da biblioteca nookies: permite obter cookies no Next.js.
// - Importação de um erro personalizado: será utilizado para tratar erros de autenticação.
// - Definição da função setupAPIClient: função que configura o cliente da API.
// - Obtenção dos cookies da aplicação utilizando a biblioteca nookies.
// - Criação do objeto para realizar requisições HTTP utilizando a biblioteca axios com a configuração do endereço base da API e do token de autorização obtido do cookie.
// - Interceptação das respostas da API para lidar com erros de autorização utilizando um callback que verifica se o erro é de autorização, rejeita a promessa com um erro personalizado de autenticação caso esteja no lado do servidor (Next.js) e retorna o erro original caso não seja de autorização.
// - Retorno do objeto configurado para realizar requisições HTTP.