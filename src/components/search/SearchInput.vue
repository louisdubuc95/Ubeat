<template>
    <form class="search-container" @submit.prevent="search">
        <input class="pure-input" v-model="query" type="search" :placeholder="`Not the ${typeSearch.slice(0, -1)} you're looking for ?`" />
        <input class="pure-button pure-button-primary" type="submit" value="Search" />
    </form>
</template>

<script>
export default {
  name: 'search-input',
  data() {
    return {
      query: ''
    };
  },
  props: {
    typeSearch: {
      str: String,
      required: true
    }
  },
  methods: {
    search() {
      this.$router.push({
        name: 'Search',
        query: {
          mode: this.typeSearch,
          q: this.query
        }
      });
    },
  }
};
</script>

<style>
.search-container {
    margin-top: 25px;
    padding-top: 25px;
    border-top: 1px solid rgba(255, 255, 255, .3);
}
.search-container .pure-input,
.search-container .pure-button {
    width: 100%;
}

.search-container .pure-input {
    margin-bottom: 10px;
    box-sizing: border-box;
}

@media screen and (min-width: 35.5em) {

    .search-container .pure-input {
        width: 300px;
        margin-bottom: 0;
    }

    .search-container .pure-button {
        width: 150px;
    }

}
</style>
