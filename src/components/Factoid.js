// @flow
import React from 'react'
import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import ago from 's-ago'

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

const Factoid = ({ fact, name, nick, time, aliases = [] }: {
  fact: string,
  name: string,
  nick: string,
  time: number,
  aliases: Array<string>,
}) => {
  const date = new Date(time)
  const body = linkify(fact
    .replace(/[\u00A0-\u9999<>&]/gim, i => `&#${i.charCodeAt(0)};`)
    .replace(/`([^`]+)`/g, '<code>$1</code>'))
  return (
    <TableRow key={name}>
      <TableRowColumn style={{ width: '12em' }}>
        {name.length > 0 && `!${name}`}
      </TableRowColumn>
      <TableRowColumn
        style={{
          height: 'unset',
          textOverflow: 'unset',
          whiteSpace: 'unset',
          padding: '5px',
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: body }} />
        {aliases.length > 0 &&
          <div
            style={{
              fontSize: 'smaller',
              fontStyle: 'italic',
              marginTop: '5px',
            }}
          >
            alias{aliases.length > 1 && 'es'}: {aliases.join(', ')}
          </div>}
      </TableRowColumn>
      <TableRowColumn style={{ width: '15em', fontSize: 'smaller', textAlign: 'right' }} >
        <div>{nick}</div>
        <div>
          <a title={date.toLocaleString()}>
            {ago(date)}
          </a>
        </div>
      </TableRowColumn>
    </TableRow>
  )
}

export default Factoid
