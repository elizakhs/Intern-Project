import { render } from "@testing-library/react";
import BookmarkIcon from "./components/Bookmark/BookmarkRNPopup/index";

describe("Render component test", () => {
  it("Rendered component", () => {
    const { getByTestId } = render(<BookmarkIcon />);
    const div = getByTestId("divTest");
    expect(div).toBeTruthy();
  });
});
