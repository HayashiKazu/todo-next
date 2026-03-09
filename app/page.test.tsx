import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "./page";

describe("TODOリスト", () => {
  describe("初期表示", () => {
    it("タイトルが表示される", () => {
      render(<Home />);
      expect(screen.getByText("TODOリスト")).toBeInTheDocument();
    });

    it("空状態のメッセージが表示される", () => {
      render(<Home />);
      expect(screen.getByText("タスクがありません")).toBeInTheDocument();
    });

    it("追加ボタンが無効状態になっている", () => {
      render(<Home />);
      expect(screen.getByRole("button", { name: "追加" })).toBeDisabled();
    });
  });

  describe("タスクの追加", () => {
    it("テキストを入力すると追加ボタンが有効になる", async () => {
      const user = userEvent.setup();
      render(<Home />);

      await user.type(screen.getByPlaceholderText("タスクを入力..."), "買い物");
      expect(screen.getByRole("button", { name: "追加" })).toBeEnabled();
    });

    it("追加ボタンをクリックするとタスクが追加される", async () => {
      const user = userEvent.setup();
      render(<Home />);

      await user.type(screen.getByPlaceholderText("タスクを入力..."), "買い物");
      await user.click(screen.getByRole("button", { name: "追加" }));

      expect(screen.getByText("買い物")).toBeInTheDocument();
    });

    it("Enterキーでタスクが追加される", async () => {
      const user = userEvent.setup();
      render(<Home />);

      await user.type(screen.getByPlaceholderText("タスクを入力..."), "掃除{Enter}");

      expect(screen.getByText("掃除")).toBeInTheDocument();
    });

    it("追加後に入力欄がクリアされる", async () => {
      const user = userEvent.setup();
      render(<Home />);

      const input = screen.getByPlaceholderText("タスクを入力...");
      await user.type(input, "買い物");
      await user.click(screen.getByRole("button", { name: "追加" }));

      expect(input).toHaveValue("");
    });

    it("空白のみのタスクは追加されない", async () => {
      const user = userEvent.setup();
      render(<Home />);

      await user.type(screen.getByPlaceholderText("タスクを入力..."), "   ");
      expect(screen.getByRole("button", { name: "追加" })).toBeDisabled();
    });

    it("複数のタスクを追加できる", async () => {
      const user = userEvent.setup();
      render(<Home />);

      const input = screen.getByPlaceholderText("タスクを入力...");
      await user.type(input, "タスク1");
      await user.click(screen.getByRole("button", { name: "追加" }));
      await user.type(input, "タスク2");
      await user.click(screen.getByRole("button", { name: "追加" }));

      expect(screen.getByText("タスク1")).toBeInTheDocument();
      expect(screen.getByText("タスク2")).toBeInTheDocument();
    });
  });

  describe("タスクの完了/未完了", () => {
    it("チェックボックスをクリックするとタスクが完了状態になる", async () => {
      const user = userEvent.setup();
      render(<Home />);

      await user.type(screen.getByPlaceholderText("タスクを入力..."), "買い物");
      await user.click(screen.getByRole("button", { name: "追加" }));

      const checkbox = screen.getByRole("checkbox");
      await user.click(checkbox);

      expect(checkbox).toBeChecked();
      expect(screen.getByText("買い物")).toHaveClass("line-through");
    });

    it("完了状態のタスクを再度クリックすると未完了に戻る", async () => {
      const user = userEvent.setup();
      render(<Home />);

      await user.type(screen.getByPlaceholderText("タスクを入力..."), "買い物");
      await user.click(screen.getByRole("button", { name: "追加" }));

      const checkbox = screen.getByRole("checkbox");
      await user.click(checkbox);
      await user.click(checkbox);

      expect(checkbox).not.toBeChecked();
      expect(screen.getByText("買い物")).not.toHaveClass("line-through");
    });
  });

  describe("タスクの削除", () => {
    it("削除ボタンをクリックするとタスクが削除される", async () => {
      const user = userEvent.setup();
      render(<Home />);

      await user.type(screen.getByPlaceholderText("タスクを入力..."), "買い物");
      await user.click(screen.getByRole("button", { name: "追加" }));

      await user.click(screen.getByRole("button", { name: "削除" }));

      expect(screen.queryByText("買い物")).not.toBeInTheDocument();
      expect(screen.getByText("タスクがありません")).toBeInTheDocument();
    });

    it("完了済みを削除ボタンで完了タスクのみ削除される", async () => {
      const user = userEvent.setup();
      render(<Home />);

      const input = screen.getByPlaceholderText("タスクを入力...");
      await user.type(input, "タスク1");
      await user.click(screen.getByRole("button", { name: "追加" }));
      await user.type(input, "タスク2");
      await user.click(screen.getByRole("button", { name: "追加" }));

      const checkboxes = screen.getAllByRole("checkbox");
      await user.click(checkboxes[0]);

      await user.click(screen.getByRole("button", { name: "完了済みを削除" }));

      expect(screen.queryByText("タスク1")).not.toBeInTheDocument();
      expect(screen.getByText("タスク2")).toBeInTheDocument();
    });
  });

  describe("カウンター表示", () => {
    it("タスクがあると残件数が表示される", async () => {
      const user = userEvent.setup();
      render(<Home />);

      await user.type(screen.getByPlaceholderText("タスクを入力..."), "タスク1");
      await user.click(screen.getByRole("button", { name: "追加" }));

      expect(screen.getByText("1 件残っています")).toBeInTheDocument();
    });

    it("タスクを完了すると残件数が減る", async () => {
      const user = userEvent.setup();
      render(<Home />);

      const input = screen.getByPlaceholderText("タスクを入力...");
      await user.type(input, "タスク1");
      await user.click(screen.getByRole("button", { name: "追加" }));
      await user.type(input, "タスク2");
      await user.click(screen.getByRole("button", { name: "追加" }));

      await user.click(screen.getAllByRole("checkbox")[0]);

      expect(screen.getByText("1 件残っています")).toBeInTheDocument();
      expect(screen.getByText("1/2 件完了")).toBeInTheDocument();
    });

    it("完了タスクがないと「完了済みを削除」ボタンが表示されない", async () => {
      const user = userEvent.setup();
      render(<Home />);

      await user.type(screen.getByPlaceholderText("タスクを入力..."), "タスク1");
      await user.click(screen.getByRole("button", { name: "追加" }));

      expect(screen.queryByRole("button", { name: "完了済みを削除" })).not.toBeInTheDocument();
    });
  });
});
