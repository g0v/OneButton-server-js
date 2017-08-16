import React, { PureComponent } from 'react'
import cx from 'classnames'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { map } from 'ramda'

import styles from './index.css'

const routes = [{
  name: '問卷',
  route: '/typeform'
}]

class Header extends PureComponent {
  render() {
    const { id, className, location: { pathname = '' } = {} } = this.props
    const classes = cx(styles.className, 'one-button--header', className)

    return (
      <div id={id} className={classes}>
        <Link className={cx(styles.unit, styles.logo)} to="/">OneButton</Link>
        <ul>{
          map(
            r => {
              const actived = pathname.startsWith(r.route)
              return (
                <li><Link className={cx(styles.unit, { actived })} to={r.route}>
                  { r.name }
                </Link></li>
              )
            },
            routes
          )
        }</ul>
      </div>
    )
  }
}

export default withRouter(Header)
