import axios from "axios";
import { navigate } from "../utils/navigationRef";
import store, { persistor } from "../utils/store";

const instance = axios.create({
  baseURL: 'https://hygieneforall.com/wp-json/my-route/'
})

instance.interceptors.request.use(
  async (config) => {
    console.log(store.getState().localStates.loginuserToken)

    const token = store.getState().localStates && store.getState().localStates.loginuserToken
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)


instance.interceptors.response.use(async (response) => {
  // debugger
  if (response.data.status == 500) {
    navigate('LoginScreen')
  } else {
    return response
  }
}, error => {
  // debugger
  console.log({ error })
  return error.response
})
export default instance
