import { Button } from '@/common/Button'
import { Playground } from '@/components/Playground';
import { StartScreen } from '@/components/StartScreen';
import { $state } from '@/store/store';
import { useStore } from 'effector-react'
import Head from 'next/head'

export default function Home() {
  const state = useStore($state);

  if (state === 'start') {
    return <StartScreen/>
  }

  return <Playground />
}
