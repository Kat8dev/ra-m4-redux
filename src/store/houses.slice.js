import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { urls } from '../constants'

export const getHouses = createAsyncThunk('houses/getHouses', async () => {
  try {
    const res = await fetch(urls.houses)
    const data = res.json()
    return data
  } catch (error) {
    console.log('Failed to fetch :(', error)
  }
})

const initialState = {
  reqStatus: {
    initial: 'initial',
    isError: false,
    isSucces: false,
    isLoading: false,
  },
  houses: {
    byId: {},
    allIds: [],
    byType: {},
    allTypes: [],
    byCities: {},
    allCities: [],
  },
}

const housesSlice = createSlice({
  name: 'houses',
  initialState,
  reducers: {
    filterByTypes(state, action) {
      state.houses.byType = { 1: action.payload }
    },
    filterByCities(state, action) {
      state.houses.byCities = { 1: action.payload }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getHouses.pending, (state) => {
      state.reqStatus.isError = true
    })
    builder.addCase(getHouses.fulfilled, (state, action) => {
      state.reqStatus.isError = false
      state.reqStatus.isSucces = true
      action.payload.forEach((house) => {
        state.houses.byId[house.id] = house
        state.houses.byType[house.id] = house.type
        state.houses.byCities[house.id] = house.city

        if (!state.houses.allIds.includes(house.id)) {
          state.houses.allIds.push(house.id)
        }
        if (!state.houses.allTypes.includes(house.type)) {
          state.houses.allTypes.push(house.type)
        }
        if (!state.houses.allCities.includes(house.city)) {
          state.houses.allCities.push(house.city)
        }
      })
    })
    builder.addCase(getHouses.rejected, (state) => {
      state.houses.isError = true
    })
  },
})

export const { filterByTypes, filterByCities } = housesSlice.actions

export default housesSlice.reducer
