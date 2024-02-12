import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-vocie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    getAll(): Movie[] {
        return this.movies;
    }

    // getOne(id: number): Movie {
    //     const movie = this.movies.find(movie => movie.id === id);
    //     console.log(typeof movie.id)
    //     if (!movie) {
    //         throw new NotFoundException(`Movie with ID ${id} not found.`);
    //     }
    //     return movie;
    // }
    getOne(id: number): Movie {
        const movie = this.movies.find(movie => movie.id === id);
        if (!movie) {
          throw new NotFoundException(`Movie with ID ${id} not found.`);
        }
        return movie;
      }

    deleteOne(id: number) {
        this.getOne(id);
        this.movies = this.movies.filter(movie => movie.id !== id);
    }

    create(movieData: CreateMovieDto) {
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData,
        });
    }

    update(id: number, updateData: UpdateMovieDto) {
        const movie = this.getOne(id);
        this.deleteOne(id);
        this.movies.push({ ...movie, ...updateData });
    }

    search(year: string): Movie[] {
        return this.movies.filter(movie => movie.year === +year);
    }

    getGenres(): string[] {
        const genres = this.movies.map(movie => movie.genres).flat();
        return Array.from(new Set(genres));
    }

    getGenre(genre: string): Movie[] {
        return this.movies.filter(movie => movie.genres.includes(genre));
    }

    getYear(year: string): Movie[] {
        return this.movies.filter(movie => movie.year === +year);
    }

    getYearRange(start: string, end: string): Movie[] {
        return this.movies.filter(movie => movie.year >= +start && movie.year <= +end);
    }

}
