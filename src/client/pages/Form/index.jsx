import React, { PureComponent } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Header, Divider, Dropdown } from 'semantic-ui-react'
import * as actions from '~/actions'
import * as func from '~/types/func'
import * as F from '~/types/typeform/form'
import * as R from '~/types/typeform/result'
import LongText from '~/components/Typeform/LongText'
import MultipleChoice from '~/components/Typeform/MultipleChoice'
import OpinionScale from '~/components/Typeform/OpinionScale'
import Rating from '~/components/Typeform/Rating'
import ShortText from '~/components/Typeform/ShortText'
import YesNo from '~/components/Typeform/YesNo'
import { map, intersperse, find, propEq } from 'ramda'

import styles from './index.css'

const renderField = (field, answer) => {
  switch (field.type) {
    case 'long_text':
      return <LongText field={field} answer={answer} />
    case 'multiple_choice':
      return <MultipleChoice field={field} answer={answer} />
    case 'opinion_scale':
      return <OpinionScale field={field} answer={answer} />
    case 'rating':
      return <Rating field={field} answer={answer} />
    case 'short_text':
      return <ShortText field={field} answer={answer} />
    case 'yes_no':
      return <YesNo field={field} answer={answer} />
    default:
      return <div>unknown field</div>
  }
}

const idToOption = (id) => ({ text: id, value: id })
const findAnswer = (id, answers) => find(propEq('field_id', id), answers)

const renderFields = (fields, answers) => {
  let es = []

  for (const field of fields) {
    es.push(renderField(field, findAnswer(field.id, answers)))
  }
  es = intersperse(<Divider hidden />, es)

  return es
}

class Form extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { token: null }
  }

  render() {
    const { id, className, form = F.empty } = this.props
    const { token } = this.state
    const classes = cx(styles.className, 'ob--form', className)
    const { results } = form
    const result = results.list[token] || R.empty
    const placeholder = results.ids.length === 0 ? '還沒有結果' : '選一個問卷結果'
    const options = map(idToOption, results.ids)
    const handleChange = (e, { value: token }) => this.setState({ token })

    return (
      <div id={id} className={classes}>
        <Dropdown
          fluid selection
          placeholder={placeholder}
          options={options}
          value={token}
          onChange={handleChange}
        />
        <Divider />
        <Header as="h1">{ form.title }</Header>
        <div>{ renderFields(form.fields, result.answers) }</div>
        <Divider />
        <Dropdown
          fluid selection
          placeholder={placeholder}
          options={options}
          value={token}
          onChange={handleChange}
        />
      </div>
    )
  }
}

export default withRouter(connect(
  (state, { match }) => {
    const { list } = state.forms
    const form = list[match.params.uid]
    return { form }
  },
  dispatch => ({ actions: func.map(dispatch, actions) })
)(Form))
