
const h = require('react-hyperscript')
const {Component} = require('react')
const {render} = require('react-dom')
const data = require('./data.json')

class List extends Component {
  componentDidMount () {
    console.log('mounting')
  }

  render () {
    let {index} = this.props
    let items = this.props.items.map((item, idx) => {
      return h('li', {
        style: {
          color: idx === index ? '#C12127' : '#444'
        }
      }, item)
    })

    return h('ul', items)
  }
}

const App = props => {
  return h(List, {
    items: props.model.items,
    index: props.model.index
  })
}

let model = {
  items: data.map(item => item.name),
  index: 0
}

document.body.addEventListener('keydown', event => {
  if (event.keyCode === 38) {
    model.index--
  }

  if (event.keyCode === 40) {
    model.index++
  }

  main()
})

var body = document.createElement('div')
document.body.appendChild(body)

function main () {
  render(h(App, {
    model: model
  }), body)
}

main()
