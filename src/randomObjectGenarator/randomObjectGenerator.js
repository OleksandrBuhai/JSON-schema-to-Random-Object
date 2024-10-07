function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomEnumValue(enumArray) {
    return enumArray[Math.floor(Math.random() * enumArray.length)];
}

function generateRandomAttendee() {
    return {
        userId: getRandomInteger(1, 1000),
        access: getRandomEnumValue(["view", "modify", "sign", "execute"]),
        formAccess: getRandomEnumValue(["view", "execute", "execute_view"]),
    };
}

function generateRandomObject(schema) {
    const randomObject = {};

    schema.required.forEach((key) => {
        const property = schema.properties[key];

        if (property.type === "integer") {
            randomObject[key] = getRandomInteger(1, 100);
        } else if (property.type === "string") {
            randomObject[key] = `RandomString-${getRandomInteger(1, 1000)}`;
        } else if (property.type === "boolean") {
            randomObject[key] = Math.random() < 0.5;
        } else if (property.type === "array" && property.items?.$ref) {
            randomObject[key] = Array.from({ length: getRandomInteger(1, 5) }, generateRandomAttendee);
        } else if (property.anyOf) {
            const selectedType = property.anyOf[Math.floor(Math.random() * property.anyOf.length)];
            if (selectedType.type === "string" && selectedType.pattern) {
                randomObject[key] = `https://example.com/${Math.random().toString(36).substr(2, 9)}`;
            } else if (selectedType.type === "null") {
                randomObject[key] = null;
            } else if (selectedType.type === "integer") {
                randomObject[key] = getRandomInteger(1, 100);
            }
        }
    });

    Object.keys(schema.properties).forEach((key) => {
        const property = schema.properties[key];
        if (!schema.required.includes(key)) {
            if (Math.random() < 0.5) { 
                if (property.type === "string") {
                    randomObject[key] = `OptionalString-${getRandomInteger(1, 1000)}`;
                } else if (property.type === "integer") {
                    randomObject[key] = getRandomInteger(1, 100);
                } else if (property.type === "boolean") {
                    randomObject[key] = Math.random() < 0.5;
                } else if (property.type === "array") {
                    randomObject[key] = Array.from({ length: getRandomInteger(1, 5) }, () => null);
                } else if (property.type === "object") {
                    randomObject[key] = {
                        id: getRandomInteger(1, 1000),
                        viewModel: {},
                    };
                } else if (property.anyOf) {
                    const selectedType = property.anyOf[Math.floor(Math.random() * property.anyOf.length)];
                    if (selectedType.type === "null") {
                        randomObject[key] = null; // If type is null, generate null
                    } else if (selectedType.type === "string") {
                        randomObject[key] = `OptionalString-${getRandomInteger(1, 1000)}`;
                    } else if (selectedType.type === "integer") {
                        randomObject[key] = getRandomInteger(1, 100);
                    }
                }
            }
        }
    });

    return randomObject;
}





const jsonSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "definitions": {
        "attendees": {
            "type": "object",
            "$id": "#attendees",
            "properties": {
                "userId": {
                    "type": "integer"
                },
                "access": {
                    "enum": [
                        "view",
                        "modify",
                        "sign",
                        "execute"
                    ]
                },
                "formAccess": {
                    "enum": [
                        "view",
                        "execute",
                        "execute_view"
                    ]
                }
            },
            "required": [
                "userId",
                "access"
            ]
        }
    },
    "type": "object",
    "properties": {
        "id": {
            "anyOf": [
                {
                    "type": "string"
                },
                {
                    "type": "integer"
                }
            ]
        },
        "title": {
            "type": "string"
        },
        "description": {
            "type": "string"
        },
        "startDate": {
            "type": "integer"
        },
        "endDate": {
            "type": "integer"
        },
        "attendees": {
            "type": "array",
            "items": {
                "$ref": "#attendees"
            },
            "default": []
        },
        "parentId": {
            "anyOf": [
                {
                    "type": "null"
                },
                {
                    "type": "string"
                },
                {
                    "type": "integer"
                }
            ]
        },
        "locationId": {
            "anyOf": [
                {
                    "type": "null"
                },
                {
                    "type": "integer"
                }
            ]
        },
        "process": {
            "anyOf": [
                {
                    "type": "null"
                },
                {
                    "type": "string",
                    "pattern": "https:\\/\\/[a-z]+\\.corezoid\\.com\\/api\\/1\\/json\\/public\\/[0-9]+\\/[0-9a-zA-Z]+"
                }
            ]
        },
        "readOnly": {
            "type": "boolean"
        },
        "priorProbability": {
            "anyOf": [
                {
                    "type": "null"
                },
                {
                    "type": "integer",
                    "minimum": 0,
                    "maximum": 100
                }
            ]
        },
        "channelId": {
            "anyOf": [
                {
                    "type": "null"
                },
                {
                    "type": "integer"
                }
            ]
        },
        "externalId": {
            "anyOf": [
                {
                    "type": "null"
                },
                {
                    "type": "string"
                }
            ]
        },
        "tags": {
            "type": "array"
        },
        "form": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "integer"
                },
                "viewModel": {
                    "type": "object"
                }
            },
            "required": [
                "id"
            ]
        },
        "formValue": {
            "type": "object"
        }
    },
    "required": [
        "id",
        "title",
        "description",
        "startDate",
        "endDate",
        "attendees"
    ]
};

export { generateRandomObject, jsonSchema };
