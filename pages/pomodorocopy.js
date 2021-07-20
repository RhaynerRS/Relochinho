import React, { useEffect } from 'react'
import { useState } from 'react';
import MainGrid from '../src/components/MainGrid'
import TimeUnit from '../src/components/TimeUnit'
let status = 'study'
export default function Home() {

  //variaveis
  const [segundos, setSegundos] = useState(0)
  const [minutos, setMinutos] = useState(0)
  console.log(status)
  //contador de segundos inicio
  useEffect(() => {
    const timer = setInterval(() => {
      if (status == 'study') {
        setSegundos(segundos => segundos + 1);
      } else {
        setSegundos(segundos => (segundos - 1));
      }
    }, 1000);
    return () => {
      clearInterval(timer)
    }
  }, [])
  //contador de segundos fim

  //controlador dos minutos inicio
  //count up
  if (segundos >= 60 && status == 'study') {
    setMinutos(minutos => minutos + 1)
    setSegundos(0)
  }
  //count down
  else if (segundos == 0 && status == 'break') {
    setMinutos(minutos => minutos - 1)
    setSegundos(59)
  }
  //controlador dos minutos fim

  //horario de estudo
  if (minutos == 25 && status == 'study') {
    status = 'break'
    setSegundos(59)
    setMinutos(4)
  }

  //horario de pausa
  else if (minutos == 0 && status == 'break') {
    status = 'study'
    setSegundos(0)
    setMinutos(0)
  }

  //padronizar os numeros
  let segundosTela=segundos
  let minutosTela=minutos
  if (minutos<10){
    minutosTela="0"+minutos
  }
  if (segundos<10){
    segundosTela="0"+segundos
  }

  return (<>
    <MainGrid>
      <TimeUnit style={{ gridArea: 'minutes' }}>{minutosTela}</TimeUnit>
      <TimeUnit style={{ gridArea: 'seconds' }}>{segundosTela}</TimeUnit>

    </MainGrid>
    <h1>its time to {status}</h1>
  </>)
}
