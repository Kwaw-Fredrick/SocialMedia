'use client'

import { Theme } from '@ant-design/cssinjs';
import React from 'react'

const Box = ({children, type="boxBg", style, ...others}) => {
  const {token} = Theme();

  return (
    <div
    {...others} 
    style={{
        backgroundColor: token[type],
        boxShadow: "box-shadow: 0px 4px 10px 1px rgba(0, 0, 0, 0.03)",
        ...style
    }}
    >{children}</div>
  )
}

export default Box