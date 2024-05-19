import axiosInstance from "./AxiosConfig";

export const verifyToken = async () => {
    try {
        const response = await axiosInstance.post(
            "http://localhost:3001/verifyToken",
            {}
        );

        const { status } = response.data;

        if (status !== true) {
            throw new Error("Token verification failed");
        }
    } catch (error) {
        throw new Error("Token verification failed");
    }
};
