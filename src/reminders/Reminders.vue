<template>
  <main>
    <reminder v-for="reminder in reminderList">
      <h1>{{ reminder.name }}</h1>
      <p>{{ reminder.departure_city.name }}</p>
      <p>{{ reminder.destination_city.name }}</p>
      <p>{{ reminder.price }}</p>
      <p>{{ reminder.service_stars}}</p>
    </reminder>
  </main>
</template>

<script>
  import { mapGetters, mapActions, mapState } from 'vuex';

  export default {
    name: 'reminders',

    computed: {
      ...mapGetters('reminders', {
        reminderList: 'list'
      }),

      ...mapState([
        'route', // vuex-router-sync
      ]),
    },

    methods: {
      ...mapActions('reminders', {
        fetchReminders: 'fetchList'
      }),

      fetchData() {
        return this.fetchReminders();
      }
    },

    watch: {
      $route: 'fetchData',
    },

    created() {
      this.fetchData();
    }
  };
</script>
