import { expect, test } from "vitest";
import { render, screen, within } from "@testing-library/react";
import Home from "../src/pages";

test("home", () => {
  render(<Home />);
  const main = within(screen.getByRole("article"));
  // Check for the heading with the text "Course Grade Distributions for UNR" in the main section of the page
  expect(
    main.getByRole("heading", {
      level: 1,
      name: /Course Grade Distributions for UNR/i,
    })
  ).toBeDefined();

  // Check for the button with the text "See Grades" in the main section of the page
  expect(
    main.getByRole("button", {
      name: /See Grades/i,
    })
  ).toBeDefined();

  //const button = within(screen.getByRole("button", { name: /See Grades/i })).toBeDefined();
  //expect(button.getByRole("link", { name: /See Grades/i })).toBeDefined();

  // const footer = within(screen.getByRole("contentinfo"));
  // const link = within(footer.getByRole("link"));
  // expect(link.getByRole("img", { name: /vercel logo/i })).toBeDefined();
});
