import racingIntoTheNightThumbnail from '../../public/racing_into_the_night/thumbnail.jpg';
import marchSnowThumbNail from '../../public/march_snow/thumbnail.jpg';
import cantTakeMyEyesOffYouThumbnail from '../../public/cant_take_my_eyes_off_you/thumbnail.jpg';
import { StaticImageData } from 'next/image';

export interface SelectedSong {
  id: number;
  title: string;
  composer: string;
  year: number;
  src: StaticImageData;
  fullSheets: string;
  difficulty: string;
  musescoreLink: string;
}

// TODO: try SQL Lite?
export const sheetMusicData = [
    {
      id: 1,
      title: "Racing Into the Night",
      composer: "YOASOBI",
      year: 2019,
      src: racingIntoTheNightThumbnail,
      fullSheets: "/racing_into_the_night/full_sheets.pdf",
      difficulty: "Intermediate",
      musescoreLink: "https://musescore.com/user/14842106/scores/24385660/s/4mReTU",
    },
    {
      id: 2,
      title: "March Snow",
      composer: "July",
      year: 2019,
      src: marchSnowThumbNail,
      fullSheets: "/march_snow/full_sheets.pdf",
      difficulty: "Beginner",
      musescoreLink: "https://musescore.com/user/14842106/scores/24385654/s/pVIRyM",
    },
    {
      id: 3,
      title: "Can't Take My Eyes Off You",
      composer: "Frankie Valli",
      year: 1967,
      src: cantTakeMyEyesOffYouThumbnail,
      fullSheets: "/cant_take_my_eyes_off_you/full_sheets.pdf",
      difficulty: "Advanced",
      musescoreLink: "https://musescore.com/user/14842106/scores/24385639/s/JbJKsD",
    },
    // {
    //   id: 4,
    //   title: "Nocturne in E-flat major",
    //   composer: "Frédéric Chopin",
    //   year: 1830,
    //   src: "https://images.unsplash.com/photo-1551225183-94acb7d595b6?w=400&h=300&fit=crop",
    //   fullImage:
    //     "https://images.unsplash.com/photo-1551225183-94acb7d595b6?w=800&h=1200&fit=crop",
    //   difficulty: "Advanced",
    // },
  ];