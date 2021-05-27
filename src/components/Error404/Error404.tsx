import React from 'react'
import s from './Error404.module.css'

export const Error404 = () => {
  return (
    <div className={s.container}>
      <div className={s.number}>404</div>
      <div className={s.text}>Page not found!</div>
      <div className={s.smile}>—ฅ/ᐠ.̫ .ᐟ\ฅ—</div>
    </div>
  )
}

