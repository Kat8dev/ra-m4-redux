import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import {
  updateName,
  updateFirstSurname,
  updateSecondSurname,
} from '../../store/user.slice'
import { Container } from '../../styles'
import { Button } from '../../components/atoms'
import { InputTextGroup } from '../../components/molecules'

const UpdateUserStyled = styled(Container)`
    ${InputTextGroup} {
        margin: 0.5rem 0;
    }
`

function UpdateUser() {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({ ...user })

  const handleUpdate = (e) => {
    e.preventDefault()
    dispatch(updateName(formData.name))
    dispatch(updateFirstSurname(formData.surnames.first))
    dispatch(updateSecondSurname(formData.surnames.second))
    setFormData({name: '', surnames: {first: '', second: ''}})
  }

  return (
    <UpdateUserStyled as="form">
      <InputTextGroup
        value={formData.name}
        label="Introduce name:"
        id="username"
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            name: e.target.value,
          }))
        }
      />
      <InputTextGroup
        value={formData.surnames.first}
        label="Introduce first surname:"
        id="firstSurname"
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            surnames: {
              ...prev.surnames,
              first: e.target.value,
            },
          }))
        }
      />
      <InputTextGroup
        value={formData.surnames.second}
        label="Introduce second surname:"
        id="secondSurname"
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            surnames: {
              ...prev.surnames,
              second: e.target.value,
            },
          }))
        }
      />
      <Button type="submit" onClick={handleUpdate}>
        Update
      </Button>
    </UpdateUserStyled>
  )
}

export default UpdateUser

