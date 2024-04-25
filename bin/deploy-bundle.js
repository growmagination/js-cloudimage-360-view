/* eslint-disable no-console */
require('isomorphic-fetch')
require('dotenv').config()
const FormData = require('form-data')
const { createReadStream } = require('fs')
const { join } = require('path')
let { version } = require('../package.json')

const splittedVersion = version.split('.')
version = splittedVersion.filter((v) => parseInt(v) || parseInt(v) === 0).map((v) => parseInt(v)).slice(0, 3).join('.')

const apiUrl = process.env.BUNDLE_API_URL || 'https://api.filerobot.com'

const pluginsContainer = process.env.BUNDLE_PLUGINS_CONTAINER
const securityTemplateId = process.env.BUNDLE_UPLOAD_SECURITY_TEMPLATE_ID
const pluginFolder = `${process.env.BUNDLE_FOLDER}`
const pluginVersion = version || 'latest'
const latestFolder = 'latest'

const generateSassKey = () => fetch(`${apiUrl}/${pluginsContainer}/key/${securityTemplateId}`)
  .then((res) => res.json()).then((res) => {
    if (res.status === 'error') {
      console.error(`Error while generating SASS key: ${res.msg || res.hint}`)
    } else {
      return res.key
    }
  })
  .catch(() => new Error(`Unable to get SASS key for the provided security template key ${securityTemplateId}`))

const statiUploadEndpoint = `${apiUrl}/${pluginsContainer}/v4/files?folder=${pluginFolder}`

const deploy = (sassKey, folderName = pluginVersion) => {
  const uploadEndpoint = `${statiUploadEndpoint}/${folderName}`
  const formData = new FormData()
    formData.append('files[]', createReadStream(
      join(__dirname, '../build/js-cloudimage-360-view.min.js')
    ))

  return fetch(uploadEndpoint, {
    method: 'POST',
    body: formData,
    headers: {
      'X-Filerobot-Key': sassKey
    }
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status === 'error') {
        console.error(`Error while deploying:${res.msg ? ` ${res.msg} ` : ''}${res.hint ? `- ${res.hint}` : ''}`)
      } else {
        console.log(`Plugin Bundle v${pluginVersion} deployed successfully to ${folderName}.`)
        const uploadedFile = res.file || []
        console.log(`- [${uploadedFile.name}] URL:`, uploadedFile.url?.cdn)
      }

      return sassKey
    })
    .catch(console.error)
}

generateSassKey()
.then((sassKey) => deploy(sassKey).then((sassKey) => deploy(sassKey, latestFolder)))
.catch(console.error)
