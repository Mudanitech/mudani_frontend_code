import axios from 'axios';
// import DataManager from './DataManager'
// import NetInfo from "@react-native-community/netinfo";
// Create axios client, pre-configured with baseURL

import {getEdncodedData} from '../functions/functions';

import {baseApiUrl} from '../utils/baseUrl';
let APIKit = axios.create({
  baseURL: baseApiUrl,
  timeout: 20000,
});
export function postAPI(endPoint, data) {
  const payload = getEdncodedData(data);
  console.log('post url', endPoint);
  console.log('Body', data);
  return APIKit.post(endPoint, payload, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
  })
    .then(response => response.data)
    .then(responseJson => {
      return new Promise((resolve, reject) => {
        resolve(responseJson);
      });
    })
    .catch(err => {
      return new Promise((resolve, reject) => {
        reject({description: err});
      });
    });
}

export async function getAPI(endPoint, params, header) {
  //   const tokenData = await DataManager.getAccessToken();
  console.log('get url', endPoint, params);
  return APIKit.get(
    endPoint,
    {params: params},
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    },
  )
    .then(response => response.data)
    .then(responseJson => {
      return new Promise((resolve, reject) => {
        resolve(responseJson);
      });
    })
    .catch(err => {
      console.log('Error ', err);
      return new Promise((resolve, reject) => {
        reject({description: err});
      });
    });
}

export async function deleteAPI(endPoint, params) {
  //   const tokenData = await DataManager.getAccessToken();
  console.log('get url', endPoint, params);
  return APIKit.delete(
    endPoint,
    {params: params},
    {
      headers: {
        //"Authorization": "Bearer " + tokenData,
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
    },
  )
    .then(response => response.data)
    .then(responseJson => {
      return new Promise((resolve, reject) => {
        resolve(responseJson);
      });
    })
    .catch(err => {
      console.log('Error ', err);
      return new Promise((resolve, reject) => {
        reject({description: err});
      });
    });
}
