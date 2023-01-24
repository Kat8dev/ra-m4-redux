import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FlexBox } from '../../styles'
import { InputText, Label } from '../atoms'

export function InputTextGroup({ label, id, onChange, ...rest }) {
  return (
    <FlexBox>
      <Label htmlFor={id}>{label}</Label>
      <InputText type="text" id={id} name={id} onChange={onChange} {...rest} />
    </FlexBox>
  )
}

InputTextGroup.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default styled(InputTextGroup)``
