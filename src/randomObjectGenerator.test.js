import { generateRandomObject, jsonSchema } from "./randomObjectGenarator/randomObjectGenerator";

describe('Random Object Generator', () => {
    test('should generate an object with required fields', () => {
        const randomObject = generateRandomObject(jsonSchema);
        expect(randomObject).toHaveProperty('id');
        expect(randomObject).toHaveProperty('title');
        expect(randomObject).toHaveProperty('description');
        expect(randomObject).toHaveProperty('startDate');
        expect(randomObject).toHaveProperty('endDate');
        expect(randomObject).toHaveProperty('attendees');
    });

    test('should generate properties of the correct type', () => {
        const randomObject = generateRandomObject(jsonSchema);
        expect(['string', 'number']).toContain(typeof randomObject.id);
        expect(typeof randomObject.title).toBe('string');
        expect(typeof randomObject.description).toBe('string');
        expect(typeof randomObject.startDate).toBe('number');
        expect(typeof randomObject.endDate).toBe('number');
    });

    test('should generate optional fields correctly', () => {
        const randomObject = generateRandomObject(jsonSchema);
        expect(randomObject.parentId === undefined || randomObject.parentId !== undefined).toBe(true);
        expect(randomObject.locationId === undefined || randomObject.locationId !== undefined).toBe(true);
        expect(randomObject.process === undefined || randomObject.process !== undefined).toBe(true);
        expect(randomObject.readOnly === undefined || randomObject.readOnly !== undefined).toBe(true);
    });
});