import React from 'react'
import { IRouteComponentProps } from 'umi'

export default function Welcome(props:IRouteComponentProps ) {
  console.log(props)
  return (
    <div>
      <h1>Welcome this is Site</h1>
      </div>
  )
}
