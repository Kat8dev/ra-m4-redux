import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { getHouses } from '../../store/houses.slice'
import { Button } from '../atoms'
import { HouseCard } from '../molecules'
import { FlexBox, Grid } from '../../styles'

const HousesStyled = styled(FlexBox)``

function Houses() {
  const houses = useSelector((state) => state.houses.houses)
  const reqStatus = useSelector((state) => state.houses.reqStatus)
  const dispatch = useDispatch()
  const { allIds, byId, byType, byCities } = houses
  const { isError, isSucces, isLoading } = reqStatus
  const [currentState, setCurrentState] = useState(allIds)
  const [perPage, setPerPage] = useState(9)

  useEffect(() => {
    dispatch(getHouses())
  }, [dispatch])

  useEffect(() => {
    const actualState = () => {
      const auxArray = []
      for (let house in byId) {
        for (let type in byType) {
          if (byId[house].type === byType[type]) {
            for (let city in byCities) {
              if (byCities[city] === byId[house].city) {
                if (!auxArray.includes(byId[house])) {
                  auxArray.push(byId[house])
                }
              }
            }
          }
        }
      }
      const getCurrentIds = auxArray.map((house) => house.id)
      setCurrentState(getCurrentIds)
    }
    actualState()
  }, [byId, byType, byCities])

  return (
    <HousesStyled>
      <Grid gridGap="32px">
        {isLoading && <div>Loading...</div>}
        {isError && <div>Error</div>}
        {isSucces && currentState.slice(0, perPage).map((id) => (
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


