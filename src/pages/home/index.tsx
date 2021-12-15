import { useState, ChangeEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Container,
    SearchInput,
    SingleMovieContent,
    MoviePoster,
    Details,
    Title,
    Score,
    DateRelease,
    Sinopse,
    GenreContainer,
    Genre,
    PageNumbersContainer,
    Page,
    // PlusIcon
} from './styles';
import api from '../../services/api';
import Header from '../../components/Header/index';
// import { PlusCircle } from 'react-feather';

interface Imovie {
  popularity: number;
  vote_count: number;
  budget: number;
  video: boolean;
  poster_path: string;
  status: string;
  spoken_languages: [{
      iso_639_1: string;
      name: string;
  }],
  genres: [{
      id: number;
      name: string;
  }]
  id: number;
  runtime: number;
  adult: boolean;
  revenue: number;
  backdrop_path: string;
  original_language: string;
  original_title: string;
  genre_ids: [number];
  title: string;
  vote_average: number;
  overview: string;
  release_date: number;    
}

interface IGenre {
  id: number;
  name: string;
}
const Home = () => {
    const [dataToSearch, setDataToSearch] = useState<string>('');
    const [arrayOfMovies, setArrayOfMovies] = useState<Imovie[]>([]);
    const [arrayOfGenres, setArrayOfGenres] = useState<IGenre[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);
    // const [pageOfApi, setPageOfApi] = useState<number>(1);
    const moviesPerPage = 5;
    const baseUrlOfPosters = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/';
    const baseUrlofSearch = 'search/movie?api_key=fc86ffd2138d748994445f1d5686e213&language=pt-br&query=';
    const baseUrlOfGenre = 'genre/movie/list?api_key=fc86ffd2138d748994445f1d5686e213&language=pt-br';
    const pageParam = '&page='

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const {value} = event.target;
        setDataToSearch(value);
    }

    useEffect(() => {
        api.get(`${baseUrlofSearch+dataToSearch+pageParam}`).then(response => {
            const moviesQuery = response.data.results;
            const queryPerPage = moviesQuery.slice(
                currentPage*moviesPerPage, 
                currentPage*moviesPerPage+moviesPerPage
            )
            setArrayOfMovies(queryPerPage);
        });
    }, [currentPage, dataToSearch]);

    useEffect(() => {
        api.get(baseUrlOfGenre).then(response => {
            const genreQuery = response.data.genres;
            setArrayOfGenres(genreQuery);
        })
    }, []);

    function getGenre(genreIds: [number], genreList: IGenre[]) {
        const filteredGenres = genreIds.map( id => genreList.find(genre => genre.id === id));
        const newGenre = filteredGenres.map(gen => <Genre>{gen?.name}</Genre>);
        return newGenre;
    }

    return (
        <>
            <Container>
                <Header />

                <SearchInput 
                    placeholder="Busque um filme por nome ou gênero..." 
                    onChange={handleInputChange}
                />

                {/* <h3>Página atual: {currentPage + 1}</h3> */}

                {arrayOfMovies.map(movie => (
                    <Link 
                        to={`/movies/${movie.id}`} 
                        style={{textDecoration: 'none'}} 
                        key={movie.id}
                    >
                        <SingleMovieContent>
                            <MoviePoster src={`${baseUrlOfPosters}${movie.poster_path}`}/>

                            <Details>
                                <Title>
                                    <h2>{movie.title}</h2>
                                </Title>

                                <Score>{(movie.vote_average) * 10}%</Score>

                                <DateRelease>{new Intl.DateTimeFormat('pt-BR').format(
                                new Date(movie.release_date))}
                                </DateRelease>

                                <Sinopse>{movie.overview}</Sinopse>

                                <GenreContainer>
                                    {getGenre(movie.genre_ids, arrayOfGenres)}
                                </GenreContainer>
                            </Details>
                        </SingleMovieContent>
                    </Link>
                ))}

                <PageNumbersContainer>
                    <Page onClick={() => {
                        setCurrentPage(0);
                        window.scrollTo(0,0);
                      
                    }}>1</Page>
                    <Page onClick={() => {
                        setCurrentPage(1);
                        window.scrollTo(0,0);
                    }}>2</Page>
                    <Page onClick={() => {
                        setCurrentPage(2);
                        window.scrollTo(0,0);
                    }}>3</Page>
                    <Page onClick={() => {
                        setCurrentPage(3);
                        window.scrollTo(0,0);
                    }}>4</Page>
                    <Page onClick={() => {
                        setCurrentPage(4);
                        window.scrollTo(0,0);
                    }}>5</Page>

                    
                </PageNumbersContainer>

            </Container>
        </>
    );
}

export default Home;
