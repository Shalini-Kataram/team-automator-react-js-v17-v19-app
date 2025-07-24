import { test, expect } from "@playwright/test";

// test.beforeEach(async ({ page }) => {
//   await page.goto("/");
// });

test.describe("Task Management UI", () => {
  test("should display the app title", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("app-title")).toBeVisible();
  });

  test("should show the Tasks section", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("tasks")).toBeVisible();
  });

  test("should display the Add New Task button", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("add-task-btn")).toBeVisible();
  });

  test("should navigate to task creation page on button click", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.getByTestId("popup-box")).not.toBeVisible();
    await page.getByTestId("add-task-btn").click();
    await expect(page.getByTestId("popup-box")).toBeVisible();
  });
});

test.describe("Task Form UI", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("add-task-btn").click();
  });

  test("should render form fields", async ({ page }) => {
    await expect(page.getByTestId("task-title")).toBeVisible();
    await expect(page.getByTestId("task-desc")).toBeVisible();
    await expect(page.getByTestId("save-task")).toBeVisible();
  });

  test("should allow entering title and description", async ({ page }) => {
    await page.getByTestId("task-title").fill("Fix login bug");
    await page
      .getByTestId("task-desc")
      .fill("Resolve login issue affecting mobile users");
    await expect(page.getByTestId("task-title")).toHaveValue("Fix login bug");
    await expect(page.getByTestId("task-desc")).toHaveValue(
      "Resolve login issue affecting mobile users"
    );
  });

  test("should select priority level", async ({ page }) => {
    await page.getByTestId("priority-high").click();
    await expect(page.getByTestId("priority-high")).toHaveClass(/selected/);
  });

  test("should select task status", async ({ page }) => {
    await page.getByTestId("status-inprogress").click();
    await expect(page.getByTestId("status-inprogress")).toHaveClass(/selected/);
  });

  test("should submit the task form", async ({ page }) => {
    await page.getByTestId("task-title").fill("Write Playwright tests");
    await page
      .getByTestId("task-desc")
      .fill("Create task form validation tests");
    await page.getByTestId("priority-medium").click();
    await page.getByTestId("status-start").click();
    await page.getByTestId("save-task").click();
  });
});
