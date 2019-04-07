import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Row, Col, Spinner, Card, CardBody, Container, Button } from 'reactstrap'
import Fader from './Fader'
import './style/login.css'

const BALANCE = gql`
  query GetBalance(
    $username: String!
    $password: String!
  ){
    requestBalance(
      username: $username
      password: $password
    ) {
      amount
      description
      owner
      accountNumber
    }
  }
`

export default class Dashboard extends React.Component {

  logout () {
    localStorage.clear()
    this.props.history.push('/')
  }

  render () {
    const username = localStorage.getItem('user')
    const password = localStorage.getItem('password')

    return (
      <Row className='h-100 d-flex align-items-center loading-background'>
        <Col>
          <Fader>
            <Card style={{ backgroundColor: 'rgba(255,255,255,0.7)' }}>
              <CardBody>
                <Container>
                  <Row>
                    <Col className='d-flex justify-content-end'>
                      <Button
                        style={{ color: 'white', opacity: '0.8' }}
                        color='primary'
                        onClick={() => this.logout()}
                      >
                        Logout
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col className='d-flex justify-content-center'>
                      <img src='media/128.png' alt='banpro.png' />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Query query={BALANCE} variables={{ username, password }}>
                        {({ loading, data, error }) => {
                          if (loading) {
                            return (
                              <Spinner
                                style={{ width: '5rem', height: '5rem', margin: '3rem auto', display: 'block' }}
                                type='grow'
                                color='primary'
                              />
                            )
                          }
                          if (error) {
                            console.log(error)
                            return <p>There was an error retreiving data from the server. Try again later</p>
                          }
                          if (data) {
                            let { owner, amount, description, accountNumber } = data.requestBalance
                            return (
                              <Fader>
                                <Row className='my-4'>
                                  <Col>
                                    <h6 style={{ textTransform: 'capitalize', textAlign: 'center' }}>Hello, {owner.toLowerCase()}</h6>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col xs={6}>
                                    <h6 className='text-left'>Acc. Number:</h6>
                                  </Col>
                                  <Col xs={6}>
                                    <h6 className='text-left'>{accountNumber}</h6>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col xs={6}>
                                    <h6 className='text-left'>Description:</h6>
                                  </Col>
                                  <Col xs={6}>
                                    <h6 className='text-left'>{description}</h6>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col xs={6}>
                                    <h6 className='text-left'>Balance:</h6>
                                  </Col>
                                  <Col xs={6}>
                                    <h6 className='text-left'>$ {amount}</h6>
                                  </Col>
                                </Row>
                              </Fader>
                            )
                          }
                        }}
                      </Query>
                    </Col>
                  </Row>
                </Container>
              </CardBody>
            </Card>
          </Fader>
        </Col>
      </Row>
    )
  }
}