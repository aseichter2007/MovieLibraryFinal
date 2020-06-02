using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using WebAPISample.Data;
using WebAPISample.Models;

namespace WebAPISample.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private ApplicationContext _context;
        public MovieController(ApplicationContext context)
        {
            _context = context;
        }
        // GET api/movie
        [HttpGet]
        public IActionResult Get()
        {
            var movies = _context.Movies;           
            string ICantHoldAllTheseDatas = JsonConvert.SerializeObject(movies);
            
            // Retrieve all movies from db logic
            return Ok(ICantHoldAllTheseDatas);
        }

        // GET api/movie/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var movieInDb = _context.Movies.Where(m => m.MovieId == id).SingleOrDefault();
            string movie = JsonConvert.SerializeObject(movieInDb);
            // Retrieve movie by id from db logic
            // return Ok(movie);
            return Ok(movie);
        }

        // POST api/movie
        [HttpPost]
        public async Task<IActionResult> Post(HttpResponseMessage response)
        {
            var responseData = await response.Content.ReadAsStringAsync();

            var deserialized = JsonConvert.DeserializeObject(responseData);
            
            Movie value = new Movie();
            // Create movie in db logic
            _context.Movies.Add(value);
            _context.SaveChanges();


            return Ok(value);
        }

        // PUT api/movie
        [HttpPut]
        public IActionResult Put([FromBody] Movie movie, int id)
        {
            // Update movie in db logic
            var movieInDb = _context.Movies.Where(m => m.MovieId == id).SingleOrDefault();
            movieInDb.Director = movie.Director;
            movieInDb.Genre = movie.Genre;
            movieInDb.Title = movie.Title;
            _context.SaveChanges();
            return Ok(movie);
        }

        // DELETE api/movie/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var movieInDb = _context.Movies.Where(m => m.MovieId == id).SingleOrDefault();
            _context.Remove(movieInDb);
            _context.SaveChanges();
            // Delete movie from db logic
            return Ok();
        }
    }
}