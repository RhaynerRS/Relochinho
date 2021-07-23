import React, { useEffect, useState } from 'react'
import MainGrid from '../src/components/MainGrid'
import TimeUnit from '../src/components/TimeUnit'
import ButtonPomodoro from '../src/components/ButtonPomodoro'
import Body from '../src/components/Body'
import { ProfileArea, ProfileLabel, ProfileImage } from '../src/components/ProfileArea'
import { Title, SmallTitle } from '../src/components/Misc'
import { parseCookies } from "nookies";
import { githubProvider } from '../src/config/authMethods'
import socialMediaAuth from '../src/service/auth';
import { setCookie } from "nookies";
import isNode from "detect-node"
import Favicon from "react-favicon"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//variaveis mutaveis
let status = 'study'
let itsPaused = false



export default function Home(props) {
  //cookies de login
  const image=()=>{if(props.USER_IMAGE==`https://github.com/undefined.png`){
    return 'https://avatars.githubusercontent.com/u/0?v=4'
  }else{return props.USER_IMAGE}}

  const loginLabel = props.USER_LOGED

  //pause/play button
  const [pauseLabel, setPauseLabel] = useState('pause')

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
  var b = (a = 3) ? true : false
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

  //sistema de login com GitHub
  const handleOnClick = async (provider) => {
    const res = await socialMediaAuth(provider)
    console.log(res)
    setCookie(null, "USER",res.login, {
      maxAge: 86400,
      path: "/",
    });
    window.location.reload();
  }

  if(!isNode && props.USER_IMAGE!='https://avatars.githubusercontent.com/u/0?v=4'){
    window.addEventListener('beforeunload', (event) => {
      // Cancel the event as stated by the standard.
      event.preventDefault();
  
      //Para customizar o texto, e é necessário para funcionar no Safari e Chrome, IE e Firefox anterior a versão 4
      event.returnValue = '';
  });
  }

  //local save inicio
  useEffect(() => {
    if(((totalMinutos*60)+totalSegundos)<localStorage.getItem("timer") && localStorage.getItem("timer")!=null ){
    setTotalSegundos(localStorage.getItem("timer")%60)
    setTotalMinutos((localStorage.getItem("timer")-localStorage.getItem("timer")%60)/60)}
    if (((totalMinutos*60)+totalSegundos)>=localStorage.getItem("timer")){
    localStorage.setItem("timer",(totalMinutos*60)+totalSegundos)}
  },[segundos])
  //local save fim

  //play/pause
  useEffect(() => {
    const timer = setInterval(() => {
    if (itsPaused) { setPauseLabel('play') }
    else if (!itsPaused) { setPauseLabel('pause') }
    })
  })
  //play/pause

  //html
  return (
      <Body status={status}>
      <Favicon url="https://img.icons8.com/ios/50/000000/clock--v3.png"/>
      <ProfileArea status={status}>
        <ProfileImage onClick={() => {
          if (image() == 'https://avatars.githubusercontent.com/u/0?v=4') {
            handleOnClick(githubProvider)
          }
        }} src={image()} id={'User'} />
        <ProfileLabel>{loginLabel}</ProfileLabel>
      </ProfileArea>
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
      </Body>)
}

export async function getServerSideProps(context) {
  const cookies = parseCookies(context);
  return {
    props: {
      USER_IMAGE: `https://github.com/${cookies.USER}.png`,
      USER_LOGED: cookies.USER || 'Login/Register',
    },
  };
}