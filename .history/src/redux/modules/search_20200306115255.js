import url from '../../utils/url'
import {FETCH_DATA} from '../middleware/api'
import {schema as keywordsSchema} from './entities/keywords'

export const types={
  // 获取热门关键词
  FETCH_POPULAR_KEYWORDS_REQUEST: "SEARCH/FETCH_POPULAR_KEYWORDS_REQUEST", 
  FETCH_POPULAR_KEYWORDS_SUCCESS: "SEARCH/FETCH_POPULAR_KEYWORDS_SUCCESS", 
  FETCH_POPULAR_KEYWORDS_FAILURE: "SEARCH/FETCH_POPULAR_KEYWORDS_FAILURE", 
  // 根据输入的文本获取相关关键词
  FETCH_RELATED_KEYWORDS_REQUEST: "SEARCH/FETCH_RELATED_KEYWORDS_REQUEST", 
  FETCH_RELATED_KEYWORDS_SUCCESS: "SEARCH/FETCH_RELATED_KEYWORDS_SUCCESS", 
  FETCH_RELATED_KEYWORDS_FAILURE: "SEARCH/FETCH_RELATED_KEYWORDS_FAILURE", 
  // 设置当前输入
  SET_INPUT_TEXT:"SEARCH/SET_INPUT_TEXT",
  CLEAR_INPUT_TEXT:"SEARCH/CLEAR_INPUT_TEXT",
  // 历史记录查询
  ADD_HISTORY_KEYWORDS:"SEARCH/ADD_HISTORY_KEYWORDS",
  CLEAR_HISTORY_KEYWORDS:"SEARCH/CLEAR_HISTORY_KEYWORDS",
}

const initialState = {
  inputText: '',
  popularKeywords: {
    isFetching: false,
    ids: []
  },
  /**
   * relatedKeywords对象结构：
   * {
   *   '火锅': {
   *       isFetching: false,
   *       ids: []
   *    }
   * }
   */
  relatedKeywords: {

  },
  historyKeywords: []  //保存关键词id
}

export const actions={
  // 获取热门关键词
  loadPopularKeywords:()=>{
    return (dispatch,getState)=>{
      const {ids}=getState().search.popularKeywords
      if(ids.length>0){
        return null
      }
      const endpoint=url.getPopularKeywords()
      return dispatch(fetchPopularKeywords(endpoint))
    }
  },
  // 根据输入获取相关关键词
  loadRealatedKeywords:()=>{
    
  },
  // 搜索框输入文本相关action
  setInputText:text=>{

  },
  clearInputText:()=>{

  },
  // 历史查询记录相关action
  addHistoryKeywords:keywordId=>{

  },
  clearHistoryKeywords:()=>{

  }
}