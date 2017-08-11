import React, { PureComponent } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as actions from '~/actions'
import * as func from '~/types/func'
import { Nav } from 'office-ui-fabric-react/lib/Nav'

import styles from './index.css'

class MainNav extends PureComponent {
  render() {
    const { id, className, history } = this.props
    const classes = cx('one-button--main-nav', className)

    return (
      <Nav id={id} className={classes}
        onLinkClick={(e, link) => {
          e.preventDefault()
          history.push(link.url)
        }}
        groups={[{
          links: [{ name: 'typeform', key: 'typeform', url: '/typeform' }]
        }]}
      />
    )
  }
}

export default withRouter(connect(
  state => ({}),
  dispatch => ({ actions: func.map(dispatch, actions) })
)(MainNav))
