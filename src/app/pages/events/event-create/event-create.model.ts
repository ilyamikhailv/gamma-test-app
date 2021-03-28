import { disable, fileSize, maxLength, prop, required } from "@rxweb/reactive-form-validators";
import { EventModel } from "../models/event.model";

export class EventCreateModel implements EventModel {
    @required({ message: 'Это обязательное поле' })
    @maxLength({ value: 350 })
    fullName: string;

    @required({ message: 'Это обязательное поле' })
    @maxLength({ value: 350 })
    theme: string;

    @required({ message: 'Это обязательное поле' })
    @maxLength({ value: 350 })
    subdivision: string;

    @required({ message: 'Это обязательное поле' })
    eventList: string[];

    @required({ message: 'Это обязательное поле', conditionalExpression: (x, y) => !x.takeFromFile })
    @maxLength({ value: 2500 })
    @disable({ conditionalExpression: function (control) { return this.takeFromFile == true; } })
    content: string;

    @prop()
    takeFromFile: boolean;

    @fileSize({ maxSize: 5, message: 'Размер файла не больше 5Мб', conditionalExpression: (x, y) => x.takeFromFile })
    @required({ message: 'Это обязательное поле', conditionalExpression: (x, y) => x.takeFromFile })
    @disable({ conditionalExpression: function (control) { return this.takeFromFile == false; } })
    contentFile: any;

    @prop()
    date: string;

    @prop()
    time: string;
}