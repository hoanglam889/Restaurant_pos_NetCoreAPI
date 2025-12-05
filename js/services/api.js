const API_URL = 'http://localhost:5070/api';
export const getMenuFoods = async () => {
    try {
        const response = await fetch(`${BASE_URL}/Food`);
        return await response.json();
    } catch (error) {
        console.error("Lỗi lấy menu:", error);
        return [];
    }
};
