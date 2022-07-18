import { render, screen } from "@testing-library/react";
import RecentAppConfigList from "./index";

describe("Render component test", () => {
  it("Rendered component", () => {
    const { getByTestId } = render(<RecentAppConfigList />);
    const div = getByTestId("divShows");
    expect(div).toBeTruthy();
  });
});
