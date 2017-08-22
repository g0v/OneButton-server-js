import React, { PureComponent } from 'react'
import cx from 'classnames'
import DangerousHeader from '../DangerousHeader'

import styles from './index.css'

class LongText extends PureComponent {
  render() {
    const { id, className, field, answer } = this.props
    const classes = cx(styles.className, 'ob--typeform--long-text', className)
    const { value } = answer || {}

    return (
      <div id={id} className={classes}>
        <DangerousHeader field={field} />
        { value && <span className={styles.answer}>{ value }</span> }
      </div>
    )
  }
}

export default LongText
