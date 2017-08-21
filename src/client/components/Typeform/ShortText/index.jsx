import React, { PureComponent } from 'react'
import cx from 'classnames'
import DangerousHeader from '../DangerousHeader'

import styles from './index.css'

class ShortText extends PureComponent {
  render() {
    const { id, className, field } = this.props
    const classes = cx(styles.className, 'one-button--typeform--short-text', className)

    return (
      <div id={id} className={classes}>
        <DangerousHeader field={field} />
      </div>
    )
  }
}

export default ShortText
