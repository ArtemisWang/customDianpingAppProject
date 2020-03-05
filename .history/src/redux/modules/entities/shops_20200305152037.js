import createReducer from '../../../utils/createReducer'

const schema={
  id:'id',
  name:'shops',
}

const reducer = createReducer(schema.name)

export default reducer;