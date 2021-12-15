import styled from 'styled-components';
import media from 'styled-media-query';

export const LoadingSpinner = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 16px solid #f3f3f3;
    border-radius: 50%;
    border-top: 16px solid #3498db;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Abel', sans-serif;
    ${media.lessThan('small')`
        max-width: 100vw;
    `}
`;


export const MovieContainer = styled.div`
    background-color: #F2F2F2;
    margin-top: 50px;
    width: 80vw;
`;

export const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #E6E6E6;
`;

export const Title = styled.h2`
    color: #116193;
    padding: 10px;
`;

export const ReleaseDate = styled.p`
    padding: 10px;
`;

export const Main = styled.div`
    display: flex;
`;

export const Content = styled.div``;

export const SinopseTitle = styled.h3`
    color: #048DCE;
    border-bottom-style: solid;
    border-bottom-color: #00E8E4;
    margin: 10px;
    ${media.lessThan('small')`
        max-width: 40vw;
    `}
`;

export const Sinopse = styled.p`
    font-family: 'Lato', sans-serif;
    font-size: 15px;
    margin: 10px;
    ${media.lessThan('small')`
        max-width: 70vw;
    `}
`;

export const InfoTitle = styled.h3`
    color: #048DCE;
    border-bottom-style: solid;
    border-bottom-color: #00E8E4;
    margin: 10px;
    ${media.lessThan('small')`
        max-width: 40vw;
    `}
`;

export const DetailsContainer = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
`;

export const Detail = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
    h4 {
        color: #048DCE;
    }
    p {
        font-family: 'Lato', sans-serif;
        font-size: 12px;
    }
`;

export const GenreContainer = styled.div`
    display: flex;
    padding: 5px;
`;

export const Genre = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #FFFFFF;
    border: 1px;
    margin: 5px;
    padding: 5px;
    border-color: #116193;
    border-style: solid;
    border-radius: 20px;
    width: auto;
    color: #116193;
    font-family: 'Abel', sans-serif;
`;

export const ScoreContainer = styled.div`
    height: 33.5vh;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 2rem ;
`;

export const Score = styled.p`
	font-size: 60px;
	text-align: center;
	color: #00e8e4;
	background-color: #116193;
	border: 10px solid #00e8e4; 
	border-radius: 200px 200px;
	width: 150px;
	height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const MoviePoster = styled.img`
    width: 20vw;
    
    
    ${media.lessThan('small')`
    width: 38%;
    height: 38%;
   
    
    `}
    ${media.lessThan('medium')`
    width: 38%;
    height: 38%;
  
    `}
`;