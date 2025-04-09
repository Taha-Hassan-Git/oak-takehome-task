export function Lessons({ lessons }) {
  const lessonCount = lessons.length;
  //   some lessons have orderInUnit and some have recommendedOrderInUnit
  //  sort by orderinUnit if it exists, otherwise sort by recommendedOrderInUnit
  const lessonsInOrder = lessons.sort((a, b) => {
    const aOrder = a.orderInUnit || a.recommendedOrderInUnit;
    const bOrder = b.orderInUnit || b.recommendedOrderInUnit;
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
