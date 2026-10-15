import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./store/store";

beforeEach(() => {
  window.matchMedia = jest.fn().mockReturnValue({
    matches: false,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn(),
  });
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    headers: { get: () => null },
  });
});

const renderAt = (path) =>
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    </Provider>
  );

test("renders the home page", () => {
  renderAt("/");
  expect(screen.getByText("Full Stack Developer")).toBeInTheDocument();
});

test("redirects /experience to the first company", () => {
  renderAt("/experience");
  expect(
    screen.getByText(/Software Engineer - Middle Office/)
  ).toBeInTheDocument();
});

test("renders a company's experience by id", () => {
  renderAt("/experience/airbus");
  expect(screen.getByText("Jan 2023 - Sept 2023")).toBeInTheDocument();
});
