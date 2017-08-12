import React, { PureComponent } from 'react'
import cx from 'classnames'
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup'

import styles from './index.css'

class YesNo extends PureComponent {
  render() {
    const { id, className, field } = this.props
    const classes = cx(styles.className, 'one-button--typeform--yes-no', className)

    return (
      <div id={id} className={classes}>
        <div>{ field.question }</div>
        <div>{ field.description }</div>
        <ChoiceGroup
          options={[
            {
              key: 'yes',
              text: '是',
              disabled: true
            },
            {
              key: 'no',
              text: '否',
              disabled: true
            }
          ]}
          required={field.required}
        />
      </div>
    )
  }
}

export default YesNo
