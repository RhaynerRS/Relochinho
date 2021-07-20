import styled from 'styled-components'
import React, { useEffect } from 'react'
import {useState} from 'react';
import MainGrid from '../src/components/MainGrid'
import TimeUnit from '../src/components/TimeUnit'

export default function Home() {
  const [pomodoro,setPomodoro] = useState(0)

  useEffect(()=>{
    const timer=setInterval(()=>{
      setPomodoro(pomodoro=>pomodoro+1);
      
    },1000);
    return () =>{
      clearInterval(timer)
    }
  },[]) 
  
  let segundos=0
  let minutos=0
  let horas=0

  
  if (pomodoro>60){
    horas=parseInt(pomodoro/3600);
    minutos=Math.round(((pomodoro/3600)-horas)*60);
    segundos=(pomodoro-((horas*3600)+(minutos*60))+30);
  }else{segundos=pomodoro}

  if (horas<10){
    horas="0"+horas
  }
  if (minutos<10){
    minutos="0"+minutos
  }
  if (segundos<10){
    segundos="0"+segundos
  }

  return (<><MainGrid>
  <TimeUnit style={{gridArea:'hours'}}>{horas}</TimeUnit><TimeUnit style={{gridArea:'minutes'}}>{minutos}</TimeUnit><TimeUnit style={{gridArea:'seconds'}}>{segundos}</TimeUnit></MainGrid></>)
}
