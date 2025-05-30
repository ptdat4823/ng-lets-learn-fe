import { PageTopic, TopicType } from '@shared/models/topic';

export const mockPage: PageTopic = {
  id: '6',
  title: 'Astronomy conception',
  sectionId: '1',
  type: TopicType.PAGE,
  data: {
    description:
      'This page contains a variety of questions to test your basic knowledge of Astronomy. At the end of the quiz you will be given your score with suggestions for improvement.',
    content: `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333">
  <h2 style="font-size: 16px; margin-bottom: 24px">Introduction to Astronomy</h2>
  <p style="font-size: 14px">
    Astronomy is the scientific study of celestial objects such as stars,
    planets, comets, and galaxies, as well as phenomena that occur outside
    Earth's atmosphere. It aims to explain the origins, evolution, and eventual
    fate of the universe. By studying the light and radiation emitted by these
    objects, astronomers uncover the mysteries of space and gain a better
    understanding of our place in the cosmos.
  </p>
  <p style="font-size: 14px">
    In this section, you will explore the fundamental concepts of astronomy,
    including:
  </p>
  <ul style="font-size: 14px; padding-left: 20px">
    <li>The solar system and its planets</li>
    <li>Star formation and life cycles</li>
    <li>The mysteries of black holes</li>
    <li>Exoplanets and the search for extraterrestrial life</li>
    <li>The expansion of the universe and cosmology</li>
  </ul>

  <h3 style="font-size: 16px; margin-top: 24px">The Life Cycle of Stars</h3>
  <p style="font-size: 14px">
    Below is an educational video that explains the birth, evolution, and death
    of stars. Understanding stellar life cycles helps us comprehend the larger
    processes at work in the universe, from the creation of elements to the
    development of planetary systems.
  </p>

  <div style="margin-top: 16px">
    <img
      src="https://img.freepik.com/premium-vector/astronomical-telescope-looks-into-space-space-planets-stars-comets-through-telescope-vector_625536-3292.jpg"
      alt="Educational video about the life cycle of stars"
      style="width: 100%; max-width: 500px; border-radius: 8px"
    />
  </div>
</div>
`,
  },
};
