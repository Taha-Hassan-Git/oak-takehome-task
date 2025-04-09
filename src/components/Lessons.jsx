export function Lessons({ lessons }) {
  const lessonCount = lessons.length;
  const lessonsInOrder = lessons.sort(
    (a, b) => a.recommendedOrderInUnit - b.recommendedOrderInUnit
  );
  return (
    <div>
      <p>{lessonCount} lessons available:</p>
      <ol>
        {lessonsInOrder.map((lesson) => (
          <li key={lesson.id}>
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
