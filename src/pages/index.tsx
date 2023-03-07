import styles from '@/styles/Home.module.css'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className="text-xl">
          <div>hi there</div> 
          <div>hi there</div> 
        </div>
        
      </main>
    </>
  )
}
