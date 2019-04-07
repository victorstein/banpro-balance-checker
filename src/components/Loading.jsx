import React from 'react'
import { Row, Col, Spinner } from 'reactstrap'
import Fader from './Fader'
import './style/loading.css'

export default () => (
  <Row className='h-100 w-100 d-flex align-items-center position-absolute loading-background'>
    <Col>
      <Fader>
        <Spinner type='grow' style={{ width: '10rem', height: '10rem' }} color='light' className='d-block mx-auto' />
      </Fader>
    </Col>
  </Row>
)
