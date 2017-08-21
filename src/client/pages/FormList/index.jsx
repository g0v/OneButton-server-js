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
    const classes = cx('one-button--form-title', className)
    const { href = '#' } = form && form._links && form._links[1] || {}

    return (
      <List.Item id={id} className={classes}>
        <List.Icon name="file text outline" size="large" verticalAlign="middle" />
        <List.Content>
          <List.Header as={Link} to={`/typeform/${form.id}`}>{ form.title }</List.Header>
          <List.Description as="a" href={href} target="_blank">{ href }</List.Description>
        </List.Content>
      </List.Item>
    )
  }
}

class FormList extends PureComponent {
  componentWillMount() {
    const { actions } = this.props

    // fetch forms
    actions.typeform.list()
      .then(map(actions.typeform.resultList))
  }

  render() {
    const { id, className, typeform } = this.props
    const classes = cx(styles.className, 'one-button--form-list', className)

    return (
      <List id={id} className={classes} divided relaxed>{
        map(
          uid => <FormTitle form={typeform.results[uid]} />,
          typeform.list
        )
      }</List>
    )
  }
}

export default withRouter(connect(
  state => {
    const { typeform } = state
    return { typeform }
  },
  dispatch => ({ actions: func.map(dispatch, actions) })
)(FormList))
