import React, { PureComponent } from 'react'
import cx from 'classnames'
import { List, Checkbox } from 'semantic-ui-react'
import DangerousHeader from '../DangerousHeader'
import { map, indexOf } from 'ramda'

import styles from './index.css'

class MultipleChoice extends PureComponent {
  render() {
    const { id, className, field, answer } = this.props
    const classes = cx(styles.className, 'ob--typeform--multiple-choice', className)
    const choices = [...field.choices, { label: '其他' }]
    let { value } = answer || {}
    const disabled = !value
    if (value && value.other) {
      value.label = '其他'
    }

    return (
      <div id={id} className={classes}>
        <DangerousHeader field={field} />
        <List>{
          map(
            choice => {
              let checked = false
              if (value && value.labels) {
                checked = indexOf(choice.label, value.labels) !== -1
              }
              if (value && value.label) {
                checked = choice.label === value.label
              }
              let label = choice.label
              if (value && value.other && checked) {
                label += `：${value.other}`
              }

              return (
                <List.Item>
                  <Checkbox label={label} disabled={disabled} checked={checked} />
                </List.Item>
              )
            },
            choices
          )
        }</List>
      </div>
    )
  }
}

export default MultipleChoice
