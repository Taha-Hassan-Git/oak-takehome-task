import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Unit from "./Unit";

// Mock the fetch function
global.fetch = jest.fn();

describe("Unit Component Loading and Error States", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("displays loading state when data is being fetched", () => {
    global.fetch.mockImplementation(() => new Promise(() => {}));

    render(<Unit unitId={1} />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("displays error message when fetch fails", async () => {
    global.fetch.mockImplementation(() =>
      Promise.reject(new Error("Network error"))
    );

    render(<Unit unitId={1} />);

    const errorMessage = await screen.findByText(
      "Error fetching unit and lessons info"
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
