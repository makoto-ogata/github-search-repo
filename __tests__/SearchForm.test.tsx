import { render, screen } from "@testing-library/react";
import { SearchForm } from "@/app/components/SearchForm";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";

const mockPush = vi.fn();

vi.mock("next/navigation", () => ({
	useRouter: () => ({
		push: mockPush,
	}),
}));

describe("SearchForm", () => {
	beforeEach(() => {
		mockPush.mockClear();
		render(<SearchForm />);
	});
	it("入力欄が表示される", () => {
		expect(
			screen.getByPlaceholderText("Search GitHub repositories..."),
		).toBeInTheDocument();
	});
	it("キーワードを入力してEnterを押すとrouterが呼ばれる", async () => {
		const user = userEvent.setup();
		const input = screen.getByPlaceholderText("Search GitHub repositories...");
		await user.type(input, "nextjs{Enter}");
		expect(mockPush).toHaveBeenCalledWith("/?q=nextjs");
	});
});
