import Form from 'formiojs/Form'
import AllComponents from 'formiojs/components';
import Components from 'formiojs/components/Components';
Components.setComponents(AllComponents);

export default {
  props: {
    src: {
      type: String
    },
    url: {
      type: String
    },
    form: {
      type: Object
    },
    submission: {
      type: Object,
      required: false
    },
    options: {
      type: Object,
      default: () => { return {} }
    },
    language: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      formio: {}
    }
  },
  computed: {
    _src () {
      return this.src
    },
    _url () {
      return this.url
    },
    _form () {
      return this.form
    },
    _submission () {
      return this.submission
    },
    _options () {
      return this.options
    },
    _language () {
      return this.language
    }
  },
  watch: {
    _src (value) {
      if (this.formio) {
        this.formio.src = value
      }
    },
    _url (value) {
      if (this.formio) {
        this.formio.url = value
      }
    },
    _form: {
      handler (value) {
        if (this.formio) {
          this.formio.form = value
        }
      },
      deep: true
    },
    _submission (value) {
      if (this.formio) {
        this.formio.submission = value
      }
    },
    _options: {
      handler (value) {
        if (this.formio) {
          this.formio.options = value
        }
      },
      deep: true
    },
    _language (value) {
      if (this.formio) {
        this.formio.language = value
      }
    }
  },
  methods: {
    formInit () {
      return new Promise((resolve, reject) => {
        if (this.src) {
          resolve(this.createForm(this.$refs.formio, this.src, this.options))
        } else if (this.form) {
          resolve(this.createForm(this.$refs.formio, this.form, this.options))
        } else {
          return reject(new Error('You must set src or form attribute.'))
        }
      })
    },
    createForm (element, form, options) {
      return (new Form(element, form, options))
        .render()
        .then(form => {
          this.formio = form
          return form
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.error(error)
        })
    },
    bootstrapEvents (formio) {
      formio.events.onAny((...events) => {
        const event = events[0].split('.')

        // only handle formio events
        if (event[0] !== 'formio' || event.length !== 2) return

        // remove 'formio' from event
        events[0] = event[1]
        this.$emit.apply(this, events)

        // Custom events
        if (event[1] === 'customEvent') {
          events[0] = events[1].type
          this.$emit.apply(this, events)
        }
      })
    },
    setupForm () {
      // Full Stop if NO formio instance
      if (!this.formio) {
        return
      }

      if (this.submission) {
        this.formio.submission = this.submission
      }

      if (this.url) {
        this.formio.url = this.url
      }

      this.bootstrapEvents(this.formio)
    }
  },
  mounted () {
    this.formInit().then(() => {
      this.setupForm()
    })
  },
  destroyed () {
    if (this.formio) {
      this.formio.destroy(true)
    }
  },
  render (createElement) {
    return createElement('div', { ref: 'formio' })
  }
}
