import React, { PureComponent } from 'react'
import cx from 'classnames'
import { List, Checkbox } from 'semantic-ui-react'
import DangerousHeader from '../DangerousHeader'

import styles from './index.css'

class YesNo extends PureComponent {
  render() {
    const { id, className, field, answer } = this.props
    const classes = cx(styles.className, 'ob--typeform--yes-no', className)
    const { value } = answer || {}
    const disabled = value === undefined

    return (
      <div id={id} className={classes}>
        <DangerousHeader field={field} />
        <List>
          <List.Item>
            <Checkbox label="是" disabled={disabled} checked={value === true} />
          </List.Item>
          <List.Item>
            <Checkbox label="否" disabled={disabled} checked={value === false} />
          </List.Item>
        </List>
      </div>
    )
  }
}

export default YesNo
