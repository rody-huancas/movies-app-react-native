import {HttpAdapter} from '../../../config/adapters/http/http.adapter';
import type {Movie} from '../../entities/movie.entity';
import {MovieMapper} from '../../../infrastructure/mappers/movie.mapper';
import {MovieDBMoviesResponse} from '../../../infrastructure/interfaces/movie-db.responses';

export const moviesUpcomingUseCase = async (fetcher: HttpAdapter): Promise<Movie[]> => {
  try {
    const upcoming = await fetcher.get<MovieDBMoviesResponse>('/upcoming');
    return upcoming.results.map(MovieMapper.fromMovieDBResultToEntity);
  } catch (error) {
    throw new Error('Error fetching movies - UpcomingUseCase');
  }
};
