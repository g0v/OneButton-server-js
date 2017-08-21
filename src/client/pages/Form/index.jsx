import React, { PureComponent } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Header, Divider } from 'semantic-ui-react'
import * as actions from '~/actions'
import * as func from '~/types/func'
import * as F from '~/types/typeform/form'
import LongText from '~/components/Typeform/LongText'
import MultipleChoice from '~/components/Typeform/MultipleChoice'
import OpinionScale from '~/components/Typeform/OpinionScale'
import Rating from '~/components/Typeform/Rating'
import ShortText from '~/components/Typeform/ShortText'
import YesNo from '~/components/Typeform/YesNo'
import { compose, map, intersperse } from 'ramda'

import styles from './index.css'

const renderField = (field) => {
  switch (field.type) {
    case 'long_text':
      return <LongText field={field} />
    case 'multiple_choice':
      return <MultipleChoice field={field} />
    case 'opinion_scale':
      return <OpinionScale field={field} />
    case 'rating':
      return <Rating field={field} />
    case 'short_text':
      return <ShortText field={field} />
    case 'yes_no':
      return <YesNo field={field} />
    default:
      return <div>unknown field</div>
  }
}

const renderFields = compose(
  intersperse(<Divider hidden />),
  map(renderField)
)

class Form extends PureComponent {
  render() {
    const { id, className, form = F.empty } = this.props
    const classes = cx(styles.className, 'one-button--form', className)

    return (
      <div id={id} className={classes}>
        <Header as="h1">{ form.title }</Header>
        <div>{ renderFields(form.fields) }</div>
      </div>
    )
  }
}

export default withRouter(connect(
  (state, { match }) => {
    const { results } = state.typeform
    const form = results[match.params.uid]
    return { form }
  },
  dispatch => ({ actions: func.map(dispatch, actions) })
)(Form))
