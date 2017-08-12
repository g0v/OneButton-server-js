import React, { PureComponent } from 'react'
import cx from 'classnames'
import { Rating as FabricRating } from 'office-ui-fabric-react/lib/Rating'

import styles from './index.css'

class Rating extends PureComponent {
  render() {
    const { id, className, field } = this.props
    const classes = cx(styles.className, 'one-button--typeform--rating', className)

    return (
      <div id={id} className={classes}>
        <div>{ field.question }</div>
        <div>{ field.description }</div>
        <FabricRating
          min={1}
          max={field.steps - 1}
          rating={null}
        />
      </div>
    )
  }
}

export default Rating
