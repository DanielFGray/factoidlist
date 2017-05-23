// @flow
import React, { PropTypes } from 'react'
import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import moment from 'moment'

function linkify(inputText) {
  // http://stackoverflow.com/a/3890175
  const replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gim
  let replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>')
  const replacePattern2 = /(^|[^/])(www\.[\S]+(\b|$))/gim
  replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>')
  const replacePattern3 = /(([a-zA-Z0-9\-_.])+@[a-zA-Z_]+?(\.[a-zA-Z]{2,6})+)/gim
  replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>')
  return replacedText
}

const Factoid = (props) => {
  const time = moment(props.time)
  let fact = props.fact.replace(/[\u00A0-\u9999<>&]/gim, i => `&#${i.charCodeAt(0)};`)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
  fact = linkify(fact)

  return (
    <TableRow key={props.name}>
      <TableRowColumn style={{ width: '12em' }}>
        {props.name.length > 0 ? `!${props.name}` : ''}
      </TableRowColumn>
      <TableRowColumn
        style={{
          height: 'unset',
          textOverflow: 'unset',
          whiteSpace: 'unset',
          padding: '5px',
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: fact }} />
        {props.aliases &&
          <div
            style={{
              fontSize: 'smaller',
              fontStyle: 'italic',
              marginTop: '5px',
            }}
          >
            alias{props.aliases.length > 1 && 'es'}: {props.aliases.join(', ')}
          </div>}
      </TableRowColumn>
      <TableRowColumn style={{ width: '15em', fontSize: 'smaller', textAlign: 'right' }} >
        <div>{props.nick}</div>
        <div>
          <a title={time.format('llll')}>
            {time.fromNow()}
          </a>
        </div>
      </TableRowColumn>
    </TableRow>
  )
}

Factoid.propTypes = {
  fact: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  nick: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  aliases: PropTypes.arrayOf(PropTypes.string),
}

Factoid.defaultProps = {
  aliases: [],
}

export default Factoid
