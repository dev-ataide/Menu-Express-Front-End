// Importação do arquivo de estilos do componente
import styles from './styles.module.scss'
// Importação de tipos do React e do elemento de botão HTML
import { ReactNode, ButtonHTMLAttributes } from 'react';
// Importação do ícone de Spinner do React Icons
import { FaSpinner } from 'react-icons/fa'
// Criação de uma interface para definir as propriedades do componente Button
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    loading? : boolean,
    children: ReactNode,
}

// Criação do componente Button
export function Button({loading, children, ...rest}: ButtonProps){
    return(
        // Elemento de botão HTML com as classes de estilo definidas no arquivo de estilos
        <button className={styles.button}
        // Definição da propriedade disabled caso o estado de loading seja verdadeiro
        disabled={loading}
        {...rest}
        >
             {/*  Utilização do ícone de Spinner caso o estado de loading seja verdadeiro */}
            {loading ? (
                <FaSpinner color='#fff' size={16}/>
             ) : (
            // Caso contrário, exibição do conteúdo definido como children
                <a className={styles.buttonText}>{children}</a>
             )}
        </button>
    )
}