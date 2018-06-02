# vformio - Formio.js wrapper for Vue

This package is heavily influenced by the official [vue-formio](https://github.com/formio/vue-formio) package. Kudos to the formio team. 

## Installation

```
npm i vformio --save
```

or with `yarn`:

```
yarn add vformio
```

## Usage

First you have to import and register the `Form` component:

```vue
<script>
import { Form } from 'vformio'

export default {
  name: 'MyApp',
  components: { 'MyForm': Form },
  data () {
    return {
      form: {
        // your form 
      },
      options: {
        // some options
        i18n: {
          en: {},
          de: {},
          fr: {}
        }
      },
      lang: 'de'
    }
  },
  methods: {
    onSubmit () {
      // handle form submissions
    }
  }
}
</script>
```

then you can use it in `template` section of your Vue component:

```vue
<template>
  <MyForm :form="form" :options="options" :language="lang" @submit="onSubmit"/> 
</template>
```

## Available props

### `src`: `string`
The form API source from [form.io](https://www.form.io) or your custom formio server.

### `form` : `object`
An object representing the form. Use this instead of src for custom forms. 
**Note:** `src` will override this property if used.

### `submission`: `Object`
An object representing the default data for the form.
**Note:** `src` will override this if a submission url is entered.

### `options`: `object`
An object which represents formio.js options. See [Form.io Options](https://github.com/formio/formio.js/wiki/Form-Renderer#options).

### `language`: `string`
Default language for the form.

## Events

Vue instance has an access to all events triggered from the form. You can set event handlers using `v-on` property (or using `@` shorthand). 
```vue
<MyForm :form="form" @submit="onSubmit"/> 
```
See [Form.io Events](https://github.com/formio/formio.js/wiki/Form-Renderer#events) for all the available events.
