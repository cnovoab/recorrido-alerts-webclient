<template>
  <div class="reminders">
    <AppHeader></AppHeader>
    <div class="alert alert-danger" v-if="error">{{ error }}</div>
    <h3>Reminders</h3>
    <input class="form-control"
      autofocus autocomplete="off"
      placeholder="What needs to be done?"
      v-model="newReminder"
      @keyup.enter="addReminder" />
    <br />
    <ul class="list-group">
      <li class="list-group-item" v-for="reminder in reminders" :key="reminder.id" :reminder="reminder">
        <div v-show="reminder != editedReminder" @dblclick="editReminder(reminder)">
          <label>{{ reminder.name }}</label>
          <i class="fa fa-chart-line float-right" @click="showReminder(reminder)"></i>
        </div>
        <div v-show="reminder == editedReminder">
          <input class="form-control"
            v-reminder-focus
            @keyup.enter="updateReminder(reminder)"
            v-model="reminder.title"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader'

export default {
  name: 'List',
  data () {
    return {
      reminders: [],
      newReminder: [],
      error: '',
      editedReminder: ''
    }
  },
  created () {
    if (!this.$store.state.signedIn) {
      this.$router.replace('/')
    } else {
      this.$http.secured.get('/alerts')
        .then(response => { this.reminders = response.data })
        .catch(error => { this.setError(error, 'Something went wrong') })
    }
  },
  methods: {
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    showReminder (reminder) {
      this.$router.push({ name: 'Show', params: { id: reminder.id } })
    },
    addReminder () {
      const value = this.newReminder && this.newReminder.trim()
      if (!value) {
        return
      }
      this.$http.secured.post('/alerts', { alert: { title: this.newReminder } })
        .then(response => {
          this.reminders.push(response.data)
          this.newReminder = ''
        })
        .catch(error => this.setError(error, 'Cannot create reminder'))
    },
    removeReminder (reminder) {
      this.$http.secured.delete(`/alerts/${reminder.id}`)
        .then(response => this.reminders.splice(this.reminders.indexOf(reminder), 1))
        .catch(error => this.setError(error, 'Cannot delete reminder'))
    },
    editReminder (reminder) {
      this.editedReminder = reminder
    },
    updateReminder (reminder) {
      this.editedReminder = ''
      this.$http.secured.patch(`/alerts/${reminder.id}`, { alert: { title: reminder.title } })
        .catch(error => this.setError(error, 'Cannot update reminder'))
    }
  },
  directives: {
    'reminder-focus': function (el) {
      el.focus()
    }
  },
  components: { AppHeader }
}
</script>

<style lang="css">
  .reminders i.fa.fa-chart-line {
    cursor: pointer;
    visibility: hidden;
    margin-top: 5px;
    margin-right: 55px;
  }
  .reminders ul li i.fa.fa-trash-alt {
    cursor: pointer;
    visibility: hidden;
    margin-top: 5px;
  }
  .reminders ul li:hover {
    background: #fcfcfc;
  }

  .reminders ul li:hover i.fa.fa-trash-alt {
    visibility: visible;
  }
  .reminders ul li:hover i.fa.fa-chart-line {
    visibility: visible;
  }
</style>
