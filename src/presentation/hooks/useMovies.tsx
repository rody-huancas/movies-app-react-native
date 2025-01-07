import {useEffect, useState} from 'react';

import * as UseCases from '../../core/use-cases';
import {Movie} from '../../core/entities/movie.entity';
import {movieDBFetcher} from '../../config/adapters/movieDB.adapter';

export const useMovies = () => {
  const [isLoading, setIsLoading]   = useState(true);
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [popular, setPopular]       = useState<Movie[]>([]);
  const [topRated, setTopRated]     = useState<Movie[]>([]);
  const [upcoming, setUpcoming]     = useState<Movie[]>([]);

  useEffect(() => {
    initialLoad();
  }, []);

  const initialLoad = async () => {
    const nowPlayingPromise = await UseCases.moviesNowPlayingUseCase(movieDBFetcher);
    const popularPromise    = await UseCases.moviesPopularUseCase(movieDBFetcher);
    const topRatedPromise   = await UseCases.moviesTopRatedUseCase(movieDBFetcher);
    const upcomingPromise   = await UseCases.moviesUpcomingUseCase(movieDBFetcher,);

    const [
      nowPlayingMovies,
      popularMovies,
      topRatedMovies,
      upcomingMovies
    ] = await Promise.all([
      nowPlayingPromise,
      popularPromise,
      topRatedPromise,
      upcomingPromise,
    ]);

    setNowPlaying(nowPlayingMovies);
    setPopular(popularMovies);
    setTopRated(topRatedMovies);
    setUpcoming(upcomingMovies);

    setIsLoading(false);
  };

  return {
    isLoading,
    nowPlaying,
    popular,
    topRated,
    upcoming
  };
};
