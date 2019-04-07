import React from 'react'
import { Row, Col, Input, Button, Card, CardBody, Spinner, Toast, ToastBody } from 'reactstrap'
import Loading from './Loading'
import Fader from './Fader'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import './style/login.css'

const LOGIN = gql`
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

class Login extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      user: '',
      password: '',
      loadingLogin: false,
      error: null
    }
  }

  componentDidMount () {
    let user = localStorage.getItem('user')
    let password = localStorage.getItem('password')

    if (user && password) {
      setTimeout(_ => this.props.history.push('/dashboard'), 1000)
    } else {
      setTimeout(_ => this.setState({ loading: false }), 1000)
    }
  }

  async inputOnChange (e) {
    let { value, name } = e.target
    await this.setState({ [name]: value, error: null })
    if (this.state[name].length) {
      this.setState({ [`${name}Valid`]: true })
      this.setState({ [`${name}Invalid`]: false })
    } else {
      this.setState({ [`${name}Invalid`]: true })
      this.setState({ [`${name}Valid`]: false })
    }
  }

  onKeyDown (e) {
    if (e.key.toLowerCase() === 'enter') {
      this.onSubmit()
    } else {
      return e
    }
  }

  successLogin () {
    this.setState({ error: null })
    localStorage.setItem('user', this.state.user)
    localStorage.setItem('password', this.state.password)
    this.props.history.push('/dashboard')
  }

  async onSubmit () {
    this.setState({ loadingLogin: true })
    let { user, password } = this.state
    if (user.length && password.length) {
      try {
        await this.props.client.query({
          query: LOGIN,
          variables: {
            username: user,
            password
          }
        })
        this.successLogin()
      } catch (e) {
        console.log(e)
        let errors = (e.graphQLErrors.map(u => u.message)).toString()
        this.setState({ error: errors, loadingLogin: false })
      }
    } else {
      this.setState({ error: 'Username and password are required', loading: false })
    }
  }

  render () {
    return (
      <React.Fragment>
        {
          this.state.loading
            ? <Loading />
            : <Row className='h-100 d-flex align-items-center loading-background'>
              <Col>
                {
                  this.state.error
                    ? <Fader>
                      <Toast style={{ margin: '0 auto', textAlign: 'center' }}>
                        <ToastBody>
                          <span style={{ color: 'red' }}>{this.state.error}</span>
                        </ToastBody>
                      </Toast>
                    </Fader>
                    : null
                }
                <Fader>
                  <Card>
                    <CardBody>
                      <Row className='mb-4'>
                        <Col>
                          <img className='header-img' src='media/Banpro.png' alt='banpro-big.png' />
                        </Col>
                      </Row>
                      <Row className='my-4'>
                        <Col>
                          <Input
                            type='text'
                            placeholder='Usuario'
                            onKeyDown={(e) => this.onKeyDown(e)}
                            valid={this.state.userValid}
                            invalid={this.state.userInvalid}
                            value={this.state.user}
                            name='user'
                            onChange={(e) => this.inputOnChange(e)}
                          />
                        </Col>
                      </Row>
                      <Row className='my-4'>
                        <Col>
                          <Input
                            type='password'
                            onKeyDown={(e) => this.onKeyDown(e)}
                            placeholder='Contraseña'
                            valid={this.state.passwordValid}
                            invalid={this.state.passwordInvalid}
                            value={this.state.password}
                            name='password'
                            onChange={(e) => this.inputOnChange(e)}
                          />
                        </Col>
                      </Row>
                      <Row className='my-4'>
                        <Col>
                          <Button
                            type='password'
                            placeholder='Contraseña'
                            color='secondary'
                            block
                            style={{ color: 'white' }}
                            onClick={() => this.onSubmit()}
                            disabled={this.state.loadingLogin}
                          >
                            {
                              this.state.loadingLogin
                                ? <Spinner color='ligth' />
                                : 'Iniciar Sesion'
                            }
                          </Button>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Fader>
              </Col>
            </Row>
        }
      </React.Fragment>
    )
  }
}

export default withApollo(Login)
