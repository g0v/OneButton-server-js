import React, { PureComponent } from 'react'
import cx from 'classnames'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Menu, Container, Dropdown } from 'semantic-ui-react'
import { map } from 'ramda'

import styles from './index.css'

const routes = [{
  name: '問卷',
  route: '/typeform'
}]

class Header extends PureComponent {
  render() {
    const { id, className, location: { pathname = '' } = {} } = this.props
    const classes = cx(styles.className, 'ob--header', className)

    return (
      <Menu id={id} className={classes} fixed="top" inverted>
        <Container>
          <Menu.Item as={Link} header to="/">OneButton</Menu.Item>
          {
            map(
              r => {
                const actived = pathname.startsWith(r.route)
                return (
                  <Menu.Item as={Link} to={r.route}>{ r.name }</Menu.Item>
                )
              },
              routes
            )
          }
        </Container>
      </Menu>
    )
  }
}

export default withRouter(Header)
