import request from 'superagent'

export const CLEAR_FACTOIDS = 'CLEAR_FACTOIDS'
export const REQUEST_FACTOIDS = 'REQUEST_FACTOIDS'
export const RECEIVE_FACTOIDS = 'RECEIVE_FACTOIDS'
export const RECEIVE_FACTOIDS_ERROR = 'RECEIVE_FACTOIDS_ERROR'

const requestFactoids = factdb => ({
  type: REQUEST_FACTOIDS, factdb,
})

const receiveFactoids = (factdb, factoids) => ({
  type: RECEIVE_FACTOIDS,
  factdb,
  factoids,
})

const receiveFactoidsError = (factdb, error) => ({
  type: RECEIVE_FACTOIDS_ERROR,
  factdb,
  error,
})

export function fetchFactoids(factdb) {
  return (dispatch) => {
    dispatch(requestFactoids(factdb))
    request
      .get('http://dan.soupwhale.com/facts/api/v2/')
      .query({ db: factdb })
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          throw new Error(err)
        } else if (res.body.response.filter) {
          dispatch(receiveFactoids(factdb, res.body.response))
        } else if (res.body.response.error) {
          dispatch(receiveFactoidsError(factdb, res.body.response.error))
        }
      })
  }
}

export function clearFactoids() {
  return { type: CLEAR_FACTOIDS }
}
