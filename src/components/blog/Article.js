import React, { Component } from "react"
import PropTypes from "prop-types"

export default class Article extends Component {
  static propTypes = {
    loader: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      content: null,
      error: null
    }
  }

  componentDidMount() {
    if (!this.state.content)
      this.props.loader()
        .then((content) => {
          return this.setState({ content })
        })
        .catch((error) => {
          this.setState({ error })
        })
  }

  render() {
    const { content } = this.state

    if (!content) {
      return null
    }

    return (
      // eslint-disable-next-line react/no-danger
      <div dangerouslySetInnerHTML={{ __html: content }} />
    )
  }
}
