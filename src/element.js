import { arrayParse } from './utilities/csv'

import elementH from './csv/elem-H.csv'
import elementHe from './csv/elem-He.csv'
import elementHe_II from './csv/elem-He_II.csv'
import elementO from './csv/elem-O.csv'
import elementO_I from './csv/elem-O_I.csv'
import elementO_II from './csv/elem-O_II.csv'
import elementO_III from './csv/elem-O_III.csv'

const element = {
  list: [ 'H', 'He', 'He_II', 'O', 'O_I', 'O_II', 'O_III'],
  data: {
    H: arrayParse(elementH),
    He: arrayParse(elementHe),
    He_II: arrayParse(elementHe_II),
    O: arrayParse(elementO),
    O_I: arrayParse(elementO_I),
    O_II: arrayParse(elementO_II),
    O_III: arrayParse(elementO_III),
  }
}

export default element