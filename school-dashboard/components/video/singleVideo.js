import styled from "styled-components";
export default function SingleVideo({ video }) {
  const isYouTube = video.type === "youtube";
  const isGoogle = video.type === "google drive";

  const VideoStyles = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `;

  const getEmbedComponent = (video) => {
    if (isYouTube) {
      return (
        <VideoStyles title={video.name + " - " + video.description}>
          {video.name}
          <iframe
            title={video.name + video.description}
            src={`https://www.youtube.com/embed/${video.link}`}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            width="400"
            height="300"
          />
          {video.description}
        </VideoStyles>
      );
    } else if (isGoogle) {
      return (
        <VideoStyles title={video.name + " - " + video.description}>
          {video.name}
          <iframe
            title={video.name + video.description}
            src={`https://drive.google.com/file/d/${video.link}/preview`}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            width="400"
            height="300"
          />
          {video.description}
        </VideoStyles>
      );
    }
  };

  return getEmbedComponent(video);
}
