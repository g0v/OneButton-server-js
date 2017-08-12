import React, { PureComponent } from 'react'
import cx from 'classnames'

import styles from './index.css'

class ShortText extends PureComponent {
  render() {
    const { id, className, field } = this.props
    const classes = cx(styles.className, 'one-button--typeform--short-text', className)

    return (
      <div id={id} className={classes}>
        <div>{ field.question }</div>
        <div>{ field.description }</div>
      </div>
    )
  }
}

export default ShortText
