import { getStrapiURL } from './utils'
import { strapi } from '@strapi/sdk-js'

const BASE_API_URL = getStrapiURL() + '/api'
console.log(BASE_API_URL, 'BASE_API_URL')
const sdk = strapi({ baseURL: BASE_API_URL })
console.log(sdk, 'sdk')
export default sdk
