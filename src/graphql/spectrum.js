import { gql } from 'apollo-boost'

export const GET_SPECTRUM_LIST = gql`
  query spectrumListQuery {
    list: spectrumList {
      id
      modifyDate: modify_date
    }
  }
`

export const GET_SPECTRUM = gql`
  query spectrumQuery($id: ID!) {
    spectrum: getSpectrum(id: $id) {
      id
      csvLink: csv_link
    }
  }
`
