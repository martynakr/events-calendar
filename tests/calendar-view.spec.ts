import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto("http://127.0.0.1:5173/");
});

test.describe("Calendar view", () => {
    const currentMonth = new Date().toLocaleString("default", {
        month: "long",
    });
    const currentYear = new Date().getFullYear();
    test("should render current month and year", async ({ page }) => {
        const monthYearHeading = await page.getByRole("heading");
        const allText = await monthYearHeading.innerText();
        expect(allText).toBe(`${currentMonth} ${currentYear}`);
    });
    test("should render a TODAY button that takes the user back to current month", async ({
        page,
    }) => {
        const today = await page.getByText("today");
        const nextMonth = await page.getByTestId("nextBtn");
        await nextMonth.click();
        await nextMonth.click();
        await today.click();
        const monthYearHeading = await page.getByRole("heading");
        const allText = await monthYearHeading.innerText();
        expect(allText).toBe(`${currentMonth} ${currentYear}`);
    });

    test("should have buttons to switch to next and previous month", async ({
        page,
    }) => {
        const nextMonth = await page.getByTestId("nextBtn");
        const prevMonth = await page.getByTestId("prevBtn");
        await prevMonth.click();
        const monthYearHeading = await page.getByRole("heading");
        const todayDate = new Date();
        todayDate.setMonth(todayDate.getMonth() - 1);
        const previousMonthName = todayDate.toLocaleString("default", {
            month: "long",
        });

        const allText = await monthYearHeading.innerText();
        expect(allText).toContain(`${previousMonthName}`);
        await nextMonth.click();
        await nextMonth.click();
        todayDate.setMonth(todayDate.getMonth() + 2);
        const nextMonthName = todayDate.toLocaleString("default", {
            month: "long",
        });

        const updatedHeading = await page.getByRole("heading");
        const updatedAllText = await updatedHeading.innerText();
        expect(updatedAllText).toContain(nextMonthName);

        // if else for Jan and Dec to check the year as well?
    });

    test("should render a table with 7 columns with days of the week", async ({
        page,
    }) => {
        const table = await page.getByRole("table");
        const headerColumns = table.locator("thead th");
        const colAmount = await headerColumns.count();
        expect(colAmount).toBe(7);
        const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
        const colTexsts = await headerColumns.allInnerTexts();
        expect(colTexsts).toEqual(days);
    });

    test("should render a table with all current month days, days from previous and month to make it full weeks", async ({
        page,
    }) => {
        // render a component and pass props instead?
        const todayDate = new Date();
        const year = todayDate.getFullYear();
        const month = todayDate.getMonth();
        const currMontDaysAm = new Date(year, month + 1, 0).getDate();
        const prevMonthDaysAm = new Date(year, month, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();
        const lastDay = new Date(year, month, currMontDaysAm + 1).getDay();
        const days: string[] = [];
        for (let i = 1; i <= currMontDaysAm; i++) {
            days.push(
                i.toString().length === 1 ? `0${i.toString()}` : i.toString()
            );
        }
        let toAdd = prevMonthDaysAm;
        for (let i = 1; i <= firstDay; i++) {
            days.unshift(toAdd.toString());
            toAdd--;
        }
        console.log(days);

        for (let i = 1; i <= 7 - lastDay; i++) {
            days.push(
                i.toString().length === 1 ? `0${i.toString()}` : i.toString()
            );
        }

        const table = await page.getByRole("table");
        const tableData = table.locator("td");
        const allData = await tableData.allInnerTexts();
        expect(allData.map((d) => d.trim().substring(0, 2))).toEqual(days);
    });

    // test("should show previous and next month days in grey", async ({
    //     page,
    // }) => {});

    test("should show current day in blue", async ({ page }) => {
        const today = new Date().getDate();
        console.log(today);
        const foundDay = page.getByText(today.toString());
        const count = await foundDay.count();
    });

    test("should open a modal when a cell is clicked", async ({ page }) => {});
});
