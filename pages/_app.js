import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { Helmet } from 'react-helmet'
import Favicon from "react-favicon"
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`

const theme = {
  colors: {
    primary: '#0070f3',
  },
}

export default function App({ Component, pageProps }) {
  return (
    <>
    <Favicon url="/clock.png" />
    <Helmet>
      <title>Relochinho - a_pomodoro_timer_to_study</title>
    </Helmet>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
