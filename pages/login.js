import React, { useEffect } from 'react'
import { useState } from 'react';
import {githubProvider} from '../src/config/authMethods'
import socialMediaAuth from '../src/service/auth';
import { setCookie } from "nookies";

export default function login(){
    const handleOnClick= async (provider)=>{
      const res = await socialMediaAuth(provider)
      setCookie(null, "USER_IMAGE", res.photoURL, {
        maxAge: 86400,
        path: "/",
      });
    }

  return(
  <button onClick={()=>handleOnClick(githubProvider)}>GitHub Login</button>
  )
}