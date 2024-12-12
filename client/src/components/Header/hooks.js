import { useSelector } from "react-redux";

export const useCategories = category => {
	const categories = useSelector(state => state.categories.data);

	const filteredCategories = categories.filter(item => item.parentId === category);

	return { filteredCategories };
};
