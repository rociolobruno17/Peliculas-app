import { useTrendingMovies } from "../hooks/useTrendingMovies";
import { usePopularMovies } from "../hooks/usePopularMovies";
import { useTopRatedMovies } from "../hooks/useTopRatedMovies";

export default function Home() {
  const { trendingMovies, loading } = useTrendingMovies();
  const { movies } = usePopularMovies();
  const { topRatedMovies } = useTopRatedMovies();

  const imgPath = "https://image.tmdb.org/t/p/w500";

  const gridContainer = {
    display: "flex",
    flexWrap: "wrap",
    gap: "2rem",
    justifyContent: "center",
    padding: "1rem 0",
  };

  const trendingCardStyle = {
    width: "300px",
    backgroundColor: "#f0f0f0",
    borderRadius: "10px",
    padding: "1rem",
  };

  const posterStyle = {
    width: "100%",
    borderRadius: "8px",
  };

  const movieCardStyle = {
    width: "200px",
    textAlign: "center",
  };

  return (
    <div>
      <section>
        <h2>🔥 Películas en Tendencia</h2>
        {loading ? (
          <p>Cargando películas...</p>
        ) : (
          <div style={gridContainer}>
            {trendingMovies.map((movie) => (
              <div key={movie.id} style={trendingCardStyle}>
                <img
                  src={`${imgPath}${movie.poster_path}`}
                  alt={movie.title}
                  style={posterStyle}
                />
                <h3>{movie.title}</h3>
                <p><strong>⭐ {movie.vote_average}</strong></p>
                <p>
                  {movie.overview.length > 150
                    ? movie.overview.slice(0, 150) + "..."
                    : movie.overview}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2>🌟 Películas Mejor Puntuadas</h2>
        <div style={gridContainer}>
          {topRatedMovies.slice(0, 10).map((movie) => (
            <div key={movie.id} style={movieCardStyle}>
              <img
                src={`${imgPath}${movie.poster_path}`}
                alt={movie.title}
                width={200}
              />
              <p>{movie.title}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>🎬 Películas Populares</h2>
        <div style={gridContainer}>
          {movies.slice(0, 10).map((movie) => (
            <div key={movie.id} style={movieCardStyle}>
              <img
                src={`${imgPath}${movie.poster_path}`}
                alt={movie.title}
                width={200}
              />
              <p>{movie.title}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
