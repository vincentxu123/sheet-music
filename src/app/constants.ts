import racingIntoTheNightThumbnail from '../../public/racing_into_the_night/thumbnail.jpg';
import marchSnowThumbNail from '../../public/march_snow/thumbnail.jpg';
import cantTakeMyEyesOffYouThumbnail from '../../public/cant_take_my_eyes_off_you/thumbnail.jpg';
import redBeanThumbnail from '../../public/red_bean/thumbnail.png';

import { StaticImageData } from 'next/image';

type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced'

export interface SelectedSong {
  id: number;
  title: string;
  composer: string;
  year: number;
  thumbnail: StaticImageData;
  fullSheets: string;
  difficulty: Difficulty;
  musescoreLink: string;
}

export const sheetMusicData: SelectedSong[] = [
    {
      id: 1,
      title: "Racing Into The Night",
      composer: "YOASOBI",
      year: 2019,
      thumbnail: racingIntoTheNightThumbnail,
      fullSheets: "/racing_into_the_night/full_sheets.pdf",
      difficulty: "Intermediate",
      musescoreLink: "https://musescore.com/user/14842106/scores/24385660/s/4mReTU",
    },
    {
      id: 2,
      title: "March Snow",
      composer: "July",
      year: 2019,
      thumbnail: marchSnowThumbNail,
      fullSheets: "/march_snow/full_sheets.pdf",
      difficulty: "Beginner",
      musescoreLink: "https://musescore.com/user/14842106/scores/24385654/s/pVIRyM",
    },
    {
      id: 3,
      title: "Can't Take My Eyes Off You",
      composer: "Frankie Valli",
      year: 1967,
      thumbnail: cantTakeMyEyesOffYouThumbnail,
      fullSheets: "/cant_take_my_eyes_off_you/full_sheets.pdf",
      difficulty: "Advanced",
      musescoreLink: "https://musescore.com/user/14842106/scores/24385639/s/JbJKsD",
    },
    {
      id: 4,
      title: "紅豆",
      composer: "Faye Wong",
      year: 1998,
      thumbnail: redBeanThumbnail,
      fullSheets: "/red_bean/full_sheets.pdf",
      difficulty: "Intermediate",
      musescoreLink: "https://musescore.com/user/14842106/scores/24540634/s/vayKDh",
    },
  ];