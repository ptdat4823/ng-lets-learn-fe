import { IMAGE_PATHS } from '@shared/constants/images';

export const GetRandomCourseBackground = (): string => {
  const backgrounds = [
    IMAGE_PATHS.DEFAULT_COURSE_BACKGROUND_1,
    IMAGE_PATHS.DEFAULT_COURSE_BACKGROUND_2,
    IMAGE_PATHS.DEFAULT_COURSE_BACKGROUND_3,
    IMAGE_PATHS.DEFAULT_COURSE_BACKGROUND_4,
    IMAGE_PATHS.DEFAULT_COURSE_BACKGROUND_5,
    IMAGE_PATHS.DEFAULT_COURSE_BACKGROUND_6,
  ];
  const randomIndex = Math.floor(Math.random() * backgrounds.length);
  return backgrounds[randomIndex];
};
