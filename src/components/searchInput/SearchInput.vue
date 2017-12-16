<template>
    <main class="search-container">
      <div class="pure-g">
        <div class="pure-u-sm-1-2 pure-u-1"><h2>Searging {{ typeSearch }} ?</h2></div>
        <div class="pure-u-sm-1-2 pure-u-1" style="margin:auto;"><input class="pure-u-1" v-model="inputSearch" @keyup.enter="submitSearch" type="search" placeholder="Type here what you are thinking" /></div>
      </div>
    </main>
</template>

<script>
export default {
  name: 'search-input',
  data() {
    return {
      inputSearch: ''
    };
  },
  props: {
    typeSearch: {
      str: String,
      required: true
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    submitSearch() {
      // eslint-disable-next-line // cette ligne est SOOO USEFUL <3
      this.$router.push({ name: 'Search', query: { [this.typeSearch]: this.inputSearch } });
    },
  }
};
</script>

<style>
.search-container {
  width: 100%;
  max-width: 1400px;
  margin: auto;
  padding: 0px 20px 30px 20px;
  box-sizing: border-box;
}

.search-container h2 {
    font-weight: normal;
    color: #fff;
}
.search-container input {
  color: black;
}
</style>
