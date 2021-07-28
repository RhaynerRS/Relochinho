//imports inicio
import React, { useEffect, useState } from 'react'
import MainGrid from '../src/components/MainGrid'
import TimeUnit from '../src/components/TimeUnit'
import ButtonPomodoro from '../src/components/ButtonPomodoro'
import Body from '../src/components/Body'
import { ProfileArea, ProfileLabel, ProfileImage, ProfileModal, ProfileModalImage } from '../src/components/ProfileArea'
import { Title, SmallTitle } from '../src/components/Misc'
import { destroyCookie, parseCookies } from "nookies";
import { googleProvider } from '../src/config/authMethods'
import socialMediaAuth from '../src/service/auth';
import { setCookie } from "nookies";
import isNode from "detect-node"
import Favicon from "react-favicon"
import LoadingBar from 'react-top-loading-bar'
//imports fim

//variaveis mutaveis inicio
let status = 'study'
let itsPaused = false
let showModal = false
let bodyColor;
let barColor;
//variaveis mutaveis fim

export default function Home(props) {

  //variaveis inicio

  //imagem usuario
  const image = () => {
    if (props.USER_IMAGE == 'undefined') {
      return 'https://avatars.githubusercontent.com/u/0?v=4'
    } else { return props.USER_IMAGE }
  }

  //nome usuario
  const loginLabel = props.USER_LOGED.split(',')[0]

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

  //Barra de progresso do timer
  const [progresso, setProgresso] = useState(0)

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

  //tempo total
  if (totalSegundos >= 60 && status == 'study') { setTotalMinutos(totalMinutos => totalMinutos + 1); setTotalSegundos(0) }

  //contador de segundos inicio
  useEffect(() => {
    const timer = setInterval(() => {
      if (!itsPaused) {
        if (status == 'study') {
          setSegundos(segundos => segundos + 1);
          setProgresso(progresso => progresso + (100 / (25 * 60)))
        } else {
          setSegundos(segundos => (segundos - 1));
          setProgresso(progresso => progresso + (100 / (5 * 60)))
        }
      }
    }, 1000);
    return () => {
      clearInterval(timer)
    }
  }, [])
  //contador de segundos fim

  //controlador dos minutos inicio

  //count up

  if (segundos >= 60 && status == 'study') { setMinutos(minutos => minutos + 1); setSegundos(0) }

  //count down

  else if (segundos == 0 && status == 'break') { setMinutos(minutos => minutos - 1); setSegundos(59) }

  //controlador dos minutos fim

  //horario de estudo

  if (minutos == 25 && status == 'study') { status = 'break'; setProgresso(0); setSegundos(59); setMinutos(4); }

  //horario de pausa

  else if (minutos == 0 && status == 'break') { status = 'study'; setProgresso(0); setSegundos(0); setMinutos(0) }

  //padronizar os numeros
  let segundosTela = segundos
  let minutosTela = minutos
  let totalMinutosTela = totalMinutos
  let totalSegundosTela = totalSegundos

  if (totalMinutos < 10) { totalMinutosTela = '0' + totalMinutos }
  if (totalSegundos < 10) { totalSegundosTela = '0' + totalSegundos }
  if (minutos < 10) { minutosTela = "0" + minutos }
  if (segundos < 10) { segundosTela = "0" + segundos }

  //local save inicio

  useEffect(() => {
    if (((totalMinutos * 60) + totalSegundos) < localStorage.getItem("timer") && localStorage.getItem("timer") != null) {
      setTotalSegundos(localStorage.getItem("timer") % 60)
      setTotalMinutos((localStorage.getItem("timer") - localStorage.getItem("timer") % 60) / 60)
    }
    if (((totalMinutos * 60) + totalSegundos) >= localStorage.getItem("timer")) {
      localStorage.setItem("timer", (totalMinutos * 60) + totalSegundos)
    }
  }, [segundos])

  //local save fim

  //sistema de login com Google

  const handleOnClick = async (provider) => {
    const res = await socialMediaAuth(provider)

    //cadastra usuario no datoCMS
    const user = {
      username: res.name,
      useremail: res.email,
      usertimer: ((totalMinutos * 60) + totalSegundos),
      barcolor: barColor,
      bodycolor: bodyColor
    }

    fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
    })

    const data = await fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '287d4521ff52303203a3293cfef557',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        "query": `query {
        user(filter:{useremail:{eq:${JSON.stringify(res.email)}}}){
          id
          username
          usertimer
          useremail
        }
      }` })
    })
      .then((response) => response.json()) // Pega o retorno do response.json() e já retorna
      .then((respostaCompleta) => {
        return respostaCompleta.data.user
      })

    //seta o tempo total para o armazenado no datoCMS
    if (localStorage.getItem("timer") != null && data.usertimer != null) {
      localStorage.setItem("timer", data.usertimer)
    }

    //cria os cookies de usuario
    setCookie(null, "USER", [res.name, data.id], {
      maxAge: 86400,
      path: "/",
    });
    setCookie(null, "USER_IMAGE", res.picture, {
      maxAge: 86400,
      path: "/",
    });

    //recarrega a pagina apos o login
    window.location.reload();
  }

  //se o usuario estiver logado ele questiona o reload
  if (!isNode && props.USER_IMAGE != 'https://avatars.githubusercontent.com/u/0?v=4') {
    window.addEventListener('beforeunload', (event) => {

      // Cancela o reload automatico
      event.preventDefault();

      //salva o tempo total no datoCMS
      const tempoAtualizado = { id: props.USER_LOGED.split(',')[1], usertimer: ((totalMinutos * 60) + totalSegundos) }
      fetch('/api/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tempoAtualizado),

      })

      //cria os cookies da cor do site
      setCookie(null, "BAR_COLOR", barColor, {
        maxAge: 86400,
        path: "/",
      });
      setCookie(null, "BODY_COLOR", bodyColor, {
        maxAge: 86400,
        path: "/",
      });

      //Para customizar o texto, e é necessário para funcionar no Safari e Chrome, IE e Firefox anterior a versão 4
      event.returnValue = '';
    });
  }

  //play/pause
  
  useEffect(() => {
    const timer = setInterval(() => {
      if (itsPaused) { setPauseLabel('play') }
      else if (!itsPaused) { setPauseLabel('pause') }
    })
  })

  //play/pause

  //cores do site com o default sendo os valores armazenados nos cookies
  function Themes() {
    if (typeof window !== 'undefined') {
      var theme = document.getElementById("myList").value
      switch (theme) {
        case '1': barColor = '#bcc9d2'; bodyColor = '#0e2431'; break;
        case '2': barColor = '#9ba276'; bodyColor = '#2f3543'; break;
        case '3': barColor = '#f3b61f'; bodyColor = '#90bede'; break;
        case '4': barColor = '#f06469'; bodyColor = '#ffd07b'; break;
        default: barColor = props.BAR_COLOR; bodyColor = props.BODY_COLOR; break;
      }
    }
  }

  //html
  return (
    <>
      <Body color={bodyColor}>

        <LoadingBar shadow={false} color={barColor} height="100vh" progress={progresso} id="bar" />
        <Favicon url={"../src/images/undraw_time_management_30iu.png"} />
        <ProfileArea status={status} style={{ zIndex: '2147483647' }}>
          <ProfileImage onClick={() => {
            if (image() == 'https://avatars.githubusercontent.com/u/0?v=4') {
              handleOnClick(googleProvider)
            } else { showModal = true }
          }} src={image()} id={'User'} />
          <ProfileLabel>{loginLabel}</ProfileLabel>
        </ProfileArea>

        <MainGrid style={{ zIndex: '2147483647' }}>
          <TimeUnit>{minutosTela}:{segundosTela}</TimeUnit>

        </MainGrid>
        <MainGrid style={{ zIndex: '2147483647' }}>
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
        <Title style={{ zIndex: '2147483647' }}>it's {status} time</Title>
        <div onClick={() => { showModal = false }} style={{ background: 'rgba(0, 0, 0, 0.4)', width: '100%', height: '100%', position: 'absolute', zIndex: '2147483647', display: showModal ? 'flex' : 'none' }}></div>
        <ProfileModal ProfileModal style={{ zIndex: '2147483647' }} style={{ display: showModal ? 'flex' : 'none' }}>
          <ProfileModalImage src={image()} id={'User'} />
          <Title style={{ zIndex: '2147483647', margin: '0', marginBottom: '1.5em' }}>{loginLabel}</Title>
          <br />
          <SmallTitle style={{ zIndex: '2147483647', margin: '0', marginBottom: '0.8em' }}>total study time: {totalMinutosTela} : {totalSegundosTela}</SmallTitle>
          <div style={{ display: 'flex', maxHeight: '25px', justifyContent: 'center', marginBottom: '1em' }}>
            <SmallTitle style={{ zIndex: '2147483647', margin: '0', marginBottom: '2em' }}>theme: </SmallTitle>
            <select style={{ borderRadius: '10px', border: '2px solid black', padding: '2px' }} id="myList" onChange={Themes()} >
              <option value="0" selected>Themes</option>
              <option value="1">Foggy Woods</option>
              <option value="2">leafy greens</option>
              <option value="3">Sunny Day</option>
              <option value="4">Spring</option>
            </select>
          </div>
          <SmallTitle onClick={() => { destroyCookie(null, 'USER'); destroyCookie(null, 'USER_IMAGE'); localStorage.setItem('timer', 0); window.location.reload(); }} style={{ margin: '0', zIndex: '2147483647', padding: '20px 10px', border: '1px solid', borderRadius: '10px', cursor: 'pointer' }}>SAIR</SmallTitle>
        </ProfileModal>
      </Body>
    </>
  )
}

//lidando com os cookies
export async function getServerSideProps(context) {
  const cookies = parseCookies(context);
  return {
    props: {
      USER_IMAGE: cookies.USER_IMAGE || 'https://avatars.githubusercontent.com/u/0?v=4',
      USER_LOGED: cookies.USER || 'Login/Register',
      BODY_COLOR: cookies.BODY_COLOR || '#0e2431',
      BAR_COLOR: cookies.BAR_COLOR || '#bcc9d2',
    },
  };
}