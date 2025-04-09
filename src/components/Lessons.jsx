export function Lessons({ lessons }) {
  const lessonCount = lessons.length;
  //   some lessons have orderInUnit and some have recommendedOrderInUnit
  //  sort by orderinUnit if it exists, otherwise sort by recommendedOrderInUnit
  // if they're the same then sort alphabetically by title
  const lessonsInOrder = lessons.sort((a, b) => {
    const aOrder = a.orderInUnit ?? a.recommendedOrderInUnit ?? 0;
    const bOrder = b.orderInUnit ?? b.recommendedOrderInUnit ?? 0;
    if (aOrder === bOrder) {
      return a.title.localeCompare(b.title);
    }
    return aOrder - bOrder;
  });
  return (
    <div>
      <p>{lessonCount} lessons available:</p>
      <ol>
        {lessonsInOrder.map((lesson) => (
          // Use titles rather than id, because the db contains duplicate ids
          <li key={lesson.title}>
            <Lesson lesson={lesson} />
          </li>
        ))}
      </ol>
    </div>
  );
}

function Lesson({ lesson }) {
  return (
    <>
      <h3>{lesson.title}</h3>
      <ul>
        {lesson.learningObjectives.map((objective) => (
          <li key={lesson.id + objective}>
            <p>{objective}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
