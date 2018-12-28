<template>
  <div id="app">
    <ReactiveBase
      app="good-books-yj"
      credentials="gBgUqs2tV:3456f3bf-ea9e-4ebc-9c93-08eb13e5c87c"
    >
      <div class="navbar">
        <h2>📚Book<span>Search</span></h2>
        <DataSearch
          componentId="title"
          iconPosition="right"
          :dataField="[
            'original_title',
            'original_title.raw',
            'original_title.search',
            'authors',
            'authors.raw',
            'authors.search'
          ]"
          className="data-search"
          :showClear="false"
          queryFormat="and"
          :fieldWeights="[3, 3, 1, 2, 2, 1]"
          placeholder="Search for book"
      />
      </div>
      <button class="toggle" @click="switchContainer">
        {{ showBooks ? "Show Filter 💣" : "Show Books 📚" }}
      </button>
      <div class="container">
        <div class="filters-container" :class="{ full: !showBooks }">
          <MultiList
            componentId="Authors"
            dataField="authors.raw"
            class="filter"
            title="Select Authors"
            selectAllLabel="All Authors"
            :react="{ and: ['Ratings', 'title'] }"
          />
          <SingleRange
            componentId="Ratings"
            dataField="average_rating"
            :data="[
              { start: 0, end: 3, label: 'Rating < 3' },
              { start: 3, end: 4, label: 'Rating 3 to 4' },
              { start: 4, end: 5, label: 'Rating > 4' }
            ]"
            title="Book Ratings"
            class="filter"
          />
        </div>

        <ReactiveList
          componentId="SearchResult"
          dataField="original_title.raw"
          :class="{ full: showBooks }"
          :pagination="true"
          :from="0"
          :size="16"
          :showResultStats="false"
          className="result-list-container"
          :react="{ and: ['Ratings', 'Authors', 'title'] }"
          :innerClass="{ list: 'books-container', poweredBy: 'appbase' }"
        >
          <div slot="onData" class="book-content" slot-scope="{ item }">
            <div key="item._id">
              <div class="image">
                <img :src="item.image" alt="Book Cover" class="book-image" />
                <div class="rating">{{ item.average_rating_rounded }} ⭐️</div>
                <div class="details">
                  <h4 class="book-header">{{ item.original_title }}</h4>
                  <p>By {{ item.authors }}</p>
                </div>
              </div>
            </div>
          </div>
        </ReactiveList>
      </div>
    </ReactiveBase>
  </div>
</template>

<script>
import "./styles.css";
export default {
  name: "app",
  data: function() {
    return {
      showBooks: window.innerWidth <= 768 ? true : false
    };
  },
  methods: {
    switchContainer: function() {
      return (this.showBooks = !this.showBooks);
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
