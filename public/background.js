var opt = {
  type: 'basic',
  title: 'There was a transaction',
  message: 'Primary message to display',
  iconUrl: '/media/128.png',
  requireInteraction: true,
  priority: 2
}

let user = localStorage.getItem('user') || null
let password = localStorage.getItem('password') || null

let interval = () => {
  try {
    console.log('ran interval')
    let currentBalance = localStorage.getItem('balance')
    let xhr = new XMLHttpRequest()
    xhr.open('POST', 'https://banpro-api.herokuapp.com/graphql')
    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.onerror = (e) => console.log(e)
    xhr.onload = () => {
      let data = JSON.parse(xhr.response)
      let balance = data.data.requestBalance.amount
      if (Number(currentBalance) > Number(balance)) {
        let option = opt;
        option.title = "Funds were withdrawn from your account"
        option.message = `The amount used was \$${(Number(currentBalance) - Number(balance)).toFixed(2)}`
        chrome.notifications.create(`withdrawal-${balance.replace(/./g, '')}`, option)
        localStorage.setItem('balance', balance)
      } else if (Number(currentBalance) < Number(balance)) {
        let option = opt;
        option.title = "Funds were deposited to your account"
        option.message = `The amount deposited was \$${(Number(balance) - Number(currentBalance)).toFixed(2)}`
        chrome.notifications.create(`deposit-${balance.replace(/./g, '')}`, option)
        localStorage.setItem('balance', balance)
      } else {
        localStorage.setItem('balance', balance)
      }
    }
    xhr.send(JSON.stringify({ 'query': '{ requestBalance(username: "alfonsogomez", password:"queque16") { amount }  }' }))
  } catch (e) {
    console.log(e)
  }
}

if (user && password) {
  interval()
  setInterval(() => {
    interval()
  }, 60000)
}
