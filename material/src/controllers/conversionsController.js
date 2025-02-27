import axios from "axios";

const BASE_URL = process.env.KEDAIPANGANAPI;
const API_VERSION = process.env.API_VERSION;
const FULL_API_URL = `${BASE_URL}/internal-process/${API_VERSION}/conversion/conversions`;

export const getConversions = async (params) => {
    try {
        const response = await axios.get(FULL_API_URL, { params });
        return response.data;
    } catch (error) {
        console.error("Error fetching conversions:", error);
        throw new Error(
            error.response?.data?.message || "Failed to fetch data"
        );
    }
};

export const createConversion = async (data) => {
    try {
        const response = await axios.post(FULL_API_URL, data);
        return response.data;
    } catch (error) {
        console.error("Error creating conversion:", error);
        throw new Error(
            error.response?.data?.message || "Failed to create conversion"
        );
    }
};
