import React, { useEffect } from 'react'
import { useState } from 'react';
import MainGrid from '../src/components/MainGrid'
import TimeUnit from '../src/components/TimeUnit'
import ButtonPomodoro from '../src/components/ButtonPomodoro'
import Body from '../src/components/Body'
import ProfileArea from '../src/components/ProfileArea'
import {Title} from '../src/components/Misc'
import {SmallTitle} from '../src/components/Misc'


//variaveis mutaveis
let status = 'study'
let itsPaused = false



export default function Home() {

  //pause/play button
  const [pauseLabel,setPauseLabel]= useState('pause')

  //variaveis inicio

  //tempo volatil
  const [segundos, setSegundos] = useState(0)
  const [minutos, setMinutos] = useState(0)

  //tempo total
  const [totalSegundos, setTotalSegundos] = useState(0)
  const [totalMinutos, setTotalMinutos] = useState(0)
  //variaveis fim

  //contador de segundos totais inicio
  useEffect(() => {
    const timer = setInterval(() => {
      if (!itsPaused && status == 'study') {
        setTotalSegundos(totalSegundos => totalSegundos + 1);
        
      }
      if (itsPaused){setPauseLabel('play')}
      else if (!itsPaused){setPauseLabel('pause')}
    }, 1000);
    return () => {
      clearInterval(timer)
    }
  }, [])
  //contador de segundos totais fim

  //minutos totais
  if (totalSegundos >= 60 && status == 'study') { setTotalMinutos(totalMinutos => totalMinutos + 1); setTotalSegundos(0) }

  //contador de segundos inicio
  useEffect(() => {
    const timer = setInterval(() => {
      if (!itsPaused) {
        if (status == 'study') {
          setSegundos(segundos => segundos + 1);
        } else {
          setSegundos(segundos => (segundos - 1));
        }
      }
    }, 1000);
    return () => {
      clearInterval(timer)
    }
  }, [])
  //contador de segundos fim
  var a;
  var b=(a=3) ? true : false
  //controlador dos minutos inicio
  //count up
  if (segundos >= 60 && status == 'study') { setMinutos(minutos => minutos + 1); setSegundos(0) }
  //count down
  else if (segundos == 0 && status == 'break') { setMinutos(minutos => minutos - 1); setSegundos(59) }
  //controlador dos minutos fim

  //horario de estudo
  if (minutos == 25 && status == 'study') { status = 'break'; setSegundos(59); setMinutos(4); }

  //horario de pausa
  else if (minutos == 0 && status == 'break') { status = 'study'; setSegundos(0); setMinutos(0) }

  //padronizar os numeros
  let segundosTela = segundos
  let minutosTela = minutos
  let totalMinutosTela = totalMinutos
  let totalSegundosTela = totalSegundos

  if (totalMinutos < 10) { totalMinutosTela = '0' + totalMinutos }
  if (totalSegundos < 10) { totalSegundosTela = '0' + totalSegundos }
  if (minutos < 10) { minutosTela = "0" + minutos }
  if (segundos < 10) { segundosTela = "0" + segundos }

  return (  
  <>
    <Body status={status}>
      <ProfileArea src={'https://github.com/RhaynerRS.png'} />
      <MainGrid>
        <TimeUnit>{minutosTela}:{segundosTela}</TimeUnit>

      </MainGrid>
      <SmallTitle>total study time: {totalMinutosTela} : {totalSegundosTela}</SmallTitle>
      <MainGrid>
        <ButtonPomodoro status={status} onClick={
          () => {
            setMinutos(0);
            setSegundos(0);
            setTotalSegundos(0);
            setTotalMinutos(0);
          }
        }>reset</ButtonPomodoro>

        <ButtonPomodoro status={status} onClick={
          () => {
            if (!itsPaused) { itsPaused = true; }
            else { itsPaused = false; }
          }
        }>{pauseLabel}</ButtonPomodoro>
      </MainGrid>

      <Title>it's {status} time</Title>
    </Body>
  </>)
}