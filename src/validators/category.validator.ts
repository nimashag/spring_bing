import { Request } from 'express';

export const validateCategoryRequest = (req: Request) => {
    const { body } = req;

    // Destructure required fields from the request body
    const { name } = body;

    // Check if all required fields are present
    if (!name) {
        return {
            statusCode: 400,
            errorMessage: 'Name is required',
        };
    }

    return {
        statusCode: 200,
        errorMessage: null,
    };
};
