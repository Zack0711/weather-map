import get from 'lodash/get'

export const getList = state => get(state, 'spectrum.list', [])

export const getSelected = state => get(state, 'spectrum.selected', {})

export const getIsFetching = state => get(state, 'spectrum.isFetching', false)
