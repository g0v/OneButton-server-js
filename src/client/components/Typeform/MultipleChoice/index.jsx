import React, { PureComponent } from 'react'
import cx from 'classnames'
import { List, Checkbox } from 'semantic-ui-react'
import DangerousHeader from '../DangerousHeader'
import { map } from 'ramda'

import styles from './index.css'

class MultipleChoice extends PureComponent {
  render() {
    const { id, className, field } = this.props
    const classes = cx(styles.className, 'ob--typeform--multiple-choice', className)

    return (
      <div id={id} className={classes}>
        <DangerousHeader field={field} />
        <List>{
          map(
            choice => <List.Item><Checkbox label={choice.label} disabled /></List.Item>,
            field.choices
          )
        }</List>
      </div>
    )
  }
}

export default MultipleChoice
