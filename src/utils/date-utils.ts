const createNestedWeeksArr = (daysArr: Date[]) => {
    if (daysArr.length % 7 !== 0) {
        throw new Error("Invalid array, array ust include full weeks");
    }
    const currentMonthWeeks = [];
    for (let i = 0; i < daysArr.length; i += 7) {
        currentMonthWeeks.push(daysArr.slice(i, i + 7));
    }

    return currentMonthWeeks;
};

const getMissingPerviousMonthDays = (fullMonthArr: Date[]) => {
    // check if full month arr
    const firstMonthDay = fullMonthArr[0].getDay();

    const currentYear = fullMonthArr[0].getFullYear();
    const currentMonth = fullMonthArr[0].getMonth();

    if (firstMonthDay !== 0) {
        const daysInPrevMonth = new Date(
            currentYear,
            currentMonth,
            0
        ).getDate();

        for (let i = 0; i < firstMonthDay; i++) {
            fullMonthArr.unshift(
                new Date(currentYear, currentMonth - 1, daysInPrevMonth - i)
            );
        }
    }
};

const getMissingNextMonthDays = (fullMonthArr: Date[]) => {
    // check if full month array
    const lastMonthDay = fullMonthArr[fullMonthArr.length - 1].getDay();

    if (lastMonthDay !== 6) {
        for (let i = 1; i < 7 - lastMonthDay; i++) {
            fullMonthArr[15].getMonth() !== 1
                ? fullMonthArr.push(
                      new Date(
                          fullMonthArr[15].getFullYear(),
                          fullMonthArr[15].getMonth() + 1,
                          i
                      )
                  )
                : fullMonthArr.push(
                      new Date(
                          fullMonthArr[15].getFullYear() + 1,
                          fullMonthArr[15].getMonth() + 1,
                          i
                      )
                  );
        }
    }
};

export const generateDays = (year: number, month: number) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const currentMonthDates = [];
    for (let i = 1; i <= daysInMonth; i++) {
        currentMonthDates.push(new Date(year, month, i));
    }

    getMissingPerviousMonthDays(currentMonthDates);
    getMissingNextMonthDays(currentMonthDates);

    return createNestedWeeksArr(currentMonthDates);
};
