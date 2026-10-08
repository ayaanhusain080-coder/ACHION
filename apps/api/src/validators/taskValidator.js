export const validateCreateTask = (req) => {
    const { title } = req.body;
    if (typeof title !== "string" || title.trim().length === 0) {
        return "Task title is required";
    }
    return null;
};
//# sourceMappingURL=taskValidator.js.map