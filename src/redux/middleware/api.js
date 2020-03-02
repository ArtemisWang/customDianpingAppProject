import { get } from "../../utils/request"

//经过中间件处理的action所具有的标识
export const FETCH_DATA = 'FETCH DATA'

export default store => next => action => {
  const callAPI = action[FETCH_DATA]
  if(typeof callAPI === 'undefined') {
    return next(action)
  }

  const { endpoint, schema, types } = callAPI
  if(typeof endpoint !== 'string') {
    throw new Error('endpoint必须为字符串类型的URL')
  }
  if(!schema) {
    throw new Error('必须指定领域实体的schema')
  }
  if(!Array.isArray(types) && types.length !== 3) {
    throw new Error('需要指定一个包含了3个action type的数组')
  }
  if(!types.every(type => typeof type === 'string')) {
    throw new Error('action type必须为字符串类型')
  }

  const actionWith = data => {
    const finalAction = {...action, ...data}
    delete finalAction[FETCH_DATA]
    return finalAction
  }

  const [requestType, successType, failureType] = types

  next(actionWith({type: requestType}))
  return fetchData(endpoint, schema).then(
    response => next(actionWith({
      type: successType,
      response 
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || '获取数据失败'
    }))
  )
}

//执行网络请求
const fetchData = (endpoint, schema) => {
  return get(endpoint).then(data => {
    return normalizeData(data, schema)
  })
}

//根据schema, 将获取的数据扁平化处理
const normalizeData = (data, schema) => {
  const {id, name} = schema
  let kvObj = {}
  let ids = []
  if(Array.isArray(data)) {
    data.forEach(item => {
      kvObj[item[id]] = item
      ids.push(item[id])
    })
  } else {
    kvObj[data[id]] = data
    ids.push(data[id])
  }
  return {
    [name]: kvObj,
    ids
  }
}
