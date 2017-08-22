import React, { PureComponent } from 'react'
import cx from 'classnames'
import { Rating as SRating } from 'semantic-ui-react'
import DangerousHeader from '../DangerousHeader'

import styles from './index.css'

class Rating extends PureComponent {
  render() {
    const { id, className, field, answer } = this.props
    const classes = cx(styles.className, 'ob--typeform--rating', className)
    const { value } = answer || {}
    const disabled = !value

    return (
      <div id={id} className={classes}>
        <DangerousHeader field={field} />
        <SRating
          maxRating={field.steps}
          rating={value && value.amount}
          disabled={disabled}
        />
      </div>
    )
  }
}

export default Rating
