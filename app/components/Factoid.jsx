import React, { PropTypes } from 'react';
import { TableRow
       , TableRowColumn } from 'material-ui/Table';
import marked from 'marked';
import moment from 'moment';

marked.setOptions(
  { renderer: new marked.Renderer()
  , gfm: true
  , tables: false
  , breaks: false
  , pedantic: true
  , sanitize: true
  , smartLists: false
  , smartypants: false
  }
);

export default function Factoid(props) {
  const time = moment(props.time);
  return (
    <TableRow key={props.name}>
      <TableRowColumn style={{ width: '12em' }}>
        {props.name.length > 0 ? `!${props.name}` : ''}
      </TableRowColumn>
      <TableRowColumn
        dangerouslySetInnerHTML={{ __html: marked(props.fact) }}
        style={{ height: 'unset'
               , textOverflow: 'unset'
               , whiteSpace: 'unset'
               }}
      />
      <TableRowColumn style={{ width: '12em', fontSize: 'smaller', textAlign: 'right' }} >
        <div>{props.nick}</div>
        <div>
          <a title={time.format('llll')}>
            {time.fromNow()}
          </a>
        </div>
      </TableRowColumn>
    </TableRow>
  );
}

Factoid.propTypes =
  { fact: PropTypes.string
  , name: PropTypes.string
  , nick: PropTypes.string
  , time: PropTypes.number
  };
