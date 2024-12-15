import { useSelector } from "react-redux";

export const useCategories = category => {
	const allCategories = useSelector(state => state.categories.data);


	const filteredCategories = allCategories.filter(item => item.parentId === category);

	return { filteredCategories, allCategories };
};
