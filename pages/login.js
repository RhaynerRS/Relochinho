import React from 'react';
import {githubProvider} from '../src/config/authMethods'
import socialMediaAuth from '../src/service/auth';

export default function loginFoda(){
  const handleOnClick= async (provider)=>{
    const res = await socialMediaAuth(provider)
    console.log(res)
  }

  return(
  <button onClick={()=>handleOnClick(githubProvider)}>GitHub Login</button>
  )
}