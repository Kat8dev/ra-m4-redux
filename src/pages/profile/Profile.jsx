import { useSelector } from 'react-redux'
import UpdateUser from './UpdateUser'
import { Body } from '../../components/layout'
import { Container } from '../../styles'
import { Title, Text } from '../../components/atoms'
import colors from '../../styles/colors'

function UserData() {
  const user = useSelector((state) => state.user)
  return (
    <Container>
      <Title order={3} color={colors.font.base}>
        <Text as="span">Name:</Text> {user.name}
      </Title>
      <Title order={3} color={colors.font.base}>
        <Text as="span">Surname: </Text>
        {user.surnames.first} {user.surnames.second && user.surnames.second}
      </Title>
    </Container>
  )
}

function Profile() {
  return (
    <Body>
      <Container direction='row' align='center'>
        <UserData />
        <UpdateUser />
      </Container>
    </Body>
  )
}

export default Profile
