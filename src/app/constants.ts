import racingIntoTheNightThumbnail from '../../public/racing_into_the_night.jpg';
import marchSnowThumbNail from '../../public/march_snow.jpg';
import cantTakeMyEyesOffYouThumbnail from '../../public/cant_take_my_eyes_off_you.jpg';

// TODO: try SQL Lite?
export const sheetMusicData = [
    {
      id: 1,
      title: "Racing Into the Night",
      composer: "YOASOBI",
      year: 2019,
      src: racingIntoTheNightThumbnail,
      fullImage:
        "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800&h=1200&fit=crop",
      difficulty: "Intermediate",
    },
    {
      id: 2,
      title: "March Snow",
      composer: "July",
      year: 2019,
      src: marchSnowThumbNail,
      fullImage:
        "https://images.unsplash.com/photo-1593169158019-e33d5a325c4c?w=800&h=1200&fit=crop",
      difficulty: "Beginner",
    },
    {
      id: 3,
      title: "Can't Take My Eyes Off You",
      composer: "Frankie Valli",
      year: 1967,
      src: cantTakeMyEyesOffYouThumbnail,
      fullImage:
        "https://images.unsplash.com/photo-1514119412350-e174d90d280e?w=800&h=1200&fit=crop",
      difficulty: "Advanced",
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