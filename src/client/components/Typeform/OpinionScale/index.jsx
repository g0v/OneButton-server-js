import React, { PureComponent } from 'react'
import cx from 'classnames'
import { Rating } from 'office-ui-fabric-react/lib/Rating'

import styles from './index.css'

class OpinionScale extends PureComponent {
  render() {
    const { id, className, field } = this.props
    const classes = cx(styles.className, 'one-button--typeform--opinion-scale', className)

    return (
      <div id={id} className={classes}>
        <div>{ field.question }</div>
        <div>{ field.description }</div>
        <div>
          <span className="left">{ field.labels.left }</span>
          <Rating
            min={1}
            max={field.steps - 1}
            rating={null}
          />
          <span className="right">{ field.labels.right }</span>
        </div>
      </div>
    )
  }
}

export default OpinionScale
