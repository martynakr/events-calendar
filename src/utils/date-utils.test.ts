import {
    createNestedWeeksArr,
    generateMonthDays,
    getMissingNextMonthDays,
    getMissingPerviousMonthDays,
} from "./date-utils";

describe("tests for functions generating dates for a full month", () => {
    it("should generate dates from one month only", () => {
        expect(
            generateMonthDays(2023, 5).every((day) => day.getMonth() === 5)
        ).toBe(true);
    });
    it("should generate the right amount of days for the month", () => {
        expect(generateMonthDays(2023, 0).length).toBe(31);
        expect(generateMonthDays(2023, 5).length).toBe(30);
        expect(generateMonthDays(2023, 1).length).toBe(28);
    });
    it("should generate dates starting from the first", () => {
        expect(generateMonthDays(2021, 3)[0].getDate()).toBe(1);
    });
    it("should generate dates with last day matching the number of days in a given month", () => {
        expect(
            generateMonthDays(2023, 1)[
                generateMonthDays(2023, 1).length - 1
            ].getDate()
        ).toBe(28);
    });
});

describe("tests for function that adds days from previous month to a given month dates array", () => {
    it("should add 4 days to a month array for a month that starts on a Thursday", () => {
        expect(
            // June 2023
            getMissingPerviousMonthDays(generateMonthDays(2023, 5)).length
        ).toBe(34);
        expect(
            // September 2022
            getMissingPerviousMonthDays(generateMonthDays(2022, 8)).length
        ).toBe(34);
    });
    it("should not add any days for a month that starts on a Sunday", () => {
        expect(
            // Jan 2023
            getMissingPerviousMonthDays(generateMonthDays(2023, 0)).length
        ).toBe(generateMonthDays(2023, 0).length);
    });

    it("should change the year of the previous month for January", () => {
        expect(
            getMissingPerviousMonthDays(
                generateMonthDays(2022, 0)
            )[0].getFullYear()
        ).toBe(2021);
    });
});

describe("tests for function that adds days from next month to a given month dates array", () => {
    it("should add one day to a month that ends on a Friday", () => {
        const arrWithNextMonthDays = getMissingNextMonthDays(
            generateMonthDays(2023, 5)
        );
        expect(arrWithNextMonthDays.length).toBe(31);
    });
    it("should add 3 days to a month that ends on a Wednesday", () => {
        const arrWithNextMonthDays = getMissingNextMonthDays(
            generateMonthDays(2023, 4)
        );
        expect(arrWithNextMonthDays.length).toBe(34);
    });
    it("should add days from next year for December that des not end on a Saturday", () => {
        const arrWithNextMonthDays = getMissingNextMonthDays(
            generateMonthDays(2023, 11)
        );
        expect(
            arrWithNextMonthDays[arrWithNextMonthDays.length - 1].getFullYear()
        ).toBe(2024);
    });

    it("should not add any extra days for a month that ends on a Saturday", () => {
        // December 2022
        expect(
            getMissingNextMonthDays(generateMonthDays(2022, 11)).length
        ).toBe(generateMonthDays(2022, 11).length);
    });
});

describe("tests for function that creates nested array of 7 days from a month dates array", () => {
    const justMonthDays = generateMonthDays(2022, 5);
    const withPrevDays = getMissingPerviousMonthDays(justMonthDays);
    const withNextDays = getMissingNextMonthDays(withPrevDays);
    it("should create an array of arrays where every nested array has the length of 7", () => {
        expect(
            createNestedWeeksArr(withNextDays).every((arr) => arr.length === 7)
        ).toBe(true);
    });
    it("should throw an error for arrays with length not divisible by 7", () => {
        expect(() => {
            createNestedWeeksArr(justMonthDays);
        }).toThrow("Invalid array, array must include full weeks");
    });
});
