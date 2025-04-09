import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { UnitInfo } from "./components/UnitInfo";
import { Lessons } from "./components/Lessons";

describe("UnitInfo Component...", () => {
  test("displays a heading with the title of the unit", async () => {
    render(<UnitInfo info={mockUnitInfo} />);
    // Implicitly checks there is only 1 h1 element
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent(mockUnitInfo.title);
  });

  test("displays a heading with the keystage and subject for the unit", async () => {
    render(<UnitInfo info={mockUnitInfo} />);
    const [keyStageHeading, subjectHeading] = screen.getAllByRole("heading", {
      level: 2,
    });
    expect(keyStageHeading).toHaveTextContent(mockUnitInfo.unitInfo.keyStage);
    expect(subjectHeading).toHaveTextContent(mockUnitInfo.unitInfo.subject);
  });
});

describe("Lessons Component...", () => {
  test("displays the number of lessons for a given unit", async () => {
    render(<Lessons lessons={mockLessons} />);
    expect(screen.getByText(/6 lessons available:/i)).toBeInTheDocument();
  });
});
test("displays a list of all the lesson titles for a given unit as H3 elements", async () => {
  render(<Lessons lessons={mockLessons} />);
  const lessonTitles = mockLessons.map((lesson) => lesson.title);
  for (const lessonTitle of lessonTitles) {
    const heading = screen.getByRole("heading", {
      level: 3,
      name: lessonTitle,
    });
    expect(heading).toBeInTheDocument();
  }
});

test("displays the learning objectives for each lesson", async () => {
  render(<Lessons lessons={mockLessons} />);
  const learningObjectives = mockLessons
    .filter((lesson) => lesson.learningObjectives.length > 0)
    .flatMap((lesson) => lesson.learningObjectives);

  for (const objective of learningObjectives) {
    expect(screen.getByText(objective)).toBeInTheDocument();
  }
});

const mockUnitInfo = {
  title: "Trigonometry 1",
  unitInfo: {
    keyStage: "KS3",
    subject: "Maths",
  },
};

const mockLessons = [
  {
    unitId: 2,
    id: 1,
    title: "Using the sine rule",
    orderInUnit: 1,
    learningObjectives: [],
  },
  {
    unitId: 1,
    id: 1,
    title: "Use tangent to find a length",
    recommendedOrderInUnit: 2,
    learningObjectives: [
      "In this lesson we'll learn how to correctly label a right-angled triangle",
    ],
  },
  {
    unitId: 1,
    id: 1,
    title: "Use sine and cosine to find a length",
    recommendedOrderInUnit: 3,
    learningObjectives: [
      "In this lesson, we will calculate missing lengths using sine and cosine trigonometric ratios.",
    ],
  },
  {
    unitId: 1,
    id: 1,
    title: "Know tangent, sine and cosine",
    recommendedOrderInUnit: 4,
    learningObjectives: [
      "In this lesson, we will learn how to correctly label a right-angled triangle, and identify the correct trigonometric ratio to use.",
    ],
  },
  {
    unitId: 1,
    id: 1,
    title: "Applying trigonometry",
    recommendedOrderInUnit: 1,
    learningObjectives: [],
  },

  {
    unitId: 2,
    id: 3,
    title: "Calculating angles with sine",
    orderInUnit: 1,
    learningObjectives: [],
  },
];
