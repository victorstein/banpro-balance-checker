import React from 'react'
import './style/fader.css'

export default (props) => {

  const [fader, setFader] = React.useState(false);

  React.useEffect(() => {
    setTimeout(_ => setFader(true), 100)
  }, [])

  return (
    <div className={fader ? 'fader-component-show' : 'fader-component'}>
      {
        props.children
      }
    </div>
  )
}
