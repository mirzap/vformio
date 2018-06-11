import FormBuilder from 'formiojs/FormBuilder'
import AllComponents from 'formiojs/components'
import Components from 'formiojs/components/Components'

// Load all Formio components
Components.setComponents(AllComponents)

export default {
  props: {
    form: {
      type: Object
    },
    options: {
      type: Object,
      default: () => { return {} }
    }
  },

  data () {
    return {
      builder: {},
      builderReady: {}
    }
  },

  methods: {
    formBuilderInit () {
      if (!this.form) {
        return Promise.reject(new Error('You must set form attribute.'))
      }

      this.builder = new FormBuilder(this.$refs.formio, this.form, this.options)
      this.builderReady = this.builder.setDisplay(this.form.display)

      return this.builderReady.then(() => {
        this.builder.instance.events.onAny((...args) => {
          const eventParts = args[0].split('.');

          // Only handle formio events.
          if (eventParts[0] !== 'formio' || eventParts.length !== 2) {
            return;
          }

          // Emit a change event if the schema changes.
          if (['saveComponent', 'updateComponent', 'deleteComponent'].includes(eventParts[1])) {
            args[0] = 'change';
            this.$emit.apply(this, args);
          }
        })
      })
    }
  },

  mounted () {
    this.formBuilderInit()
      .catch(e => {
        // eslint-disable-next-line no-console
        console.error(e)
      })
  },

  render (createElement) {
    return createElement('div', { ref: 'formio' })
  }
}
