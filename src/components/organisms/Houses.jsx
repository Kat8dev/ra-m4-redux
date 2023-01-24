import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { getHouses } from '../../store/houses.slice'
import { Button } from '../atoms'
import { HouseCard } from '../molecules'
import { FlexBox, Grid } from '../../styles'

const HousesStyled = styled(FlexBox)``

const filterType = (house, type) => {
  return type.includes(house.type)
}

const filterCity = (house, city) => {
  return city.includes(house.city)
}

const fiterHouses = (house, city, type) =>
  filterType(house, type) && filterCity(house, city)

function Houses() {
  const houses = useSelector((state) => state.houses.houses)
  const reqStatus = useSelector((state) => state.houses.reqStatus)
  const dispatch = useDispatch()
  const { allIds, byId, byType, byCities } = houses
  const { isError, isSucces, isLoading } = reqStatus
  const [perPage, setPerPage] = useState(9)

  useEffect(() => {
    dispatch(getHouses())
  }, [dispatch])

  return (
    <HousesStyled>
      <Grid gridGap="32px">
        {isLoading && <div>Loading...</div>}
        {isError && <div>Error</div>}
        {isSucces &&
          allIds
            .filter((id) => fiterHouses(byId[id], byCities, byType))
            .slice(0, perPage)
            .map((id) => (
              <HouseCard
                key={byId[id].id}
                title={byId[id].title}
                price={`${byId[id].price}€`}
                img={byId[id].image}
                link=""
              />
            ))}
      </Grid>
      {perPage < allIds.length && (
        <FlexBox align="center">
          <Button
            style={{ marginTop: '2rem' }}
            onClick={() => setPerPage((prev) => prev + 9)}
          >
            Load more
          </Button>
        </FlexBox>
      )}
    </HousesStyled>
  )
}

export default styled(Houses)``
