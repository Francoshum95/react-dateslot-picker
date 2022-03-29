import datetimeParse from "../src/utlis/datetimeParse";

const testCase_1 = {
  startDate: 1,
  endDate: 1,
  disableWeekly: [],
  disableSpecific: [],
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
}

const testCase_2 = {
  startDate: 1643648400,
  endDate: 1654016400,
  disableWeekly: ['0,1,2-6'],
  disableSpecific: ['1,2,3-7'],
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
}

const testCase_3 = {
  startDate: 1643648400,
  endDate: 1,
  disableWeekly: [],
  disableSpecific: [],
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
}

const testCase_4 = {
  startDate: 1,
  endDate: 1654016400,
  disableWeekly: [],
  disableSpecific: [],
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
}

const testStartDatetime = new Date (new Date(1643648400 * 1000).toLocaleString("en-US", {
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
}));
const testEndDatetime = new Date (new Date(1654016400 * 1000).toLocaleString("en-US", {
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
}));

describe("datetimeParse testCase_1", () => {
  it("startDatetime should be 1", () => {
    expect(datetimeParse(testCase_1).startDatetime).toBe(1)
  })
  it("endDatetime should be 1", () => {
    expect(datetimeParse(testCase_1).endDatetime).toBe(1)
  })
  it("calendatType should be CALENDARALL", () => {
    expect(datetimeParse(testCase_1).calendarType).toBe("CALENDARALL")
  })
  it("disableWeeklyArray should be empty array", () => {
    expect(datetimeParse(testCase_1).disableWeeklyArray).toStrictEqual([])
  })
  it("disableSpecificArray should be empty array", () => {
    expect(datetimeParse(testCase_1).disableSpecificArray).toStrictEqual([])
  })
  it("isError should be false", () => {
    expect(datetimeParse(testCase_1).isError).toBe(false)
  })
});

describe("datetimeParse testCase_2", () => {
  it("startDatetime should be testStartDatetime", () => {
    expect(datetimeParse(testCase_2).startDatetime).toStrictEqual(testStartDatetime)
  })
  it("endDatetime should be testEndDatetime", () => {
    expect(datetimeParse(testCase_2).endDatetime).toStrictEqual(testEndDatetime)
  })
  it("calendatType should be CALENDARNORMAL", () => {
    expect(datetimeParse(testCase_2).calendarType).toBe("CALENDARNORMAL")
  })
  it("disableWeeklyArray should be [0,1,2,3,4,5,6]", () => {
    expect(datetimeParse(testCase_2).disableWeeklyArray).toStrictEqual([0,1,2,3,4,5,6])
  })
  it("disableSpecificArray should be [1,2,3,4,5,6,7]", () => {
    expect(datetimeParse(testCase_2).disableSpecificArray).toStrictEqual([1,2,3,4,5,6,7])
  })
  it("isError should be false", () => {
    expect(datetimeParse(testCase_2).isError).toBe(false)
  })
})

describe("datetimeParse testCase_3", () => {
  it("startDatetime should be testStartDatetime", () => {
    expect(datetimeParse(testCase_3).startDatetime).toStrictEqual(testStartDatetime)
  })
  it("endDatetime should be 1", () => {
    expect(datetimeParse(testCase_3).endDatetime).toBe(1)
  })
  it("calendatType should be CALENDARLAST", () => {
    expect(datetimeParse(testCase_3).calendarType).toBe("CALENDARLAST")
  })
  it("disableWeeklyArray should be empty array", () => {
    expect(datetimeParse(testCase_3).disableWeeklyArray).toStrictEqual([])
  })
  it("disableSpecificArray should be empty array", () => {
    expect(datetimeParse(testCase_3).disableSpecificArray).toStrictEqual([])
  })
  it("isError should be false", () => {
    expect(datetimeParse(testCase_3).isError).toBe(false)
  })
})

describe("datetimeParse testCase_4", () => {
  it("startDatetime should be 1", () => {
    expect(datetimeParse(testCase_4).startDatetime).toBe(1)
  })
  it("endDatetime should be testEndDatetime", () => {
    expect(datetimeParse(testCase_4).endDatetime).toStrictEqual(testEndDatetime)
  })
  it("calendatType should be CALENDARBEGIN", () => {
    expect(datetimeParse(testCase_4).calendarType).toBe("CALENDARBEGIN")
  })
  it("disableWeeklyArray should be empty array", () => {
    expect(datetimeParse(testCase_4).disableWeeklyArray).toStrictEqual([])
  })
  it("disableSpecificArray should be empty array", () => {
    expect(datetimeParse(testCase_4).disableSpecificArray).toStrictEqual([])
  })
  it("isError should be false", () => {
    expect(datetimeParse(testCase_4).isError).toBe(false)
  })
})












