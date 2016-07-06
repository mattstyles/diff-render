
const blessed = require('blessed')
const h = require('react-hyperscript')
const {render} = require('react-blessed')
const {Component} = require('react')
const data = require('./data.json')

const screen = blessed.screen({
  title: 'todo',
  debug: true,
  log: './debug.log'
})

class List extends Component {
  componentDidMount () {
    screen.debug('mounting')
    this.refs.list.select(this.props.index)
  }

  render () {
    let {items} = this.props
    return h('list', {
      ref: 'list',
      top: 0,
      left: 0,
      width: 40,
      height: 20,
      border: {
        type: 'line'
      },
      style: {
        border: {
          fg: 'white'
        },
        item: {
          fg: 'auto',
          bg: 'black'
        },
        selected: {
          fg: 'auto',
          bg: 'grey'
        }
      },
      items: items
    })
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

screen.on('keypress', function (ch, key) {
  if (['escape', 'q', 'C-c'].includes(key.name)) {
    process.exit(0)
  }

  if (key.full === 'up') {
    model.index--
  }

  if (key.full === 'down') {
    model.index++
  }

  screen.debug(model)

  main()
})

function main () {
  render(h(App, {
    model: model
  }), screen)
}

main()
