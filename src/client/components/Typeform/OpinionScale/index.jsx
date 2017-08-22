import React, { PureComponent } from 'react'
import cx from 'classnames'
import { Rating } from 'semantic-ui-react'
import DangerousHeader from '../DangerousHeader'

import styles from './index.css'

class OpinionScale extends PureComponent {
  render() {
    const { id, className, field, answer } = this.props
    const classes = cx(styles.className, 'ob--typeform--opinion-scale', className)
    const { value } = answer || {}
    const disabled = !value

    return (
      <div id={id} className={classes}>
        <DangerousHeader field={field} />
        <div>
          <span className="left">{ field.labels.left }</span>
          <Rating
            maxRating={field.steps - 1}
            rating={value && value.amount}
            disabled={disabled}
          />
          <span className="right">{ field.labels.right }</span>
        </div>
      </div>
    )
  }
}

export default OpinionScale
