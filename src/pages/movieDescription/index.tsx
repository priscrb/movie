import { useEffect, useState } from "react";
import {
  LoadingSpinner,
  Wrapper,
  MovieContainer,
  TitleContainer,
  Title,
  ReleaseDate,
  Main,
  Content,
  SinopseTitle,
  Sinopse,
  InfoTitle,
  DetailsContainer,
  Detail,
  GenreContainer,
  Genre,
  ScoreContainer,
  Score,
  MoviePoster,
} from "./styles";
import Header from "../../components/Header/index";
import { RouteComponentProps } from "react-router-dom";
import api from "../../services/api";

type IProps = RouteComponentProps<{ id: string }>;

const MovieDescription = (props: IProps) => {
  const { id } = props.match.params;
  const [chosenMovie, setChosenMovie] = useState<Imovie>();
  const [video, setVideo] = useState();
  const apiKey = "7d2986a61ade060274b2a0ef6bf7fb3d";
  const baseUrlOfPosters = "https://image.tmdb.org/t/p/w600_and_h900_bestv2/";
  const languageParam = "language=pt-br";

  useEffect(() => {
    api
      .get(`/movie/${id}?api_key=${apiKey}&${languageParam}`)
      .then((response) => {
        const { data } = response;
        setChosenMovie(data);
      });
  }, [id]);

  const fetchVideo = async () => {
    const { data } = await api.get(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`
    );

    setVideo(data.results[0]?.key);
  };

  useEffect(() => {
    fetchVideo();
    // eslint-disable-next-line
  }, []);

  if (!chosenMovie) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Wrapper>
        <Header />
        <MovieContainer>
          <TitleContainer>
            <Title>{chosenMovie?.title}</Title>
            <ReleaseDate>
              {new Intl.DateTimeFormat("pt-BR").format(
                new Date(chosenMovie?.release_date)
              )}
            </ReleaseDate>
          </TitleContainer>

          <Main>
            <Content>
              <SinopseTitle>Sinopse</SinopseTitle>

              <Sinopse>{chosenMovie?.overview}</Sinopse>

              <InfoTitle>Informações</InfoTitle>

              <DetailsContainer>
                <Detail>
                  <h4>Situação</h4>
                  <p>{chosenMovie?.status}</p>
                </Detail>
                <Detail>
                  <h4>Idioma</h4>
                  {chosenMovie?.spoken_languages.map((lang) => (
                    <p>{lang.name}</p>
                  ))}
                </Detail>
                <Detail>
                  <h4>Duração</h4>
                  <p>{chosenMovie?.runtime} minutos</p>
                </Detail>
                <Detail>
                  <h4>Orçamento</h4>
                  <p>US$ {chosenMovie?.budget}</p>
                </Detail>

                <Detail>
                  <h4>Receita</h4>
                  <p>US$ {chosenMovie?.revenue}</p>
                </Detail>
                <Detail>
                  <h4>Lucro</h4>
                  <p>US$ {chosenMovie.revenue - chosenMovie.budget}</p>
                </Detail>
              </DetailsContainer>

              <GenreContainer>
                {chosenMovie.genres.map((genre) => (
                  <Genre>{genre.name}</Genre>
                ))}
              </GenreContainer>

              <ScoreContainer>
                <Score>{chosenMovie?.vote_average * 10}%</Score>
              </ScoreContainer>
            </Content>

            <MoviePoster src={baseUrlOfPosters + chosenMovie.poster_path} />
          </Main>
        </MovieContainer>
        <div className="video-responsive">
          <iframe
            width="853"
            height="480"
            src={`https://www.youtube.com/embed/${video}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
        </div>
      </Wrapper>
    </>
  );
};

export default MovieDescription;
