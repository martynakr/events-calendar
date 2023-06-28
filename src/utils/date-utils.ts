export const createNestedWeeksArr = (daysArr: Date[]) => {
    if (daysArr.length % 7 !== 0) {
        throw new Error("Invalid array, array must include full weeks");
    }
    const currentMonthWeeks = [];
    for (let i = 0; i < daysArr.length; i += 7) {
        currentMonthWeeks.push(daysArr.slice(i, i + 7));
    }

    return currentMonthWeeks;
};

export const getMissingPerviousMonthDays = (fullMonthArr: Date[]) => {
    // check if full month arr
    const firstMonthDay = fullMonthArr[0].getDay();

    const currentYear = fullMonthArr[0].getFullYear();
    const currentMonth = fullMonthArr[0].getMonth();

    const arrWithPrevDays = [...fullMonthArr];

    if (firstMonthDay !== 0) {
        const daysInPrevMonth = new Date(
            currentYear,
            currentMonth,
            0
        ).getDate();

        for (let i = 0; i < firstMonthDay; i++) {
            arrWithPrevDays.unshift(
                new Date(currentYear, currentMonth - 1, daysInPrevMonth - i)
            );
        }
    }

    return arrWithPrevDays;
};

export const getMissingNextMonthDays = (fullMonthArr: Date[]) => {
    // check if full month array
    const lastMonthDay = fullMonthArr[fullMonthArr.length - 1].getDay();

    const arrrWithNextDays = [...fullMonthArr];

    if (lastMonthDay !== 6) {
        for (let i = 1; i < 7 - lastMonthDay; i++) {
            fullMonthArr[15].getMonth() !== 1
                ? arrrWithNextDays.push(
                      new Date(
                          fullMonthArr[15].getFullYear(),
                          fullMonthArr[15].getMonth() + 1,
                          i
                      )
                  )
                : arrrWithNextDays.push(
                      new Date(
                          fullMonthArr[15].getFullYear() + 1,
                          fullMonthArr[15].getMonth() + 1,
                          i
                      )
                  );
        }
    }
    return arrrWithNextDays;
};

export const generateMonthDays = (year: number, month: number) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const currentMonthDates = [];
    for (let i = 1; i <= daysInMonth; i++) {
        currentMonthDates.push(new Date(year, month, i));
    }
    return currentMonthDates;
};

export const generateDays = (year: number, month: number) => {
    const currentMonthDates = generateMonthDays(year, month);
    const arrWithPrevDays = getMissingPerviousMonthDays(currentMonthDates);
    const arrWithNextDays = getMissingNextMonthDays(arrWithPrevDays);

    return createNestedWeeksArr(arrWithNextDays);
};
