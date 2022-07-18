import { render } from "@testing-library/react";
import FAQList from "./components/FAQ/FAQEU/index";

describe("Render component test", () => {
  it("Rendered component", () => {
    const { getByTestId } = render(<FAQList />);
    const div = getByTestId("divTest");
    expect(div).toBeTruthy();
  });
});
