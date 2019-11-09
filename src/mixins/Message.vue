<script>
export default {
  data() {
    return {
      series: [],
      speakers: [],
      authors: []
    };
  },
  methods: {
    fetchSeries() {
      this.$store
        .dispatch("fetchSeries")
        .then(res => {
          this.series = res;
        })
        .catch(err => console.log(err));
    },
    fetchSpeakers() {
      this.$store
        .dispatch("fetchSpeakers")
        .then(res => {
          this.speakers = res;
        })
        .catch(err => console.log(err));
    },
    fetchAuthors() {
      this.$store
        .dispatch("fetchMessageAuthors")
        .then(res => {
          this.authors = res;
        })
        .catch(err => console.log(err));
    }
  },
  computed: {
    selectSeries() {
      let series = [];

      this.series.forEach(e => {
        series.push({
          value: parseInt(e.id),
          label: e.name
        });
      });

      return series;
    },
    selectSpeakers() {
      let speakers = [];

      this.speakers.forEach(e => {
        speakers.push({
          value: parseInt(e.id),
          label: e.name
        });
      });

      return speakers;
    },
    selectAuthors() {
      let authors = [];

      this.authors.forEach(e => {
        authors.push({
          value: parseInt(e.id),
          label: e.name
        });
      });

      return authors;
    }
  },
  created() {
    // Get series for filter
    if (this.$store.getters.getSeries.length > 0) {
      this.series = this.$store.getters.getSeries;
    } else {
      this.fetchSeries();
    }

    // Get speakers for filter
    if (this.$store.getters.getSpeakers.length > 0) {
      this.speakers = this.$store.getters.getSpeakers;
    } else {
      this.fetchSpeakers();
    }

    // Get message authors for filter
    if (this.$store.getters.getMessageAuthors.length > 0) {
      this.authors = this.$store.getters.getMessageAuthors;
    } else {
      this.fetchAuthors();
    }
  }
};
</script>