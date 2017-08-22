import React, { PureComponent } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { List } from 'semantic-ui-react'
import * as actions from '~/actions'
import * as func from '~/types/func'
import * as F from '~/types/typeform/form'
import { map } from 'ramda'

import styles from './index.css'

class FormTitle extends PureComponent {
  render() {
    const { id, className, form = F.empty } = this.props
    const classes = cx('ob--form-title', className)
    const { results, _links } = form
    const { href = '#' } = _links && _links[1] || {}

    return (
      <List.Item id={id} className={classes}>
        <List.Icon name="file text outline" size="large" verticalAlign="middle" />
        <List.Content>
          <List.Header as={Link} to={`/typeform/${form.id}`}>
            <span>{ form.title }</span>
            &nbsp;
            <span>{ results.ids.length === 0 ? '(還沒有結果)' : `( ${results.ids.length} 個結果)` }</span>
          </List.Header>
          <List.Description as="a" href={href} target="_blank">{ href }</List.Description>
        </List.Content>
      </List.Item>
    )
  }
}

class FormList extends PureComponent {
  render() {
    const { id, className, forms } = this.props
    const classes = cx(styles.className, 'ob--form-list', className)

    return (
      <List id={id} className={classes} divided relaxed>{
        map(
          uid => <FormTitle form={forms.list[uid]} />,
          forms.ids
        )
      }</List>
    )
  }
}

export default withRouter(connect(
  state => {
    const { forms } = state
    return { forms }
  },
  dispatch => ({ actions: func.map(dispatch, actions) })
)(FormList))
