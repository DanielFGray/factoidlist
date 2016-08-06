import request from 'superagent';

export const REQUEST_FACTOIDS = 'REQUEST_FACTOIDS';
export const RECEIVE_FACTOIDS = 'RECEIVE_FACTOIDS';
export const RECEIVE_FACTOIDS_ERROR = 'RECEIVE_FACTOIDS_ERROR';

function requestFactoids(factdb) {
  return { type: REQUEST_FACTOIDS, factdb };
}

function receiveFactoids(factdb, factoids) {
  return { type: RECEIVE_FACTOIDS, factdb, factoids };
}

function receiveFactoidsError(factdb, error) {
  return { type: RECEIVE_FACTOIDS_ERROR, factdb, error };
}

export function fetchFactoids(factdb) {
  return dispatch => {
    dispatch(requestFactoids(factdb));
    request
      .get('http://dan.soupwhale.com/facts/factoids.php')
      .query({ json: factdb })
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          throw new Error(err);
        } else if (res.body.response.filter) {
          dispatch(receiveFactoids(factdb, res.body.response));
        } else if (res.body.response.error) {
          dispatch(receiveFactoidsError(factdb, res.body.error));
        }
      });
  };
}
