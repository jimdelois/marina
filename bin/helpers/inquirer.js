module.exports = {
    requireValue: value => value.length > 0 ? true : 'This value is required',
    castEmptyStringToNull: value => value.length ? value : null,
};
