<template>
  <div>
    <div class="header">
      <div class="headertext">
        Toronto Waste Lookup
      </div>
    </div>
    <div class="body">
      <input type="text" class="searchbox" v-model="searchQuery"/>
      <button class="searchbutton" type="submit" v-on:click="search"><svg enable-background="new 0 0 26 26" id="Слой_1" version="1.1" viewBox="0 0 26 26" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M14.9462891,1C9.4033203,1,4.8935547,5.5097656,4.8935547,11.0532227  c0,2.5022583,0.9248047,4.7885132,2.4428101,6.5498657l-6.1166382,6.1166382c-0.2929688,0.2929688-0.2929688,0.7675781,0,1.0605469  C1.3662109,24.9267578,1.5576172,25,1.75,25s0.3837891-0.0732422,0.5302734-0.2197266l6.1165771-6.1165771  c1.7612305,1.5180054,4.0474243,2.442749,6.5494385,2.442749C20.4902344,21.1064453,25,16.5966797,25,11.0532227  S20.4902344,1,14.9462891,1z M14.9462891,19.6064453c-4.7158203,0-8.5527344-3.8369141-8.5527344-8.5532227  S10.2304688,2.5,14.9462891,2.5C19.6630859,2.5,23.5,6.3369141,23.5,11.0532227S19.6630859,19.6064453,14.9462891,19.6064453z" fill="#ffffff"/></svg></button>
      <br/>
      <div class="tables">
        <table class="resultsTable" v-if="displaySearchResults">
          <tr v-for="(item, index) in searchResults">
            <td class="favstar"><img :src="item.star" v-on:click="addToFavourites(item, index)" height="30%"/></td>
            <td class="itemTitle" v-html="item.title"></td>
            <td colspan="2" class="itemDescription" v-html="item.body"></td>
          </tr>
        </table>
        <h1 id="favtitle" v-if="displayFavourites">Favourites</h1>
        <table class="resultsTable" v-if="displayFavourites">
          <tr v-for="(item, index) in favourites">
            <td class="favstar"><img :src="item.star" v-on:click="removeFavourite(item, index)" height="30%"/></td>
            <td class="itemTitle" v-html="item.title"></td>
            <td colspan="3" class="itemDescription" v-html="item.body"></td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  head () {
    return {
      title: "Toronto Waste Lookup",
    }
  },
  data() {
    return {
      searchQuery: "",
      displaySearchResults: false,
      searchResults: [],
      displayFavourites: false,
      favourites: []
    }
  },
  components: {
  },
  watch: {
    searchQuery: function(newValue) {
      if(newValue === "") {
        this.displaySearchResults = false
      }
    }
  },
  methods: {
    search: function() {
      this.searchResults = []
      const index = require('../static/termIndex.json')
      if(index.hasOwnProperty(this.searchQuery)) {
        const data = require('../static/modifiedData.json')
        for (var item of index[this.searchQuery]) {
          data[item].star = "/torontowaste/star-grey.svg"
          this.searchResults.push(data[item])
        }
      }
      this.displaySearchResults = true;
    },
    addToFavourites: function(item, index) {
      var flag = false;
      for(var fav of this.favourites) {
        if(fav.title === item.title) {
          flag = true
        }
      }
      if (flag === false){
        item.star = "/torontowaste/star-green.svg"
        this.searchResults[index].star = "/torontowaste/star-green.svg"
        this.favourites.push(item)
        this.displayFavourites= true
      }
      else {
        alert('Item already in Favourites')
      }
    },
    removeFavourite: function(item, index) {
      for(var searchResult of this.searchResults) {
        if (searchResult.title === item.title) {
          searchResult.star = "/torontowaste/star-grey.svg"
        }
      }
      this.$delete(this.favourites, index)
      if (this.favourites.length === 0) {
        this.displayFavourites = false;
      }
    }
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700');

  * { box-sizing: border-box }
  :root {
    --blue: #1E5F8E;
    --green: #22965E;
  }
  .header {
    display: table;
    background: linear-gradient(to right, var(--blue), var(--green));
    height: 150px;
    width: 100%;
    text-align: center;
  }

  .headertext {
    display: table-cell;
    vertical-align: middle;
    color: white;
    font-size: 3em;
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
  }
  .body {
    margin-top: 15px;
    margin-left: 20px;
    margin-right: 20px;
    text-align: center;
  }
  .searchbox {
    vertical-align: top;
    display: table-cell;
    width: 90em;
    height: 50px;
    font-size: 1.2em;
    padding-left: 5px;
    font-family: 'Roboto', sans-serif;
    border: 1px solid gray;
    border-radius: 5px;
    font-weight: 400;
  }

  .searchbutton {
    display: table-cell;
    width: 50px;
    height: 50px;
    margin-left: 10px;
    background-color: var(--green);
    border: none;
    border-radius: 5px;
  }

  .tables {
    display: table;
    justify-content: center;
    font-size: 1.5em;
  }
  .itemTitle {
    text-align: left;
    padding: 50px;
    width: 300px;
  }
  .favstar {
    display: table-cell;
    vertical-align: middle;
    padding: 50px;
  }
  .resultsTable {
    align-self: center;
    padding: 50px;
  }
  .itemDescription {
    display: table-cell;
    text-align: left;
    padding: 50px;
  }

  #favtitle {
    color: var(--green);
    text-align: left;
    margin-left: 20px;
  }

</style>
