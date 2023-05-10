// Importação do arquivo de estilos específicos da página Home
import styles from '../../styles/home.module.scss'

// Importação de componentes do Next.js
import Head  from 'next/head'
import Image from 'next/image'
import logo from '../../../public/logo.png'
import Link from 'next/link'

// Importação de componentes criados para a aplicação
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

// Definição do componente Home
export default function Home() {
    return (
      <>
        {/* Definição do Head da página */}
        <Head>
          <title>MenuExpress,faça seu cadastro.</title>
        </Head>
        {/* Div principal da página, definida pelo estilo 'containerCenter' */}
        <div className={styles.containerCenter}>
          {/* Inserção do logo da aplicação utilizando o componente Image do Next.js */}
          <Image className={styles.logo} src={logo} alt='Logo' />
          {/* Título principal da página */}
          <h1 className={styles.h1}>Cadastrando seu Restaurante</h1>
          {/* Div que contém o formulário de cadastro */}
          <div className={styles.login}>
            <form>
              {/* Componente de Input personalizado para a aplicação */}
              <Input placeholder='Digite o nome do seu Restaurante' type='text'/>
              <Input placeholder='Digite seu Email' type='text'/>
              <Input placeholder='Digite sua Senha' type='password'/>
              {/* Componente de Button personalizado para a aplicação */}
              <Button type="submit" loading={false}>Cadastrar</Button>
            </form>
            {/* Link para redirecionar para a página de login */}
            <Link className={styles.text} href="/">Já possui uma conta? Entre em sua conta</Link>
          </div>
        </div>
      </>
    )
  }
  