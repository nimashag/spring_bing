import express from 'express';

export const validateFAQRequest = (request: express.Request) => {
    const { full_name, question, category } = request.body;

    // Validate full_name: must be a string and not contain numbers or special characters
    const nameValidationRegex = /^[A-Za-z\s]+$/;
    if (!full_name || !nameValidationRegex.test(full_name)) {
        return {
            statusCode: 400,
            errorMessage: "Invalid full name. It should only contain letters and spaces.",
        };
    }

    // Validate question: must be provided
    if (!question || typeof question !== 'string') {
        return {
            statusCode: 400,
            errorMessage: "A valid question is required.",
        };
    }

    // Validate category: must be one of the predefined categories
    const validCategories = [
        'Clothing', 'System', 'Payment', 'Account', 
        'Returns & Exchanges', 'Orders', 'Promotions & Discounts', 
        'Product Care', 'General Information'
    ];
    if (!category || !validCategories.includes(category)) {
        return {
            statusCode: 400,
            errorMessage: "Invalid category. Please select a valid category.",
        };
    }

    // If all validations pass
    return { statusCode: 200 };
};
