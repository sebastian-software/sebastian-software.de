/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react"
import PropTypes from "prop-types"

export default class Image extends Component {
  constructor(props) {
    super(props)

    this.state = {
      imageSrc: props.trace || props.src
    }
  }

  componentDidMount() {
    console.log("IMAGE IS MOUNTED")

    setTimeout(() => {
      this.setState({
        imageSrc: this.props.src
      })
    }, 1000)
  }

  render() {
    const props = {
      src: this.state.imageSrc,
      alt: this.props.alt
    }
    if (this.props.className)
      props.className = this.props.className

    return (
      <img {...props} />
    )
  }
}

Image.defaultProps = {
  className: ""
}
Image.propTypes = {
  src: PropTypes.string.isRequired,
  trace: PropTypes.string,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string
}
