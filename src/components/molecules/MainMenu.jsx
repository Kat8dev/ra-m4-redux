import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { main } from '../../constants'
import { colors } from '../../styles'

const MainMenuStyled = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  li {
    margin-left: 1rem;
    a {
      text-decoration: 0;
      color: ${colors.font.headings};
      &:active {
        color: ${colors.blue};
      }
    }
    &:first-child {
      margin-left: 0;
    }
  }
`

const Links = styled(NavLink)`
  &.active {   
    color: ${({color}) => color || `${colors.purple}`};
    font-weight: ${({fw}) => fw || '400'}
  }
}
`

function MainMenu() {
  return (
    <MainMenuStyled>
      {Object.values(main).map(({ path, label }) => (
        <li key={path}>
          {label === 'Datos' ? (
            <Links to={path} color={colors.font.headings} fw='700'>{label}</Links>
          ) : (
            <Links to={path}>{label}</Links>
          )}
        </li>
      ))}
    </MainMenuStyled>
  )
}

export default styled(MainMenu)``

