import React, { PureComponent } from 'react'
import cx from 'classnames'
import { List, Checkbox } from 'semantic-ui-react'
import DangerousHeader from '../DangerousHeader'

import styles from './index.css'

class YesNo extends PureComponent {
  render() {
    const { id, className, field } = this.props
    const classes = cx(styles.className, 'one-button--typeform--yes-no', className)

    return (
      <div id={id} className={classes}>
        <DangerousHeader field={field} />
        <List>
          <List.Item><Checkbox label="是" disabled /></List.Item>
          <List.Item><Checkbox label="否" disabled /></List.Item>
        </List>
      </div>
    )
  }
}

export default YesNo
