// @flow

import React from 'react'


type Props = {
  buttonComp: Object,
  onRequestRowDelete: Function,
};

export default class DeleteFieldRowButton extends React.Component<Props> {
  constructor(props: Object) {
    super(props)

    const { buttonComp: { props: { deletefieldrow } } } = this.props
    if (deletefieldrow === undefined) {
      throw new Error('DeleteFieldRowButton element requires "deletefieldrow" prop')
    }
    if (deletefieldrow.match(/\w+\[\d\]/) === null) {
      throw new Error('"deletefieldrow" prop should match /\\w+\\[\\d+\\]/')
    }
  }

  onClick = () => {
    const {
      onRequestRowDelete,
      buttonComp: {
        props: {
          onClick,
          deletefieldrow,
        },
      },
    } = this.props

    onRequestRowDelete(deletefieldrow)
    onClick()
  }

  render() {
    const { buttonComp } = this.props
    return React.cloneElement(buttonComp, {
      onClick: this.onClick,
    })
  }
}
