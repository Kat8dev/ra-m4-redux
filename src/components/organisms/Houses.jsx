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

const fiterCasas = (house, city, type) =>
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

  /* useEffect(() => {
    const actualState = () => {
      const auxArray = []
      // Esto de aquí es un error grave
      // Primero, afecta al rendimiento
      // Segundo, no es escalable
      // Tercero, no es mantenible
      // Cuarto, no es legible
      // Quinto, no es reutilizable
      // Sexto, es dificil de testear
      // Te escribo para que lo veas, pero no lo uses
      // Ni se te ocurra hacerlo en una pruea técnica de entrevista
      // Dicho eso vamos a replantearlo para hacerlo adecuadamente (estamos para progresar)

      // Lo primero no filtres en useEFfect, filtra debajo en la vista
      // Los useEffect por norma suelen ser dificiles de mantener, leer y de testear

      // Cuando filtramos por Ciudad/Typo y posiblemente otros filtros que podemos añadir en un futuro (por ejemplo, por precio)
      // Lo que hacemos es un filtrado AND, es decir, que se cumplan todas las condiciones
      // Por ejemplo, si filtramos por Ciudad y Tipo, solo nos devolverá las casas que cumplan ambas condiciones
      // Si filtramos por Ciudad y Tipo y Precio, solo nos devolverá las casas que cumplan las tres condiciones
      // Eso significa que tenemos que iterar una vez sobre el array, y en esa misma iteración, comprobar si se cumplen todas las condiciones

      // Te lo planteo más debajo con seudocodigo e intenta sacarlo, sino, nos reunimos y lo vemos:
      // const casasFiltradas = casas.filter(casa =>
      //   casa.ciudad === ciudadSeleccionada &&
      //   casa.tipo === tipoSeleccionado
      // )
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
  }, [byId, byType, byCities])  */

  return (
    <HousesStyled>
      <Grid gridGap="32px">
        {isLoading && <div>Loading...</div>}
        {isError && <div>Error</div>}
        {isSucces &&
          allIds.filter(id => fiterCasas(byId[id], byCities, byType))
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
