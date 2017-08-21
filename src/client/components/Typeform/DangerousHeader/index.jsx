import React, { PureComponent } from 'react'
import cx from 'classnames'
import { Header } from 'semantic-ui-react'

class DangerousHeader extends PureComponent {
  render() {
    const { id, className, field = {} } = this.props
    const classes = cx('ob--typeform--dangerous-header', className)
    const { question = '', description = '' } = field

    return (
      <Header id={id} className={classes}>
        <span dangerouslySetInnerHTML={{ __html: question }} />
        <Header.Subheader>
          <span dangerouslySetInnerHTML={{ __html: description }} />
        </Header.Subheader>
      </Header>
    )
  }
}

export default DangerousHeader
