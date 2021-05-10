/*
 * MIT License
 *
 * Copyright (c) 2021 Nolonar
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

//=============================================================================
// Metadata
//=============================================================================
/*:
 * @target MZ
 * @plugindesc Adds a calendar to the game.
 * @author Nolonar
 * @url https://github.com/Nolonar/RM_Plugins
 * 
 * 
 * @param locale
 * @text Locale
 * @desc Determines the language for month names and day of week. For example: "en-us" for American English.
 * @default en-us
 * 
 * @param firstWeekday
 * @text First weekday
 * @desc Determines which weekday is listed first in the calendar.
 * @type select
 * @option Monday
 * @value 1
 * @option Sunday
 * @value 0
 * @default 1
 * 
 * @param startDate
 * @text Starting date
 * @desc The date the game starts at.
 * @type struct<date>
 * @default {"year":"","month":"-1","day":"0"}
 * 
 * @param showDateProgression
 * @text Show date progression
 * @desc If ON, automatically displays the caledar when the date changes.
 * @type boolean
 * @default true
 * 
 * @param events
 * @text Events
 * @desc Which days represent special events on the calendar.
 * @type struct<event>[]
 * @default ["{\"name\":\"New Year's Day\",\"from\":\"{\\\"year\\\":\\\"\\\",\\\"month\\\":\\\"0\\\",\\\"day\\\":\\\"1\\\"}\",\"to\":\"{\\\"year\\\":\\\"\\\",\\\"month\\\":\\\"-1\\\",\\\"day\\\":\\\"0\\\"}\",\"switch\":\"0\",\"color\":\"{\\\"r\\\":\\\"245\\\",\\\"g\\\":\\\"45\\\",\\\"b\\\":\\\"25\\\"}\"}"]
 * 
 * @param dayColor
 * @text Day color
 * @desc The color with which to highlight days on the calendar.
 * @type struct<color>
 * @default {"r":"255","g":"255","b":"255"}
 * 
 * @param sundayColor
 * @text Sunday color
 * @desc The color with which to highlight Sundays on the calendar.
 * @type struct<color>
 * @default {"r":"245","g":"45","b":"25"}
 * 
 * @param saturdayColor
 * @text Saturday color
 * @desc The color with which to highlight Saturdays on the calendar.
 * @type struct<color>
 * @default {"r":"90","g":"180","b":"255"}
 * 
 * @param yearVar
 * @text Year variable
 * @desc Where to save the current year. The calendar does not read from this.
 * @type variable
 * @default 0
 * 
 * @param monthVar
 * @text Month variable
 * @desc Where to save the current month from 1 (January) to 12 (December). The calendar does not read from this.
 * @type variable
 * @default 0
 * 
 * @param dayVar
 * @text Day variable
 * @desc Where to save the current day from 1 to 31. The calendar does not read from this.
 * @type variable
 * @default 0
 * 
 * @param weekdayVar
 * @text Weekday variable
 * @desc Where to save the current weekday from 0 (Sunday) to 6 (Saturday). The calendar does not read from this.
 * @type variable
 * @default 0
 * 
 * 
 * @command showCalendar
 * @text Show calendar
 * @desc Displays the calendar.
 * 
 * 
 * @command advanceDate
 * @text Advance date
 * @desc Advances the current date by a specified amount of time.
 * 
 * @arg timeUnit
 * @text Time unit
 * @desc Whether to advance time by days, months, or years.
 * @type select
 * @option Days
 * @option Months
 * @option Years
 * @default Days
 * 
 * @arg timeToAdvance
 * @text Time to advance
 * @desc How much time to advance the calendar by. Choose a negative number to travel to the past.
 * @type number
 * @default 1
 * 
 * 
 * @command setDate
 * @text Move to date
 * @desc Move the current date to a specified date.
 * 
 * @arg newDate
 * @text New date
 * @desc The date to change to.
 * @type struct<date>
 * @default {"year":"","month":"-1","day":"0"}
 * 
 * 
 * @help Version 1.0.0
 * IMPORTANT: When setting a date, make sure to check if it exists for the
 * chosen month of the chosen year. Otherwise, the date will be set to the
 * next best date. For example: 2021-02-31 will become 2021-03-03.
 * 
 * This plugin does not manage game states, so be careful when travelling to
 * the past.
 * 
 * For events that start or end on specific weekdays, refer to the following:
 * First  [x] of month: Set day to  1, and weekday to [x]
 * Second [x] of month: Set day to  8, and weekday to [x]
 * Third  [x] of month: Set day to 15, and weekday to [x]
 * Fourth [x] of month: Set day to 22, and weekday to [x]
 * 
 * For events that end on a Sunday, make sure the day is set at least 7 days
 * after the starting day. For example, if an event starts on the first Monday
 * and ends on the following sunday: Set "From Day" to 1, and "To Day" to 8.
 */

//=============================================================================
// Structures
//=============================================================================
/*~struct~date:
 * @param year
 * @text Year
 * @desc Year from -271821 to 275760. Leave empty for the current year.
 * 
 * @param month
 * @text Month
 * @desc Choose "Current month" for the current month.
 * @type select
 * @option Current month
 * @value -1
 * @option January
 * @value 0
 * @option February
 * @value 1
 * @option March
 * @value 2
 * @option April
 * @value 3
 * @option May
 * @value 4
 * @option June
 * @value 5
 * @option July
 * @value 6
 * @option August
 * @value 7
 * @option September
 * @value 8
 * @option October
 * @value 9
 * @option November
 * @value 10
 * @option December
 * @value 11
 * @default -1
 * 
 * @param day
 * @text Day
 * @desc Choose 0 for the current day.
 * @type number
 * @min 0
 * @max 31
 * @default 0
 * 
 * @param weekday
 * @text Weekday
 * @type select
 * @option Any
 * @value -1
 * @option Monday
 * @value 1
 * @option Tuesday
 * @value 2
 * @option Wednesday
 * @value 3
 * @option Thursday
 * @value 4
 * @option Friday
 * @value 5
 * @option Saturday
 * @value 6
 * @option Sunday
 * @value 0
 * @default -1
 */

/*~struct~color:
 * @param r
 * @text Red
 * @type number
 * @min 0
 * @max 255
 * 
 * @param g
 * @text Green
 * @type number
 * @min 0
 * @max 255
 * 
 * @param b
 * @text Blue
 * @type number
 * @min 0
 * @max 255
 */

/*~struct~event:
 * @param name
 * @text Name
 * @desc The name of the event.
 * @type string
 * 
 * @param from
 * @text From
 * @desc When the event starts. Default means "every day".
 * @type struct<date>
 * @default {"year":"","month":"-1","day":"0"}
 * 
 * @param to
 * @text To
 * @desc When the event ends. Default means "this day only".
 * @type struct<date>
 * @default {"year":"","month":"-1","day":"0"}
 * 
 * @param switch
 * @text Switch
 * @desc The switch to turn on while the event lasts, and turn off when the event is over.
 * @type switch
 * @default 0
 * 
 * @param color
 * @text Color
 * @desc The color with which days that belong to this event are marked.
 * @type struct<color>
 * @default {"r":"245","g":"45","b":"25"}
 */

(() => {
    const PLUGIN_NAME = "N_Calendar";

    const OPTION_UNIT_DAYS = "Days";
    const OPTION_UNIT_MONTHS = "Months";
    const OPTION_UNIT_YEARS = "Years";

    const COMMANDS = {
        showCalendar: () => SceneManager.push(Scene_Calendar),
        advanceDate: args => {
            args.timeToAdvance = args.timeToAdvance === "0" ? 0 : Number(args.timeToAdvance) || 1;

            const map = {
                [OPTION_UNIT_DAYS]: days => calendar.addDays(days),
                [OPTION_UNIT_MONTHS]: months => calendar.addMonths(months),
                [OPTION_UNIT_YEARS]: years => calendar.addYears(years)
            };
            map[args.timeUnit](args.timeToAdvance);
        },
        setDate: args => calendar.setDate(parseStruct(args.newDate, { year: "", month: -1, day: 0, weekday: -1 }))
    };

    const parameters = PluginManager.parameters(PLUGIN_NAME);
    parameters.firstWeekday = parameters.firstWeekday === "0" ? 0 : 1;
    parameters.startDate = parseStruct(parameters.startDate, { year: "", month: -1, day: 0, weekday: -1 });
    parameters.showDateProgression = parameters.showDateProgression !== "false";
    parameters.dayColor = parseStruct(parameters.dayColor, { r: 255, g: 255, b: 255 });
    parameters.sundayColor = parseStruct(parameters.sundayColor, { r: 245, g: 45, b: 25 });
    parameters.saturdayColor = parseStruct(parameters.saturdayColor, { r: 90, g: 180, b: 255 });
    parameters.yearVar = Number(parameters.yearVar);
    parameters.monthVar = Number(parameters.monthVar);
    parameters.dayVar = Number(parameters.dayVar);
    parameters.weekdayVar = Number(parameters.weekdayVar);

    for (const command in COMMANDS) {
        PluginManager.registerCommand(PLUGIN_NAME, command, COMMANDS[command]);
    }

    function parseStruct(string, def) {
        return string ? JSON.parse(string) : def;
    }

    function parseEvents(string, def) {
        return string ? parseStruct(string)
            .map(s => {
                const e = JSON.parse(s);
                return new Event(
                    e.name,
                    parseStruct(e.from, { year: "", month: -1, day: 0, weekday: -1 }),
                    parseStruct(e.to, { year: "", month: -1, day: 0, weekday: -1 }),
                    e.switch,
                    parseStruct(e.color, { r: 245, g: 45, b: 25 })
                );
            }) : def;
    }

    function setDateOptions(date, dateOptions) {
        const result = new Date(date.getTime());
        if (dateOptions.year !== "") {
            result.setFullYear(Number(dateOptions.year));
        }
        const month = Number(dateOptions.month);
        if (month !== -1) {
            result.setMonth(month);
        }
        const day = Number(dateOptions.day);
        if (day !== 0) {
            result.setDate(day);
        }
        const weekday = Number(dateOptions.weekday);
        if (weekday !== -1) {
            const diff = (weekday - result.getDay() + 7) % 7;
            result.setDate(result.getDate() + diff);
        }
        return result;
    }

    let isCalendarAutoDisplay = false;

    class Event {
        constructor(name, from, to, sw, color) {
            this.name = name;
            this.from = { year: from.year, month: Number(from.month), day: Number(from.day), weekday: Number(from.weekday) };
            this.to = { year: to.year, month: Number(to.month), day: Number(to.day), weekday: Number(to.weekday) };
            this.switch = Number(sw);
            this.color = color;
        }

        isHappening(date) {
            const fromDate = setDateOptions(date, this.from);
            const toDate = setDateOptions(fromDate, this.to);
            return date >= fromDate && date <= toDate;
        }

        isHappeningOnSameMonth(date) {
            const fromDate = setDateOptions(date, this.from);
            const toDate = setDateOptions(fromDate, this.to);
            const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
            const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

            return (fromDate >= firstDayOfMonth && fromDate <= lastDayOfMonth)
                || (toDate >= firstDayOfMonth && toDate <= lastDayOfMonth)
                || (fromDate < firstDayOfMonth && toDate > lastDayOfMonth);
        }

        getHappeningDaysForMonth(date) {
            const firstDayOfMonth = new Date(date.getTime()).setDate(1);
            let currentDay = setDateOptions(date, this.from);
            if (currentDay.getTime() < firstDayOfMonth) {
                currentDay = new Date(firstDayOfMonth);
            }
            const lastDayOfEvent = setDateOptions(currentDay, this.to);
            const result = [];
            while (currentDay <= lastDayOfEvent && currentDay.getMonth() === date.getMonth()) {
                result.push(currentDay.getDate());
                currentDay.setDate(currentDay.getDate() + 1);
            }
            return result;
        }
    }

    const calendar = new class Calendar {
        constructor() {
            this.events = parseEvents(parameters.events, [{
                name: "New Year's Day",
                from: { year: "", month: 0, day: 1, weekday: -1 },
                to: { year: "", month: -1, day: 0, weekday: -1 },
                switch: 0,
                color: { r: 245, g: 45, b: 25 }
            }]);
        }

        reset() {
            this.date = new Date(new Date().setHours(0, 0, 0, 0));
            this.setDate(parameters.startDate);
        }

        addDays(days) {
            this.date.setDate(this.date.getDate() + days);
            this.refreshSwitchesAndVariables();
        }

        addMonths(months) {
            this.date.setMonth(this.date.getMonth() + months);
            this.refreshSwitchesAndVariables();
        }

        addYears(years) {
            this.date.setFullYear(this.date.getFullYear() + years);
            this.refreshSwitchesAndVariables();
        }

        setDate(date) {
            this.date = setDateOptions(this.date, date);
            this.refreshSwitchesAndVariables();
        }

        refreshSwitchesAndVariables() {
            this.events.forEach(event => $gameSwitches.setValue(event.switch, event.isHappening(this.date)));
            $gameVariables.setValue(parameters.yearVar, this.date.getFullYear());
            $gameVariables.setValue(parameters.monthVar, this.date.getMonth() + 1);
            $gameVariables.setValue(parameters.dayVar, this.date.getDate());
            $gameVariables.setValue(parameters.weekdayVar, this.date.getDay());
        }

        getEventsForMonth(date) {
            const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
            const result = new Array(daysInMonth + 1);
            for (let i = 1; i < result.length; i++) {
                result[i] = [];
            }

            const filteredEvents = this.events.filter(e => e.isHappeningOnSameMonth(date));
            for (const event of filteredEvents) {
                for (const day of event.getHappeningDaysForMonth(date)) {
                    result[day].push(event);
                }
            }
            return result;
        }

        get weekdays() {
            const firstDayOfWeek = new Date(new Date().setHours(0, 0, 0, 0));
            firstDayOfWeek.setDate(firstDayOfWeek.getDate() - firstDayOfWeek.getDay() + parameters.firstWeekday);
            const d = new Date(firstDayOfWeek.getTime());

            const result = [];
            for (let i = 0; i < 7; i++) {
                result.push(d.toLocaleString(parameters.locale, { weekday: "short" }));
                d.setDate(d.getDate() + 1);
            }
            return result;
        }
    }();

    class Window_Calendar extends Window_Base {
        initialize() {
            this.changeDisplayedMonth(calendar.date);

            const b = new Window_Base(new Rectangle(0, 0, 0, 0));
            this.weekdays = calendar.weekdays;
            this.colWidth = Math.max(...this.weekdays.map(d => b.textSizeEx(d).width)) + 2 * b.itemPadding();

            const w = 8 * this.colWidth;
            const h = 9 * b.lineHeight();
            const x = (Graphics.boxWidth - w) / 2;
            const y = (Graphics.boxHeight - h) / 2;
            super.initialize(new Rectangle(x, y, w, h));
            this.drawCalendar();
        }

        changeDisplayedMonth(newDate) {
            this.displayedMonth = new Date(newDate.getFullYear(), newDate.getMonth(), 1);
            this.events = calendar.getEventsForMonth(this.displayedMonth);
        }

        get drawableRect() {
            return new Rectangle(0, 0, this.innerWidth, this.innerHeight);
        }

        getWeekdayColor(weekday) {
            return this.getColor([
                parameters.sundayColor,
                parameters.dayColor,
                parameters.dayColor,
                parameters.dayColor,
                parameters.dayColor,
                parameters.dayColor,
                parameters.saturdayColor
            ][weekday]);
        }

        getColor(color) {
            return `rgb(${color.r}, ${color.g}, ${color.b})`;
        }

        drawCalendar() {
            this.contents.clear();

            const rect = this.drawableRect;
            const defaultTextColor = this.contents.textColor;
            this.defaultTextOutline = this.contents.outlineColor;
            this.drawYearAndMonth(rect);
            this.drawWeekdays(rect);
            this.contents.textColor = defaultTextColor;
        }

        drawYearAndMonth(rect) {
            const date = this.displayedMonth;
            this.contents.drawText(this.getHeaderText(date), rect.left, rect.top, rect.width, this.lineHeight(), "center");
            this.contents.outlineColor = this.defaultTextOutline;
        }

        drawWeekdays(rect) {
            const left = (rect.width - 7 * this.colWidth) / 2;
            let top = rect.top + 1.2 * this.lineHeight();
            for (let index in this.weekdays) {
                const i = Number(index);
                const x = left + i * this.colWidth;
                const y = top;
                const w = this.colWidth;
                const h = this.lineHeight();

                this.contents.textColor = this.getWeekdayColor((i + parameters.firstWeekday) % 7);
                this.contents.drawText(this.weekdays[i], x, y, w, h, "center");
            }
            top += this.lineHeight();

            const d = new Date(this.displayedMonth.getTime());
            while (d.getMonth() === this.displayedMonth.getMonth()) {
                const i = d.getDay();
                const currentDay = d.getDate();
                const events = this.events[currentDay];

                const x = left + (i - parameters.firstWeekday + 7) % 7 * this.colWidth;
                const y = top;
                const w = this.colWidth;
                const h = this.lineHeight();
                if (d.getTime() === calendar.date.getTime()) {
                    this.contents.fillRect(x, y, w, h, "#00000032");
                }

                this.contents.textColor = events.length ? this.getColor(events[0].color) : this.getWeekdayColor(i);
                this.contents.drawText(d.getDate(), x, y, w, h, "center");
                this.contents.outlineColor = this.defaultTextOutline;
                d.setDate(currentDay + 1);
                if (d.getDay() === parameters.firstWeekday) {
                    top += this.lineHeight();
                }
            }
        }

        getHeaderText(date) {
            return `${date.getFullYear()} ${date.toLocaleString(parameters.locale, { month: "long" })}`;
        }
    }

    class Scene_Calendar extends Scene_MenuBase {
        initialize() {
            super.initialize();

            this.inputBindings = {
                cancel: () => this.popScene(),
                left: () => this.previousActor(),
                right: () => this.nextActor()
            };
        }

        createWindowLayer() {
            super.createWindowLayer();

            this.calendarWindow = new Window_Calendar();
            this.addWindow(this.calendarWindow);
        }

        createButtons() {
            super.createButtons();

            const c = this.calendarWindow;
            const rect = new Rectangle(c.x, c.y, c.width, c.height);
            rect.pad(-5, -5);
            this._cancelButton.x = rect.right - this._cancelButton.width;
            this._cancelButton.y = rect.top;

            const pageButtonDistance = this._pagedownButton.x - this._pageupButton.x;
            this._pageupButton.x = rect.left;
            this._pagedownButton.x = rect.left + pageButtonDistance;
            this._pageupButton.y = this._pagedownButton.y = rect.top;
        }

        createCancelButton() {
            super.createCancelButton();
            this._cancelButton.setClickHandler(this.popScene.bind(this));
        }

        isMenuEnabled() { return false; }
        isAutosaveEnabled() { return false; }
        needsPageButtons() { return true; }
        needsCancelButton() { return !isCalendarAutoDisplay; }

        get displayedMonth() { return this.calendarWindow.displayedMonth; }

        previousActor() {
            const d = this.displayedMonth;
            this.calendarWindow.changeDisplayedMonth(new Date(d.getFullYear(), d.getMonth() - 1, 1));
            this.onActorChange();
        }

        nextActor() {
            const d = this.displayedMonth;
            this.calendarWindow.changeDisplayedMonth(new Date(d.getFullYear(), d.getMonth() + 1, 1));
            this.onActorChange();
        }

        onActorChange() {
            super.onActorChange();
            this.calendarWindow.drawCalendar();
        }

        update() {
            super.update();
            if (isCalendarAutoDisplay) {
                // TODO
            } else {
                for (const input in this.inputBindings) {
                    if (Input.isRepeated(input)) {
                        this.inputBindings[input]();
                    }
                }
            }
        }
    }

    const DataManager_setupNewGame = DataManager.setupNewGame;
    DataManager.setupNewGame = function () {
        DataManager_setupNewGame.call(this);
        calendar.reset();
    };

    const DataManager_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = () => {
        const result = DataManager_makeSaveContents();
        result[PLUGIN_NAME] = calendar.date.getTime();

        return result;
    };

    const DataManager_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = contents => {
        DataManager_extractSaveContents(contents);

        const content = contents[PLUGIN_NAME];
        if (content !== undefined) {
            calendar.date = new Date(Number(content));
        }
    };
})();