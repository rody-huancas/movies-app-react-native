import {HttpAdapter} from '../../../config/adapters/http/http.adapter';
import type { Movie } from '../../entities/movie.entity';
import { NowPlayingResponse } from '../../../infrastructure/interfaces/movie-db.responses';

export const moviesNowPlayingUseCase = async (fetcher: HttpAdapter): Promise<Movie[]> => {
  try {
    const nowPlating = await fetcher.get<NowPlayingResponse>('/now_playing');
    console.log({nowPlating});
    return [];
  } catch (error) {
    throw new Error('Error fetching movies - NowPlaying');
  }
};
