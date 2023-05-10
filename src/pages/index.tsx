import {useContext, FormEvent, useState} from 'react'
import styles from '../styles/home.module.scss'
import Head  from 'next/head'
import Image from 'next/image'
import logo from '../../public/logo.png'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { AuthContext } from '@/contexts/AuthContext'
 
export default function Home() {
  const {signIn}= useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState ('')
  const [loading,setLoading] = useState(false)
  async function handleLogin(e:FormEvent) {
    let data = {
      email,
      password,
    }
    await signIn(data)
    e.preventDefault()

  }
  return (
    <>
    <Head>
      <title>MenuExpress, faça seu login.</title>
    </Head>
    <div className={styles.containerCenter}>
    <Image className={styles.logo} src={logo} alt='Logo' />
    <div className={styles.login}>
      <form onSubmit={handleLogin}>
        <Input placeholder='Digite seu Email' type='text' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <Input placeholder='Digite sua Senha' type='password'value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <Button type="submit" loading={false}>Login</Button>
      </form>
      <Link className={styles.text} href="/signup">Não possui uma conta? Cadastre-se</Link>
    </div>
    </div>
    </>
  )
}
