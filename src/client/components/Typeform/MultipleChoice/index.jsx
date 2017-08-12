import React, { PureComponent } from 'react'
import cx from 'classnames'
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup'
import { map } from 'ramda'

import styles from './index.css'

class MultipleChoice extends PureComponent {
  render() {
    const { id, className, field } = this.props
    const classes = cx(styles.className, 'one-button--typeform--multiple-choice', className)

    return (
      <div id={id} className={classes}>
        <div>{ field.question }</div>
        <div>{ field.description }</div>
        <ChoiceGroup
          options={map(
            choice => ({ key: choice.label, text: choice.label, disabled: true }),
            field.choices
          )}
          required={field.required}
        />
      </div>
    )
  }
}

export default MultipleChoice
