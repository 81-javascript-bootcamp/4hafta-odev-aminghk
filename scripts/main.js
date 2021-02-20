import data from "./data.js";
import {searchMovieByTitle, makeBgActive} from "./helpers.js";

class MoviesApp {
    constructor(options) {
        const {root, searchInput, searchForm, yearHandler, yearSubmitter} = options;
        this.$tableEl = document.getElementById(root);
        this.$tbodyEl = this.$tableEl.querySelector("tbody");
        this.$yearFilter = document.getElementById("yearFilter");
        this.$genreFilter = document.getElementById("genreFilter");
        this.$searchInput = document.getElementById(searchInput);
        this.$searchForm   = document.getElementById(searchForm);
        this.yearHandler = yearHandler;
        this.$yearSubmitter = document.getElementById(yearSubmitter);
    }

    createMovieEl(movie){
        const {image, title, genre, year,id} = movie;
        return `<tr data-id="${id}">
        <td><img src="${image}"></td>
        <td>${title}</td>
        <td>${genre}</td>
        <td>${year}</td>
        </tr>`
    }

    createYearEl(yearData){
        const {year,occu} = yearData;
        return `<div class="form-check">
            <input class="form-check-input" type="radio" name="year" id="year1" value="${year}">
            <label class="form-check-label" for="year">
            ${year} (${occu})
            </label>
            </div>`
    }

    createGenreEl(genreData){
        const {genre,occu} = genreData;
        return `<div class="form-check">
        <input class="form-check-input" type="checkbox" value="${genre}" id="flexCheckDefault">
        <label class="form-check-label" for="flexCheckDefault">
            ${genre} (${occu})
        </label>
    </div>`
    }

    fillTable(){
        /* const moviesHTML = data.reduce((acc, cur) => {
            return acc + this.createMovieEl(cur);
        }, "");*/
        const moviesArr = data.map((movie) => {
           return this.createMovieEl(movie)
        }).join("");
        this.$tbodyEl.innerHTML = moviesArr;
       
    }

    reset(){
        this.$tbodyEl.querySelectorAll("tr").forEach((item) => {
            item.style.background = "transparent";
        })
    }


    handleSearch(){
        this.$searchForm.addEventListener("submit", (event) => {
            event.preventDefault();
            this.reset();
            const searchValue = this.$searchInput.value;
            const matchedMovies = data.filter((movie) => {
                return searchMovieByTitle(movie, searchValue);
            }).forEach(makeBgActive)

        });
    }
    
 


    addYearsToFiter(){

        const years = []
        data.forEach((movie)=>{
            let year = movie.year
            years.push(year)
        })
        const yearsObject = []
        years.forEach((item)=>{
            let itemCount = 1;
            for (let i = 0; i < years.length; i++) {
                const element = years[i];
                if(item === element){
                    itemCount++;
                    years.splice(i, 1); 
                } 
            }
            let tempData = {
                year : item,
                occu : itemCount
            }
            yearsObject.push(tempData);
        }) 
        console.log(yearsObject)  
        const yearArr = yearsObject.map((yearData) => {
            return this.createYearEl(yearData)
         }).join("");
        this.$yearFilter.innerHTML = yearArr;
       
    }
    addGenresToFilter(){


        const genres = []
        data.forEach((movie)=>{
            let genre = movie.genre
            genres.push(genre)
        })
        
      
        
        const genresObject = []
        genres.forEach((item)=>{
            let itemCount = 1;

            for (let i = 0; i < genres.length; i++) {
                const element = genres[i];
                if(item === element){
                    itemCount++;
                    genres.splice(i, 1); 
                } 
            }
            let tempGenre = {
                genre : item,
                occu : itemCount
            }
            genresObject.push(tempGenre);
        })   

        console.log(genresObject)
        const genreArr = genresObject.map((genreData) => {
            return this.createGenreEl(genreData)
         }).join("");
        this.$genreFilter.innerHTML = genreArr;
        

    }

    handleYearFilter(){
        this.$yearSubmitter.addEventListener("click", () => {
            this.reset();
            const selectedYear = document.querySelector(`input[name='${this.yearHandler}']:checked`).value
            const matchedMovies = data.filter((movie) => {
                return movie.year === selectedYear;
            }).forEach(makeBgActive)
        });
    }

    init(){
        this.fillTable();
        this.handleSearch();
        this.handleYearFilter();
        this.addYearsToFiter();
        this.addGenresToFilter();
    }
}

let myMoviesApp = new MoviesApp({
    root: "movies-table",
    searchInput: "searchInput",
    searchForm: "searchForm",
    yearHandler: "year",
    yearSubmitter: "yearSubmitter"
});

myMoviesApp.init();
