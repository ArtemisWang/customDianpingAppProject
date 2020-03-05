import createReducer from '../../../utils/createReducer'

export const schema={
  id:'id',
  name:'products',
}

const reducer = createReducer(schema.name)

export default reducer;