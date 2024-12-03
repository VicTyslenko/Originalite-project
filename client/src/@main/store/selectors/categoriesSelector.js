export const selectCategories = (state) => state.categories.data;
export const selectSubCategories = (state, parentCategory) => {
	const data = selectCategories(state);
	return data.filter(({ parentId }) => parentId === parentCategory);
};
