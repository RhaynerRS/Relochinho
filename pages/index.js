import styled from 'styled-components'
import React, { useEffect } from 'react'
import {useState} from 'react';
import MainGrid from '../src/components/MainGrid'
import TimeUnit from '../src/components/TimeUnit'

export default function Home() {
  const [time,setTime] = useState(new Date())
  
  useEffect(()=>{
    const timer=setInterval(()=>{
      setTime(new Date());
    });
    return () =>{
      clearInterval(timer)
    }
  },[]) 

  let hours=time.getHours()
  let minutes=time.getMinutes()
  let seconds=time.getSeconds()

  if (hours<10){
    hours="0"+hours
  }
  if (minutes<10){
    minutes="0"+minutes
  }
  if (seconds<10){
    seconds="0"+seconds
  }


  return (<><MainGrid><TimeUnit style={{gridArea:'hours'}}>{hours}</TimeUnit>
  <TimeUnit style={{gridArea:'minutes'}}>{minutes}</TimeUnit>
  <TimeUnit style={{gridArea:'seconds'}}>{seconds}</TimeUnit></MainGrid></>)
}
