# swagger-axios-codegen
swagger client to use axios and typescript

￼[![NpmVersion](https://img.shields.io/npm/v/swagger-axios-codegen.svg)](https://www.npmjs.com/package/swagger-axios-codegen)
￼[![npm](https://img.shields.io/npm/dt/swagger-axios-codegen.svg)](https://www.npmjs.com/package/swagger-axios-codegen)

require node > v8.0.0

it will always resolve `axios.response.data` or reject `axios.error` with Promise

support other support similar to `axios` library, for example [Fly.js](https://github.com/wendux/fly), required setting `ISwaggerOptions.useCustomerRequestInstance = true`

## [Example](./example)
## [ChangeLog](./CHANGELOG.md)

## Get Started

```
  yarn add swagger-axios-codegen
```

```js

export interface ISwaggerOptions {
  serviceNameSuffix?: string
  methodNameMode?: 'operationId' | 'path'
  outputDir?: string
  fileName?: string
  remoteUrl?: string
  source?: any
  useStaticMethod?: boolean | undefined
  useCustomerRequestInstance?: boolean | undefined
  include?: Array<string | IInclude>
}

const defaultOptions: ISwaggerOptions = {
  classNameSuffix: 'Service',
  methodNameMode: 'operationId',
  outputDir: './service',
  fileName: 'index.ts',
  useStaticMethod: true, // >= 0.4
  useCustomerRequestInstance: false
}

```

### use local swagger api json

```js 

const { codegen } = require('swagger-axios-codegen')
codegen({
  methodNameMode: 'operationId',
  source:require('./swagger.json')
})


```

### use remote swagger api json
```js 

const { codegen } = require('swagger-axios-codegen')
codegen({
  methodNameMode: 'operationId',
  remoteUrl:'You remote Url'
})


```

### use static method

```js
codegen({
    methodNameMode: 'operationId',
    remoteUrl: 'http://localhost:22742/swagger/v1/swagger.json',
    outputDir: '.',
    useStaticMethod:true
});

```

before


```js

import { UserService } from './service'
const userService = new UserService()
await userService.GetAll();

```

after

```js

import { UserService } from './service'

await UserService.GetAll();

```


### use custom axios.instance

```js
import axios from 'axios'
import { serviceOptions } from './service'
const instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});

serviceOptions.axios = instance

```

### use other library

```js
import YourLib from '<Your lib>'
import { serviceOptions } from './service'

serviceOptions.axios = YourLib

```

### filter service and method 

```js

let include = [
  'Products', // tagName
  'Estimates',//tagName
  { 'User': ['history'] }
]
codegen({
  methodNameMode: 'path',
  source: require('../swagger.json'),
  outputDir: './swagger/services',
  include
})

```

Welcome PR and commit issue

## License

Licensed under the [GNU Affero General Public License v3.0](LICENSE).

