import {HttpAdapter} from '../../../config/adapters/http/http.adapter';
import type {Movie} from '../../entities/movie.entity';
import {MovieMapper} from '../../../infrastructure/mappers/movie.mapper';
import {MovieDBMoviesResponse} from '../../../infrastructure/interfaces/movie-db.responses';

export const moviesPopularUseCase = async (fetcher: HttpAdapter): Promise<Movie[]> => {
  try {
    const popular = await fetcher.get<MovieDBMoviesResponse>('/popular');
    return popular.results.map(MovieMapper.fromMovieDBResultToEntity);
  } catch (error) {
    throw new Error('Error fetching movies - PopularUseCase');
  }
};
