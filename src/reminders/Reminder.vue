<template>
  <main>
    <reminder v-if="currentReminder">
      <h1>{{ currentReminder.name }}</h1>
      <p>{{ currentReminder.departure_city.name }}</p>
      <p>{{ currentReminder.destination_city.name }}</p>
      <p>{{ currentReminder.price }}</p>
      <p>{{ currentReminder.service_stars}}</p>
    </reminder>
  </main>
</template>

<script>
  import { mapGetters, mapActions, mapState } from 'vuex';

  export default {
    name: 'reminder',

    computed: {
      ...mapGetters('reminders', {
        reminderById: 'byId'
      }),

      ...mapState([
        'route', // vuex-router-sync
      ]),

      currentReminder() {
        return this.reminderById(this.route.params.id);
      }
    },

    methods: {
      ...mapActions('reminders', {
        fetchReminder: 'fetchSingle'
      }),

      fetchData() {
        return this.fetchReminder({
          id: this.route.params.id
        });
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
