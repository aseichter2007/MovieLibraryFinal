using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
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
            // Retrieve all movies from db logic
            var movies = _context.Movies;           
            return Ok(movies);
        }

        // GET api/movie/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var movieInDb = _context.Movies.Where(m => m.MovieId == id).SingleOrDefault();
            // Retrieve movie by id from db logic
            // return Ok(movie);
            return Ok(movieInDb);
        }
        [HttpGet]
         [Route("api/movie/{title}/{director}/{genre}/{imgurl}")]

        public IActionResult Get(string title, string director, string genre, string imgurl)
        {
            List<Movie> movies = new List<Movie>();
            if (director != "" && director != null)
            {
                var selection = _context.Movies.Where(m => m.Director.Contains(director));
                foreach (var item in selection)
                {
                    movies.Add(item);
                }
            }
            if (genre != "" && genre != null)
            {
                var selection = _context.Movies.Where(m => m.Genre.Contains(genre));
                foreach (var item in selection)
                {
                    movies.Add(item);
                }
            }
            if (title != "" && title != null)
            {
                var selection = _context.Movies.Where(m => m.Title.Contains(title));
                foreach (var item in selection)
                {
                    movies.Add(item);
                }
            }
            if (imgurl != "" && imgurl != null)
            {
                var selection = _context.Movies.Where(m => m.ImgUrl.Contains(imgurl));
                foreach (var item in selection)
                {
                    movies.Add(item);
                }
            }
            // Retrieve movie by id from db logic
            // return Ok(movie);
            return Ok(movies);
        }


        // POST api/movie
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Movie value)
        {
            // Create movie in db logic
           _context.Movies.Add(value);
            _context.SaveChanges();
            return Ok(value);
        }

        // PUT api/movie
        [HttpPut("{id}")]
        public IActionResult Put([FromBody] Movie movie, int id)
        {
            // Update movie in db logic
            var movieInDb = _context.Movies.Where(m => m.MovieId == id).SingleOrDefault();
            if (movie.Director != "" && movie.Director!=null)
            {
            movieInDb.Director = movie.Director;
            }
            if (movie.Genre !=""&&movie.Genre!=null)
            {
            movieInDb.Genre = movie.Genre;
            }
            if (movie.Title!=""&&movie.Title!=null)
            {
            movieInDb.Title = movie.Title;
            }
            if (movie.ImgUrl !=""&&movie.ImgUrl !=null)
            {
                movieInDb.ImgUrl = movie.ImgUrl;
            }                    
            
            _context.SaveChanges();
            return Ok(movie);
        }

        // DELETE api/movie/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
            var movieInDb = _context.Movies.Where(m => m.MovieId == id).SingleOrDefault();
            _context.Remove(movieInDb);
            _context.SaveChanges();

            }
            catch (Exception)
            {

                return NotFound();
            }
            // Delete movie from db logic
            return Ok();
        }
    }
}